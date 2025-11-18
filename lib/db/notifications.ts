import { prisma } from '../prisma';

/**
 * Marks a list of notifications as read for a specific user.
 * @param notificationIds An array of notification IDs to mark as read.
 * @param userId The ID of the user who owns the notifications.
 */
export const markNotificationsAsRead = async (notificationIds: string[], userId: string) => {
  return prisma.notification.updateMany({
    where: {
      id: {
        in: notificationIds,
      },
      userId: userId, // Security check to ensure user can only mark their own notifications
    },
    data: {
      read: true,
    },
  });
};

/**
 * Gets all notifications for a specific user.
 * @param userId The ID of the user.
 */
export const getNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
        actor: true, // Include the user who performed the action
    }
  });
};

/**
 * Gets the count of unread notifications for a specific user.
 * @param userId The ID of the user.
 */
export const getUnreadNotificationCount = async (userId: string) => {
  return prisma.notification.count({
    where: {
      userId,
      read: false,
    },
  });
};

/**
 * Saves a push subscription for a user.
 * @param userId The ID of the user.
 * @param subscription The push subscription object.
 */
export const savePushSubscription = async (userId: string, subscription: any) => {
    const existingSubscription = await prisma.pushSubscription.findUnique({
        where: { endpoint: subscription.endpoint },
    });

    if (existingSubscription) {
        // Update the existing subscription with the latest keys
        return prisma.pushSubscription.update({
            where: { id: existingSubscription.id },
            data: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
                userId: userId, // Ensure it's linked to the current user
            },
        });
    } else {
        // Create a new subscription
        return prisma.pushSubscription.create({
            data: {
                userId,
                endpoint: subscription.endpoint,
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            },
        });
    }
};

/**
 * Gets all push subscriptions for a user.
 * @param userId The ID of the user.
 */
export const getPushSubscriptions = async (userId: string) => {
    return prisma.pushSubscription.findMany({
        where: { userId },
    });
};
