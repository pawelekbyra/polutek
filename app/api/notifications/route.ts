import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, getUnreadNotificationCount, savePushSubscription } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const payload = await verifySession();
  if (!payload || !payload.user) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
  }

  try {
    const notifications = await getNotifications(payload.user.id);
    const unreadCount = await getUnreadNotificationCount(payload.user.id);
    return NextResponse.json({ success: true, notifications, unreadCount }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    const payload = await verifySession();
    if (!payload || !payload.user) {
        return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
    }

    const { subscription } = await request.json();

    if (!subscription) {
        return NextResponse.json({ success: false, message: 'Subscription object is required.' }, { status: 400 });
    }

    try {
        await savePushSubscription(payload.user.id, subscription);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving push subscription:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
