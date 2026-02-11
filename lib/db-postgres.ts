import { User, Comment, Notification } from './db.interfaces';
import { SlideDTO as Slide } from './dto';
import { prisma } from './prisma';
import { CommentWithRelations } from './dto';
import * as bcrypt from 'bcryptjs';

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
// (Keeping raw SQL for now as the model is not in Prisma schema yet,
// will add model to schema in a separate step if needed, or just leave it since
// the user wants consolidation mainly for core features)
export async function createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    // We'll use prisma.verificationToken for this to avoid raw SQL
    await prisma.verificationToken.create({
        data: {
            identifier: userId,
            token: token,
            expires: expiresAt
        }
    });
}

export async function getPasswordResetToken(token: string): Promise<{ id: string, userId: string, expiresAt: Date } | null> {
    const vt = await prisma.verificationToken.findUnique({ where: { token } });
    if (!vt) return null;
    return {
        id: vt.token, // identifier is userId, but for compatibility we return this
        userId: vt.identifier,
        expiresAt: vt.expires
    };
}

export async function deletePasswordResetToken(id: string): Promise<void> {
    // id here is actually the token based on getPasswordResetToken mapping above
    await prisma.verificationToken.delete({ where: { token: id } });
}


export async function pingDb() {
  await prisma.$queryRaw`SELECT 1`;
}

// --- Slide Functions ---
export async function createSlide(slideData: any): Promise<any> {
    const { userId, username, x, y, type, data, accessLevel, avatar } = slideData;

    const title = data?.title || (type === 'html' ? 'HTML Slide' : 'Video Slide');
    const content = JSON.stringify({
        data,
        avatar
    });

    const newSlide = await prisma.slide.create({
        data: {
            userId,
            username,
            x,
            y,
            slideType: type,
            title,
            content,
            accessLevel: accessLevel || 'PUBLIC'
        }
    });

    return { id: newSlide.id };
}

// --- Like Functions ---
export async function toggleLike(slideId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    const existingLike = await prisma.like.findUnique({
        where: {
            authorId_slideId: {
                authorId: userId,
                slideId,
            }
        }
    });

    if (existingLike) {
        await prisma.$transaction([
            prisma.like.delete({ where: { id: existingLike.id } }),
            prisma.slide.update({
                where: { id: slideId },
                data: { likeCount: { decrement: 1 } }
            })
        ]);
    } else {
        await prisma.$transaction([
            prisma.like.create({
                data: {
                    authorId: userId,
                    slideId
                }
            }),
            prisma.slide.update({
                where: { id: slideId },
                data: { likeCount: { increment: 1 } }
            })
        ]);
    }

    const slide = await prisma.slide.findUnique({
        where: { id: slideId },
        select: { likeCount: true }
    });

    return {
        newStatus: existingLike ? 'unliked' : 'liked',
        likeCount: slide?.likeCount || 0
    };
}

export async function toggleCommentLike(commentId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
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
        where: currentUserId ? { userId: currentUserId } : { userId: '00000000-0000-0000-0000-000000000000' },
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
      replies: [],
      parentAuthorId: null,
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
    orderBy: { createdAt: 'desc' },
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
    replies: [],
    _count: {
      likes: comment._count.likes,
      replies: comment._count.replies,
    },
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

  return {
    ...comment,
    isLiked: false,
    replies: [],
    _count: { likes: 0 }
  };
}

export async function deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { authorId: true, slideId: true }
    });

    if (!comment) {
        throw new Error("Comment not found");
    }

    if (comment.authorId !== userId) {
        throw new Error("Unauthorized");
    }

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
export async function savePushSubscription(userId: string | null, subscription: any, isPwaInstalled: boolean): Promise<void> {
    const endpoint = subscription.endpoint;

    if (!endpoint) {
       console.error("No endpoint found in subscription object");
       return;
    }

    // Prisma doesn't support JSON containment natively in all filter types without specific typing,
    // but we can search for the subscription object or use raw if needed.
    // However, we added pushSubscriptions to the schema.

    // Using findFirst with a Json filter (if supported by the provider)
    // or we can iterate if we expect small numbers (not ideal).
    // Let's use a raw query for the specific JSON field check if findFirst is tricky.

    const existing = await prisma.pushSubscription.findFirst({
        where: {
            subscription: {
                path: ['endpoint'],
                equals: endpoint
            }
        } as any
    });

    if (existing) {
        await prisma.pushSubscription.update({
            where: { id: existing.id },
            data: {
                userId: userId || existing.userId,
                is_pwa_installed: isPwaInstalled,
                subscription: subscription
            }
        });
    } else {
        await prisma.pushSubscription.create({
            data: {
                userId,
                subscription: subscription,
                is_pwa_installed: isPwaInstalled
            }
        });
    }
}

export async function getPushSubscriptions(options: { userId?: string, role?: string, isPwaInstalled?: boolean }): Promise<any[]> {
    const { userId, role, isPwaInstalled } = options;

    const subscriptions = await prisma.pushSubscription.findMany({
        where: {
            userId: userId || undefined,
            is_pwa_installed: isPwaInstalled !== undefined ? isPwaInstalled : undefined,
            user: role ? { role } : undefined
        },
        select: {
            subscription: true
        }
    });

    return subscriptions.map(s => s.subscription);
}

// --- Slide Management Functions ---

export async function getSlide(id: string): Promise<Slide | null> {
    const row = await prisma.slide.findUnique({
        where: { id },
        include: {
            author: { select: { avatar: true } }
        }
    });

    if (!row) return null;

    const content = row.content ? JSON.parse(row.content) : {};
    return {
        id: row.id,
        x: row.x,
        y: row.y,
        type: row.slideType as 'video' | 'html',
        userId: row.userId,
        username: row.username,
        createdAt: row.createdAt.toISOString(),
        initialLikes: row.likeCount || 0,
        initialComments: row.commentCount || 0,
        isLiked: false,
        avatar: row.author?.avatar || content.avatar || '',
        accessLevel: row.accessLevel || 'PUBLIC',
        data: content.data,
    } as Slide;
}

export async function getSlides(options: { limit?: number, cursor?: string, currentUserId?: string }): Promise<Slide[]> {
    const { limit = 5, cursor, currentUserId } = options;

    const cursorDate = cursor ? new Date(parseInt(cursor)) : undefined;

    const result = await prisma.slide.findMany({
        where: {
            createdAt: cursorDate ? { lt: cursorDate } : undefined
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            author: { select: { avatar: true } },
            likes: currentUserId ? { where: { authorId: currentUserId } } : false
        }
    });

    return result.map((row: any) => {
        const content = row.content ? JSON.parse(row.content) : {};
        return {
            id: row.id,
            x: row.x,
            y: row.y,
            type: row.slideType as 'video' | 'html',
            userId: row.userId,
            username: row.username,
            createdAt: row.createdAt.toISOString(),
            initialLikes: row.likeCount || 0,
            initialComments: row.commentCount || 0,
            isLiked: currentUserId ? row.likes.length > 0 : false,
            avatar: row.author?.avatar || content.avatar || '',
            accessLevel: row.accessLevel || 'PUBLIC',
            data: content.data,
        } as Slide;
    });
}

export async function getAllSlides(): Promise<Slide[]> {
    const result = await prisma.slide.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return result.map((row: any) => {
        const content = row.content ? JSON.parse(row.content) : {};
        return {
            id: row.id,
            x: row.x,
            y: row.y,
            type: row.slideType as 'video' | 'html',
            userId: row.userId,
            username: row.username,
            createdAt: row.createdAt.toISOString(),
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
    const slide = await prisma.slide.findUnique({ where: { id } });
    if (!slide) throw new Error('Slide not found');

    const content = slide.content ? JSON.parse(slide.content) : {};

    if (updates.data) content.data = updates.data;
    if (updates.avatar) content.avatar = updates.avatar;

    const newContent = JSON.stringify(content);

    let title = slide.title;
    if (updates.data && 'title' in (updates.data as any)) {
         title = (updates.data as any).title;
    }

    await prisma.slide.update({
        where: { id },
        data: {
            content: newContent,
            title
        }
    });
}

export async function deleteSlide(id: string): Promise<void> {
    // Prisma handles cascading deletes if configured in schema,
    // and our schema HAS 'onDelete: Cascade' for Slide relations.
    await prisma.slide.delete({ where: { id } });
}
