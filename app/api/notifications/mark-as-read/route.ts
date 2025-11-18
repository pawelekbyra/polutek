import { NextRequest, NextResponse } from 'next/server';
import { markNotificationsAsRead } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const payload = await verifySession();
  if (!payload || !payload.user) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
  }
  const userId = payload.user.id;

  try {
    const { notificationIds } = await request.json();

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json({ success: false, message: 'notificationIds is required and must be a non-empty array of strings' }, { status: 400 });
    }

    await markNotificationsAsRead(notificationIds, userId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
