import { prisma } from './prisma';
import * as bcrypt from 'bcryptjs';
import { User, Comment, Notification } from './db.interfaces';
import { SlideDTO as Slide, CommentWithRelations } from './dto';

// --- No-op for compatibility ---
export async function createTables() {
  console.log("createTables called: Skipped (managed by Prisma)");
}

export async function pingDb() {
  await prisma.$queryRaw`SELECT 1`;
}

// --- User Functions ---
export async function findUserById(id: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u) return null;
    return mapUser(u);
}
export async function findUserByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u) return null;
    return mapUser(u);
}
export async function findUserByUsername(username: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { username } });
    if (!u) return null;
    return mapUser(u);
}
export async function getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(mapUser);
}
export async function createUser(userData: any): Promise<User> {
    const { username, displayName, email, password, avatar, role } = userData;
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
            avatar,
            role: role || 'user',
            isFirstLogin: true
        }
    });

    // Welcome Notification
    await createNotification({
        userId: newUser.id,
        type: 'welcome',
        text: `Cześć ${displayName || username}! 👋 Witaj w społeczności Patronek. Cieszymy się, że jesteś z nami! 🚀`,
        link: '/profile',
        fromUser: null
    } as any);

    return mapUser(newUser);
}
export async function updateUser(userId: string, updates: any): Promise<User | null> {
    const u = await prisma.user.update({
        where: { id: userId },
        data: updates
    });
    return mapUser(u);
}
export async function deleteUser(userId: string): Promise<boolean> {
    try {
        await prisma.user.delete({ where: { id: userId } });
        return true;
    } catch {
        return false;
    }
}

function mapUser(u: any): User {
    return {
        ...u,
        role: u.role as any,
    };
}

// --- Password Reset ---
export async function createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<void> {
     try {
         // Using VerificationToken model to store this, mapping identifier->userId
         await prisma.verificationToken.create({
            data: {
                identifier: userId,
                token,
                expires: expiresAt
            }
        });
    } catch (e) {
        // ignore duplicate
    }
}

export async function getPasswordResetToken(token: string): Promise<{ id: string, userId: string, expiresAt: Date } | null> {
    const t = await prisma.verificationToken.findUnique({ where: { token } });
    if (!t) return null;
    return {
        id: 'dummy',
        userId: t.identifier,
        expiresAt: t.expires
    };
}

export async function deletePasswordResetToken(id: string): Promise<void> {
    // Not implemented as ID is not available for VerificationToken usually
}

// --- Slide Functions ---
export async function createSlide(slideData: any): Promise<any> {
    const { userId, username, x, y, type, data, accessLevel, avatar } = slideData;
    const title = data?.title || (type === 'html' ? 'HTML Slide' : 'Video Slide');
    const content = JSON.stringify({ data, avatar });
    const id = 'slide_' + Math.random().toString(36).substring(2, 15);

    const s = await prisma.slide.create({
        data: {
            id,
            userId,
            username,
            x, y,
            slideType: type,
            title,
            content,
            accessLevel: accessLevel || 'PUBLIC'
        }
    });
    return { id: s.id };
}

export async function toggleLike(slideId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    const existing = await prisma.like.findUnique({
        where: { authorId_slideId: { authorId: userId, slideId } }
    });

    if (existing) {
        await prisma.like.delete({ where: { id: existing.id } });
        await prisma.slide.update({ where: { id: slideId }, data: { likeCount: { decrement: 1 } } });
        const s = await prisma.slide.findUnique({ where: { id: slideId } });
        return { newStatus: 'unliked', likeCount: s?.likeCount || 0 };
    } else {
        await prisma.like.create({ data: { authorId: userId, slideId } });
        await prisma.slide.update({ where: { id: slideId }, data: { likeCount: { increment: 1 } } });
        const s = await prisma.slide.findUnique({ where: { id: slideId } });
        return { newStatus: 'liked', likeCount: s?.likeCount || 0 };
    }
}

export async function toggleCommentLike(commentId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    const existing = await prisma.commentLike.findUnique({
        where: { userId_commentId: { userId, commentId } }
    });

    if (existing) {
        await prisma.commentLike.delete({ where: { id: existing.id } });
        const count = await prisma.commentLike.count({ where: { commentId } });
        return { newStatus: 'unliked', likeCount: count };
    } else {
        await prisma.commentLike.create({ data: { userId, commentId } });
        const count = await prisma.commentLike.count({ where: { commentId } });
        return { newStatus: 'liked', likeCount: count };
    }
}

// --- Comments (Copied Logic from db-postgres.ts which used Prisma) ---

export async function getComments(
  slideId: string,
  options: { limit?: number; cursor?: string; sortBy?: 'newest' | 'top', currentUserId?: string } = {}
): Promise<{ comments: CommentWithRelations[]; nextCursor: string | null }> {
  const { limit = 20, cursor, sortBy = 'newest', currentUserId } = options;
  const orderBy = sortBy === 'top' ? { likes: { _count: 'desc' as const } } : { createdAt: 'desc' as const };

  const comments = await prisma.comment.findMany({
    where: { slideId, parentId: null },
    take: limit + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: [orderBy, { createdAt: 'desc' }],
    include: {
      author: { select: { id: true, username: true, displayName: true, avatar: true, role: true } },
      likes: { where: currentUserId ? { userId: currentUserId } : { userId: '00000000-0000-0000-0000-000000000000' }, select: { userId: true } },
      _count: { select: { likes: true, replies: true } },
    },
  });

  let nextCursor: string | null = null;
  if (comments.length > limit) {
    const nextItem = comments.pop();
    nextCursor = nextItem?.id || null;
  }

  const mappedComments = comments.map((comment: any) => ({
      ...comment,
      isLiked: comment.likes.length > 0,
      replies: [],
      parentAuthorId: null,
      _count: { likes: comment._count.likes, replies: comment._count.replies },
  }));

  return { comments: mappedComments, nextCursor };
}

export async function getCommentReplies(
  parentId: string,
  options: { limit?: number; cursor?: string; currentUserId?: string } = {}
): Promise<{ comments: CommentWithRelations[]; nextCursor: string | null }> {
  const { limit = 10, cursor, currentUserId } = options;
  const replies = await prisma.comment.findMany({
    where: { parentId },
    take: limit + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, username: true, displayName: true, avatar: true, role: true } },
      likes: { where: currentUserId ? { userId: currentUserId } : { userId: '00000000-0000-0000-0000-000000000000' }, select: { userId: true } },
      _count: { select: { likes: true, replies: true } },
      parent: { select: { author: { select: { id: true, username: true, displayName: true } } } }
    },
  });

  let nextCursor: string | null = null;
  if (replies.length > limit) {
    const nextItem = replies.pop();
    nextCursor = nextItem?.id || null;
  }

  const mappedReplies = replies.map((comment: any) => ({
    ...comment,
    isLiked: comment.likes.length > 0,
    replies: [],
    _count: { likes: comment._count.likes, replies: comment._count.replies },
    parentAuthorUsername: comment.parent?.author?.username || comment.parent?.author?.displayName || null,
    parentAuthorId: comment.parent?.author?.id || null,
  }));

  return { comments: mappedReplies, nextCursor };
}

export async function addComment(
  slideId: string,
  userId: string,
  text: string,
  parentId?: string | null,
  imageUrl?: string | null
): Promise<CommentWithRelations> {
  const [comment] = await prisma.$transaction([
    prisma.comment.create({
      data: { slideId, authorId: userId, text, parentId: parentId || null, imageUrl: imageUrl || null },
      include: { author: true, likes: true }
    }),
    prisma.slide.update({ where: { id: slideId }, data: { commentCount: { increment: 1 } } })
  ]);
  return { ...comment, isLiked: false, replies: [], _count: { likes: 0 } } as any;
}

export async function deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await prisma.comment.findUnique({ where: { id: commentId }, select: { authorId: true, slideId: true } });
    if (!comment) throw new Error("Comment not found");
    if (comment.authorId !== userId) throw new Error("Unauthorized");
    await prisma.$transaction([
        prisma.comment.delete({ where: { id: commentId } }),
        prisma.slide.update({ where: { id: comment.slideId }, data: { commentCount: { decrement: 1 } } })
    ]);
}

// --- Notifications ---
export async function createNotification(data: any): Promise<Notification> {
    const { userId, type, text, link, fromUser } = data;
    const n = await prisma.notification.create({
        data: { userId, type, text, link, fromUserId: fromUser?.id }
    });
    return mapNotification(n);
}
export async function getNotifications(userId: string): Promise<Notification[]> {
    const results = await prisma.notification.findMany({
        where: { userId },
        include: { fromUser: true },
        orderBy: { createdAt: 'desc' }
    });
    return results.map(mapNotification);
}
export async function markNotificationAsRead(id: string): Promise<Notification | null> {
    const n = await prisma.notification.update({ where: { id }, data: { read: true } });
    return mapNotification(n);
}
export async function getUnreadNotificationCount(userId: string): Promise<number> {
    return prisma.notification.count({ where: { userId, read: false } });
}

function mapNotification(n: any): Notification {
    return {
        ...n,
        createdAt: n.createdAt, // keeping as Date is fine if Interface allows, else .getTime()
        fromUser: n.fromUser ? { id: n.fromUser.id, displayName: n.fromUser.displayName || n.fromUser.username, avatar: n.fromUser.avatar } : null
    } as any;
}

// --- Push ---
export async function savePushSubscription(userId: string | null, subscription: any, isPwaInstalled: boolean): Promise<void> {
    if (userId) {
        await prisma.pushSubscription.create({
            data: { userId, subscription: subscription as any, is_pwa_installed: isPwaInstalled }
        });
    }
}
export async function getPushSubscriptions(options: any): Promise<any[]> {
    const { userId } = options;
    if (userId) {
        const subs = await prisma.pushSubscription.findMany({ where: { userId }, select: { subscription: true } });
        return subs.map((s: any) => s.subscription);
    }
    return [];
}

// --- Slide Getters ---
export async function getSlide(id: string): Promise<Slide | null> {
    const s = await prisma.slide.findUnique({ where: { id } });
    if (!s) return null;
    return mapSlide(s);
}

export async function getSlides(options: { limit?: number, cursor?: string, currentUserId?: string }): Promise<Slide[]> {
    const { limit = 5, cursor, currentUserId } = options;
    const slides = await prisma.slide.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        cursor: cursor ? { id: cursor } : undefined,
    });

    // We need 'isLiked'. Separate query or map.
    // Efficient way:
    const slidesWithLikes = await Promise.all(slides.map(async (s: any) => {
        let isLiked = false;
        if (currentUserId) {
            const like = await prisma.like.findUnique({ where: { authorId_slideId: { authorId: currentUserId, slideId: s.id } } });
            isLiked = !!like;
        }
        return { ...mapSlide(s), isLiked };
    }));

    return slidesWithLikes;
}

export async function getAllSlides(): Promise<Slide[]> {
    const slides = await prisma.slide.findMany({ orderBy: { createdAt: 'desc' } });
    return slides.map(mapSlide);
}

export async function updateSlide(id: string, updates: Partial<Slide>): Promise<void> {
    const data: any = {};
    if (updates.data) {
        // We need to merge content... ignoring for now or full overwrite
        // For simple fields:
    }
    // Minimal implementation for now
}

export async function deleteSlide(id: string): Promise<void> {
    await prisma.slide.delete({ where: { id } });
}

function mapSlide(s: any): Slide {
    const content = s.content ? JSON.parse(s.content) : {};
    return {
        id: s.id,
        type: s.slideType as 'video' | 'html',
        userId: s.userId,
        username: s.username,
        createdAt: s.createdAt.toISOString(),
        initialLikes: s.likeCount || 0,
        initialComments: s.commentCount || 0,
        isLiked: false,
        avatar: content.avatar || '',
        accessLevel: s.accessLevel || 'PUBLIC',
        data: content.data,
    };
}
