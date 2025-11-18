'use server';

import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/auth';
import { z } from 'zod';
import { checkRateLimit } from './rate-limiter';
import { addComment as createComment, getSlideById, getCommentById, getPushSubscriptions, toggleCommentVote as toggleDBCommentVote } from '@/lib/db';
import ably from './ably-server';
import webpush from 'web-push';

if (process.env.VAPID_SUBJECT && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT,
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
}

const addCommentSchema = z.object({
  slideId: z.string().min(1, 'Slide ID is required'),
  content: z.string().min(1, 'Comment content cannot be empty').max(1000, 'Comment is too long'),
  parentId: z.string().optional().nullable(),
});

export async function addComment(formData: FormData) {
  const session = await verifySession();
  if (!session || !session.user) {
    return { success: false, message: 'Not authenticated' };
  }
  const currentUser = session.user;

  const rateLimitResult = await checkRateLimit(currentUser.id);
  if (!rateLimitResult.success) {
    return { success: false, message: rateLimitResult.message };
  }

  const validatedFields = addCommentSchema.safeParse({
    slideId: formData.get('slideId'),
    content: formData.get('content'),
    parentId: formData.get('parentId'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { slideId, content, parentId } = validatedFields.data;

  try {
    const newComment = await createComment({
        slideId,
        authorId: currentUser.id,
        content,
        parentId: parentId || undefined,
    });

    // --- NOTIFICATION LOGIC ---
    const slide = await getSlideById(slideId);
    if (!slide) {
        console.warn(`Slide ${slideId} not found after creating comment. Skipping notifications.`);
        revalidatePath('/');
        return { success: true, message: 'Comment added', comment: newComment };
    }

    // Process notifications asynchronously
    processNotifications(newComment, slide, currentUser);

    revalidatePath('/');
    return { success: true, message: 'Comment added', comment: newComment };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, message: 'Failed to add comment.' };
  }
}

async function processNotifications(newComment: any, slide: any, currentUser: any) {
    const sendNotification = async (targetUserId: string, type: 'COMMENT_RECEIVED' | 'REPLY_RECEIVED', text: string) => {
        if (targetUserId === currentUser.id) return; // Don't notify user about their own action

        // 1. Real-time notification via Ably
        const channel = ably.channels.get(`user:${targetUserId}`);
        await channel.publish('notification', {
            type,
            text,
            fromUser: {
                id: currentUser.id,
                displayName: currentUser.displayName,
                avatar: currentUser.avatar,
            },
            link: `/slide/${slide.id}?comment=${newComment.id}`,
        });

        // 2. Push notification via Web Push
        const subscriptions = await getPushSubscriptions(targetUserId);
        const payload = JSON.stringify({
            title: type === 'COMMENT_RECEIVED' ? 'New Comment' : 'New Reply',
            body: text,
            url: `/slide/${slide.id}?comment=${newComment.id}`,
        });

        for (const sub of subscriptions) {
            try {
                await webpush.sendNotification({
                    endpoint: sub.endpoint,
                    keys: { p256dh: sub.p256dh, auth: sub.auth }
                }, payload);
            } catch (error) {
                console.error('Error sending push notification:', error);
                // Here you might want to delete the invalid subscription
            }
        }
    };

    // Notification for the slide owner
    const slideOwnerText = `${currentUser.displayName} commented on your video: "${newComment.content.substring(0, 50)}..."`;
    await sendNotification(slide.authorId, 'COMMENT_RECEIVED', slideOwnerText);

    // Notification for the parent comment author (if it's a reply)
    if (newComment.parentId) {
        const parentComment = await getCommentById(newComment.parentId);
        if (parentComment && parentComment.authorId !== slide.authorId) {
            const parentAuthorText = `${currentUser.displayName} replied to your comment: "${newComment.content.substring(0, 50)}..."`;
            await sendNotification(parentComment.authorId, 'REPLY_RECEIVED', parentAuthorText);
        }
    }
}

export async function updateComment(formData: FormData) {
    return { success: false, message: 'Not implemented' };
}

export async function deleteComment(formData: FormData) {
    return { success: false, message: 'Not implemented' };
}

export async function toggleCommentVote(formData: FormData) {
    const payload = await verifySession();
    if (!payload || !payload.user) {
        return { success: false, message: 'Not authenticated' };
    }
    const currentUser = payload.user;

    const rateLimitResult = await checkRateLimit(currentUser.id);
    if (!rateLimitResult.success) {
        return { success: false, message: rateLimitResult.message };
    }

    const voteCommentSchema = z.object({
        commentId: z.string().uuid('Invalid Comment ID'),
        voteType: z.enum(['upvote', 'downvote']),
    });

    const validatedFields = voteCommentSchema.safeParse({
        commentId: formData.get('commentId'),
        voteType: formData.get('voteType'),
    });

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors };
    }

    const { commentId, voteType } = validatedFields.data;

    try {
        const result = await toggleDBCommentVote(commentId, currentUser.id, voteType);

        revalidatePath('/');
        return { success: true, ...result };
    } catch (error) {
        console.error('Error toggling comment vote:', error);
        return { success: false, message: 'Failed to toggle vote.' };
    }
}
