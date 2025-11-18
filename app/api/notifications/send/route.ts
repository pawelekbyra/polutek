import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getPushSubscriptions } from '@/lib/db';
import webpush from 'web-push';

if (process.env.VAPID_SUBJECT && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT,
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
}

export async function POST(request: NextRequest) {
  // This is an admin-only endpoint for now, but could be adapted.
  // The primary notification sending logic is in comment-actions.ts
  const payload = await verifySession();
  if (!payload || !payload.user || payload.user.role !== 'ADMIN') {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  const { userId, title, body, url } = await request.json();

  if (!userId) {
      return NextResponse.json({ success: false, message: 'userId is required.' }, { status: 400 });
  }

  try {
    const subscriptions = await getPushSubscriptions(userId);

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ success: false, message: 'No subscriptions found for the target user.' }, { status: 404 });
    }

    const notificationPayload = JSON.stringify({ title, body, url });

    const sendPromises = subscriptions.map((s: any) =>
      webpush.sendNotification({
        endpoint: s.endpoint,
        keys: {
            p256dh: s.p256dh,
            auth: s.auth,
        }
      }, notificationPayload)
    );

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, message: `Notifications sent to ${subscriptions.length} endpoints.` });
  } catch (error) {
    console.error('Error sending push notifications:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
