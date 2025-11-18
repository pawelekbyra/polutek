import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Assuming db is exported from here

export async function GET(request: NextRequest) {
  const notifications = await db.getNotifications('123'); // Mock user ID
  const unreadCount = await db.getUnreadNotificationCount('123'); // Mock user ID

  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  };

  return NextResponse.json({ notifications, unreadCount }, { headers });
}

export async function POST(request: NextRequest) {
  const { subscription, isPwaInstalled } = await request.json();

  await db.savePushSubscription('123', subscription, isPwaInstalled); // Mock user ID

  return NextResponse.json({ message: 'PWA subscription registered' });
}
