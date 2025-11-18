import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Assuming db is exported from here

export async function POST(request: NextRequest) {
  await db.markNotificationsAsRead('123'); // Mock user ID

  return NextResponse.json({ message: 'Notifications marked as read' });
}
