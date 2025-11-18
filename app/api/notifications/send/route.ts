import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import { db } from '../../../lib/db'; // Assuming db is exported from here

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: NextRequest) {
  const { userId, payload } = await request.json();
  const subscriptions = await db.getPushSubscriptions(userId);

  const sendPromises = subscriptions.map(sub => webpush.sendNotification(sub, JSON.stringify(payload)));

  await Promise.all(sendPromises);

  return NextResponse.json({ message: 'Notification sent' });
}
