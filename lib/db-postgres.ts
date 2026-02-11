import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { User, Comment, Notification } from './db.interfaces';
import { SlideDTO as Slide } from './dto';
import { prisma } from './prisma';
import { CommentWithRelations } from './dto';
import * as bcrypt from 'bcryptjs';

let sql: NeonQueryFunction<false, false>;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 100;
const QUERY_TIMEOUT_MS = 10000; // Increased to 10 seconds

async function queryWithTimeout(query: Promise<any>) {
  return Promise.race([
    query,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query timed out')), QUERY_TIMEOUT_MS)
    ),
  ]);
}

async function executeWithRetry(queryFn: () => Promise<any>) {
  let lastError: Error | undefined;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await queryWithTimeout(queryFn());
    } catch (error: any) {
      lastError = error;
      if (error.message === 'Query timed out' || error.name === 'NeonDbError') {
        console.warn(`Query failed (attempt ${i + 1}/${MAX_RETRIES}): ${error.message}. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, i)));
      } else {
        throw error;
      }
    }
  }
  throw new Error(`Query failed after ${MAX_RETRIES} retries: ${lastError?.message}`);
}

function getDb() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    sql = neon(process.env.DATABASE_URL);
  }

  // Wrap the sql function to include retry logic
  const wrappedSql: any = (strings: TemplateStringsArray, ...values: any[]) => {
    return executeWithRetry(() => sql(strings, ...values));
  }

  // Copy properties from the original sql function, like `sql.query`
  Object.assign(wrappedSql, {
    query: (query: string, params: any[]) => {
      return executeWithRetry(() => sql.query(query, params));
    }
  });

  return wrappedSql as NeonQueryFunction<false, false> & { query: (query: string, params: any[]) => Promise<any> };
}



// --- User Functions ---
export async function findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } }) as any;
}
export async function findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } }) as any;
}
export async function findUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } }) as any;
}
export async function getAllUsers(): Promise<User[]> {
    return prisma.user.findMany() as any;
}
export async function createUser(userData: Omit<User, 'id' | 'sessionVersion' | 'password'> & {password: string | null}): Promise<User> {
    const { username, displayName, email, password, avatar, role } = userData;
    const avatarValue = avatar || null;

    let hashedPassword = password;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = await prisma.user.create({
        data: {
            username,
            displayName,
            email,
            password: hashedPassword,
            avatar: avatarValue,
            role: (role || 'user') as any,
            isFirstLogin: true
        }
    });

    const welcomeText = `Cześć ${displayName || username}! 👋 Witaj w społeczności Patronek. Cieszymy się, że jesteś z nami! 🚀`;

    await createNotification({
        userId: newUser.id,
        type: 'welcome',
        text: welcomeText,
        link: '/profile',
        fromUserId: null,
    });

    return newUser as any;
}
export async function updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    // Standardize role to lowercase for Prisma if it exists in updates
    const prismaUpdates = { ...updates };
    if (prismaUpdates.role) {
        prismaUpdates.role = prismaUpdates.role.toLowerCase() as any;
    }

    return prisma.user.update({
        where: { id: userId },
        data: prismaUpdates as any
    }) as any;
}
export async function deleteUser(userId: string): Promise<boolean> {
    try {
        await prisma.user.delete({ where: { id: userId } });
        return true;
    } catch (e) {
        return false;
    }
}

// --- Password Reset Token Functions ---
export async function createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    const sql = getDb();
    await sql`
        INSERT INTO password_reset_tokens ("userId", token, "expiresAt")
        VALUES (${userId}, ${token}, ${expiresAt.toISOString()});
    `;
}

export async function getPasswordResetToken(token: string): Promise<{ id: string, userId: string, expiresAt: Date } | null> {
    const sql = getDb();
    const result = await sql`SELECT * FROM password_reset_tokens WHERE token = ${token};`;
    if (result.length === 0) {
        return null;
    }
    const dbToken = result[0];
    return {
        id: dbToken.id as string,
        userId: dbToken.userId as string,
        expiresAt: new Date(dbToken.expiresAt as string),
    };
}

export async function deletePasswordResetToken(id: string): Promise<void> {
    const sql = getDb();
    await sql`DELETE FROM password_reset_tokens WHERE id = ${id};`;
}


export async function pingDb() {
  const sql = getDb();
  await sql`SELECT 1`;
}

// --- Slide Functions ---
export async function createSlide(slideData: any): Promise<any> {
    const sql = getDb();
    const id = 'slide_' + Math.random().toString(36).substring(2, 15);
    const { userId, username, x, y, type, data, accessLevel, avatar } = slideData;

    const title = data?.title || (type === 'html' ? 'HTML Slide' : 'Video Slide');
    // Store complex objects in content, including avatar which isn't a column in the table
    // We move accessLevel to a proper column, but keep access in content for legacy if needed, though DTO uses accessLevel now
    const content = JSON.stringify({
        data,
        avatar
    });

    await sql`
        INSERT INTO slides (id, "userId", username, x, y, "slideType", title, content, "accessLevel")
        VALUES (${id}, ${userId}, ${username}, ${x}, ${y}, ${type}, ${title}, ${content}, ${accessLevel || 'PUBLIC'});
    `;
    return { id };
}

// --- Like Functions ---
export async function toggleLike(slideId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    const sql = getDb();
    const isLikedResult = await sql`SELECT 1 FROM likes WHERE "slideId" = ${slideId} AND "userId" = ${userId};`;
    const isLiked = isLikedResult.length > 0;

    if (isLiked) {
        // Atomic decrement
        await sql`
            BEGIN;
            DELETE FROM likes WHERE "slideId" = ${slideId} AND "userId" = ${userId};
            UPDATE slides SET "likeCount" = "likeCount" - 1 WHERE id = ${slideId};
            COMMIT;
        `;
    } else {
        // Atomic increment
        await sql`
            BEGIN;
            INSERT INTO likes ("slideId", "userId") VALUES (${slideId}, ${userId});
            UPDATE slides SET "likeCount" = "likeCount" + 1 WHERE id = ${slideId};
            COMMIT;
        `;
    }

    // Fetch updated count directly from slide
    const slideResult = await sql`SELECT "likeCount" FROM slides WHERE id = ${slideId}`;
    const likeCount = slideResult[0].likeCount as number;

    return { newStatus: isLiked ? 'unliked' : 'liked', likeCount };
}

export async function toggleCommentLike(commentId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    // Switch to Prisma logic as requested by the user for 'Like Logic'
    // "Ensure the backend logic actually writes to the CommentLike table."
    const existingLike = await prisma.commentLike.findUnique({
        where: {
            userId_commentId: {
                userId,
                commentId,
            },
        },
    });

    if (existingLike) {
        await prisma.commentLike.delete({
            where: {
                id: existingLike.id,
            },
        });
    } else {
        await prisma.commentLike.create({
            data: {
                userId,
                commentId,
            },
        });
    }

    const likeCount = await prisma.commentLike.count({
        where: {
            commentId
        }
    });

    return { newStatus: existingLike ? 'unliked' : 'liked', likeCount };
}

// --- Comment Functions ---

export async function getComments(
  contentId: string,
  options: { limit?: number; cursor?: string; sortBy?: 'newest' | 'top', currentUserId?: string } = {}
): Promise<{ comments: CommentWithRelations[]; nextCursor: string | null }> {
  const { limit = 20, cursor, sortBy = 'newest', currentUserId } = options;

  const orderBy = sortBy === 'top'
    ? { likes: { _count: 'desc' as const } }
    : { createdAt: 'desc' as const };

  // For now, contentId maps to slideId in the database
  const comments = await prisma.comment.findMany({
    where: {
      slideId: contentId,
      parentId: null,
    },
    take: limit + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: [orderBy, { createdAt: 'desc' }],
    include: {
      author: {
        select: { id: true, username: true, displayName: true, avatar: true, role: true },
      },
      likes: {
        where: currentUserId ? { userId: currentUserId } : { userId: '00000000-0000-0000-0000-000000000000' }, // Dummy UUID if no user
        select: { userId: true },
      },
      _count: {
        select: { likes: true, replies: true },
      },
    },
  });

  let nextCursor: string | null = null;
  if (comments.length > limit) {
    const nextItem = comments.pop();
    nextCursor = nextItem?.id || null;
  }

  const mapComment = (comment: any): CommentWithRelations => {
    return {
      ...comment,
      isLiked: comment.likes.length > 0,
      replies: [], // Replies are now loaded lazily
      parentAuthorId: null, // Root comments have no parent author
      _count: {
        likes: comment._count.likes,
        replies: comment._count.replies,
      },
    };
  };

  const mappedComments = comments.map(mapComment);

  return { comments: mappedComments, nextCursor };
}

export async function getCommentReplies(
  parentId: string,
  options: { limit?: number; cursor?: string; currentUserId?: string } = {}
): Promise<{ comments: CommentWithRelations[]; nextCursor: string | null }> {
  const { limit = 10, cursor, currentUserId } = options;

  const replies = await prisma.comment.findMany({
    where: {
      parentId,
    },
    take: limit + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' }, // Fix for Issue 1: Newest First
    include: {
      author: {
        select: { id: true, username: true, displayName: true, avatar: true, role: true },
      },
      likes: {
        where: currentUserId ? { userId: currentUserId } : { userId: '00000000-0000-0000-0000-000000000000' },
        select: { userId: true },
      },
      _count: {
        select: { likes: true, replies: true },
      },
      parent: {
        select: {
          author: {
            select: { id: true, username: true, displayName: true }
          }
        }
      }
    },
  });

  let nextCursor: string | null = null;
  if (replies.length > limit) {
    const nextItem = replies.pop();
    nextCursor = nextItem?.id || null;
  }

  const mapComment = (comment: any): CommentWithRelations => ({
    ...comment,
    isLiked: comment.likes.length > 0,
    replies: [], // Deeper replies can be handled similarly if needed
    _count: {
      likes: comment._count.likes,
      replies: comment._count.replies,
    },
    // Include parent author username for "@" mentions
    parentAuthorUsername: comment.parent?.author?.username || comment.parent?.author?.displayName || null,
    parentAuthorId: comment.parent?.author?.id || null,
  });

  const mappedReplies = replies.map(mapComment);

  return { comments: mappedReplies, nextCursor };
}

export async function addComment(
  contentId: string,
  userId: string,
  text: string,
  parentId?: string | null,
  imageUrl?: string | null
): Promise<CommentWithRelations> {
  // For now, contentId maps to slideId in the database
  // Transaction ensures both actions happen or fail together
  const [comment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        slideId: contentId,
        authorId: userId,
        text,
        parentId: parentId || null,
        imageUrl: imageUrl || null,
      },
      include: {
        author: true,
        likes: true
      }
    }),
    prisma.slide.update({
      where: { id: contentId },
      data: { commentCount: { increment: 1 } }
    })
  ]);

  // Return DTO shape
  return {
    ...comment,
    isLiked: false,
    replies: [],
    _count: { likes: 0 }
  };
}

export async function deleteComment(commentId: string, userId: string): Promise<void> {
    // Verify ownership first
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { authorId: true, slideId: true }
    });

    if (!comment) {
        throw new Error("Comment not found");
    }

    if (comment.authorId !== userId) {
        // Optionally allow admin to delete? For now, strict ownership.
        throw new Error("Unauthorized");
    }

    // Transaction to delete comment and decrement count
    await prisma.$transaction([
        prisma.comment.delete({
            where: { id: commentId }
        }),
        prisma.slide.update({
            where: { id: comment.slideId },
            data: { commentCount: { decrement: 1 } }
        })
    ]);
}


// --- Notification Functions ---
export async function createNotification(notificationData: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const { userId, type, text, link, fromUser } = notificationData;
    const fromUserId = fromUser?.id;
    return prisma.notification.create({
        data: {
            userId,
            type,
            text,
            link,
            fromUserId: fromUserId || null
        }
    }) as any;
}
export async function getNotifications(userId: string): Promise<Notification[]> {
    const notifications = await prisma.notification.findMany({
        where: { userId },
        include: {
            fromUser: {
                select: { id: true, username: true, avatar: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return notifications.map(n => ({
        ...n,
        fromUser: n.fromUser ? {
            id: n.fromUser.id,
            displayName: (n.fromUser as any).displayName || n.fromUser.username,
            avatar: n.fromUser.avatar || ''
        } : undefined
    })) as any;
}
export async function markNotificationAsRead(notificationId: string): Promise<Notification | null> {
    return prisma.notification.update({
        where: { id: notificationId },
        data: { read: true }
    }) as any;
}
export async function getUnreadNotificationCount(userId: string): Promise<number> {
    return prisma.notification.count({
        where: { userId, read: false }
    });
}

// --- Push Subscription Functions ---
export async function savePushSubscription(userId: string | null, subscription: object, isPwaInstalled: boolean): Promise<void> {
    const sql = getDb();
    const subJson = JSON.stringify(subscription);

    // Check for existing subscription with the same endpoint to prevent duplicates
    // Extract endpoint from subscription object (assuming WebPush standard)
    const endpoint = (subscription as any).endpoint;

    if (!endpoint) {
       console.error("No endpoint found in subscription object");
       return;
    }

    // Since we can't easily query JSONB for existence efficiently without specific operators or extracting endpoint
    // We will do a check first. Ideally we should have a unique constraint on an extracted column.
    // For now, we query.

    // Note: Postgres JSONB containment operator @>
    const existing = await sql`
        SELECT id FROM push_subscriptions
        WHERE subscription->>'endpoint' = ${endpoint}
    `;

    if (existing.length > 0) {
        // Update existing
        // If userId is provided, we should link it if it wasn't linked (e.g. login after subscribing)
        // If it was already linked to another user... that's tricky. Let's assume re-link to current.
        if (userId) {
             await sql`
                UPDATE push_subscriptions
                SET "userId" = ${userId}, is_pwa_installed = ${isPwaInstalled}, subscription = ${subJson}
                WHERE id = ${existing[0].id}
            `;
        } else {
             await sql`
                UPDATE push_subscriptions
                SET is_pwa_installed = ${isPwaInstalled}, subscription = ${subJson}
                WHERE id = ${existing[0].id}
            `;
        }
    } else {
        // Insert new
        await sql`
            INSERT INTO push_subscriptions ("userId", subscription, is_pwa_installed)
            VALUES (${userId}, ${subJson}, ${isPwaInstalled})
        `;
    }
}

export async function getPushSubscriptions(options: { userId?: string, role?: string, isPwaInstalled?: boolean }): Promise<any[]> {
    const sql = getDb();
    const { userId, role, isPwaInstalled } = options;

    if (userId) {
        return await sql`SELECT ps.subscription FROM push_subscriptions ps WHERE ps."userId" = ${userId}`;
    }

    if (role) {
        return await sql`
            SELECT ps.subscription FROM push_subscriptions ps
            JOIN users u ON ps."userId" = u.id
            WHERE u.role = ${role}`;
    }

    if (isPwaInstalled !== undefined) {
        return await sql`
            SELECT ps.subscription FROM push_subscriptions ps
            WHERE ps.is_pwa_installed = ${isPwaInstalled}`;
    }

    // This case is for when options is empty, meaning get all subscriptions.
    return await sql`SELECT ps.subscription FROM push_subscriptions ps`;
}

// --- Slide Management Functions (Added) ---

export async function getSlide(id: string): Promise<Slide | null> {
    const sql = getDb();
    // Refactored: Reads directly from denormalized counters on 'slides' table.
    const result = await sql`
        SELECT s.*
        FROM slides s
        WHERE s.id = ${id}
    `;

    if (result.length === 0) return null;

    const row = result[0];
    const content = row.content ? JSON.parse(row.content) : {};
    return {
        id: row.id,
        x: row.x,
        y: row.y,
        type: row.slideType as 'video' | 'html',
        userId: row.userId,
        username: row.username,
        createdAt: new Date(row.createdAt).toISOString(),
        initialLikes: row.likeCount || 0,
        initialComments: row.commentCount || 0,
        isLiked: false,
        avatar: content.avatar || '',
        accessLevel: row.accessLevel || 'PUBLIC',
        data: content.data,
    } as Slide;
}

export async function getSlides(options: { limit?: number, cursor?: string, currentUserId?: string }): Promise<Slide[]> {
    const sql = getDb();
    const { limit = 5, cursor, currentUserId } = options;

    let result;

    // Use Date object for cursor comparison if provided
    const cursorDate = cursor ? new Date(parseInt(cursor)) : null;

    // Refactored: Reads directly from denormalized counters.
    // Removed complex JOINs for counts.
    // 'isLiked' still requires a subquery or join, but exists() is efficient.

    if (cursorDate) {
        result = await sql`
            SELECT
                s.*,
                u.avatar as "userAvatar",
                ${currentUserId ? sql`EXISTS(SELECT 1 FROM likes WHERE "slideId" = s.id AND "userId" = ${currentUserId})` : false} as "isLiked"
            FROM slides s
            LEFT JOIN users u ON s."userId" = u.id
            WHERE s."createdAt" < ${cursorDate}
            ORDER BY s."createdAt" DESC
            LIMIT ${limit}
        `;
    } else {
        result = await sql`
            SELECT
                s.*,
                u.avatar as "userAvatar",
                ${currentUserId ? sql`EXISTS(SELECT 1 FROM likes WHERE "slideId" = s.id AND "userId" = ${currentUserId})` : false} as "isLiked"
            FROM slides s
            LEFT JOIN users u ON s."userId" = u.id
            ORDER BY s."createdAt" DESC
            LIMIT ${limit}
        `;
    }

    return result.map((row: any) => {
        const content = row.content ? JSON.parse(row.content) : {};
        return {
            id: row.id,
            x: row.x,
            y: row.y,
            type: row.slideType as 'video' | 'html',
            userId: row.userId,
            username: row.username,
            createdAt: new Date(row.createdAt).toISOString(),
            initialLikes: row.likeCount || 0,
            initialComments: row.commentCount || 0,
            isLiked: !!row.isLiked,
            avatar: row.userAvatar || content.avatar || '',
            accessLevel: row.accessLevel || 'PUBLIC',
            data: content.data,
        } as Slide;
    });
}

export async function getAllSlides(): Promise<Slide[]> {
    const sql = getDb();
    // Refactored: Reads directly from denormalized counters.
    const result = await sql`
        SELECT s.*
        FROM slides s
        ORDER BY s."createdAt" DESC;
    `;

    return result.map((row: any) => {
        const content = row.content ? JSON.parse(row.content) : {};
        return {
            id: row.id,
            x: row.x,
            y: row.y,
            type: row.slideType as 'video' | 'html',
            userId: row.userId,
            username: row.username,
            createdAt: new Date(row.createdAt).toISOString(),
            initialLikes: row.likeCount || 0,
            initialComments: row.commentCount || 0,
            isLiked: false,
            avatar: content.avatar || '',
            accessLevel: row.accessLevel || 'PUBLIC',
            data: content.data,
        } as Slide;
    });
}

export async function updateSlide(id: string, updates: Partial<Slide>): Promise<void> {
    const sql = getDb();

    // Fetch current slide to preserve existing content fields
    const slides = await sql`SELECT * FROM slides WHERE id = ${id}`;
    if (slides.length === 0) throw new Error('Slide not found');
    const slide = slides[0];
    const content = slide.content ? JSON.parse(slide.content) : {};

    // Update content fields if provided in updates
    if (updates.data) content.data = updates.data;
    // access is now accessLevel and stored in a column, but we might want to keep it in content for legacy read?
    // DTO doesn't have 'access' anymore, so updates (Partial<Slide>) won't have it.
    if (updates.avatar) content.avatar = updates.avatar;

    const newContent = JSON.stringify(content);

    // Also update top-level columns if necessary.
    let title = slide.title;
    if (updates.data && 'title' in updates.data) {
         title = (updates.data as any).title;
    }

    await sql`
        UPDATE slides
        SET content = ${newContent}, title = ${title}
        WHERE id = ${id}
    `;
}

export async function deleteSlide(id: string): Promise<void> {
    const sql = getDb();

    // Delete likes associated with the slide
    await sql`DELETE FROM likes WHERE "slideId" = ${id}`;

    // Delete comments and their likes
    // first delete comment_likes for comments of this slide
    await sql`
        DELETE FROM comment_likes
        WHERE "commentId" IN (SELECT id FROM comments WHERE "slideId" = ${id})
    `;

    // then delete comments
    await sql`DELETE FROM comments WHERE "slideId" = ${id}`;

    // finally delete the slide
    await sql`DELETE FROM slides WHERE id = ${id}`;
}
