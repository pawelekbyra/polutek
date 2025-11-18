import { NextRequest, NextResponse } from 'next/server';
import rateLimiter from '../../../lib/rate-limiter';
import { pusherServer } from '../../../lib/pusher';
import { db } from '../../../lib/db'; // Assuming db is exported from here
import { sanitize } from '../../../lib/sanitize'; // Assuming sanitize is exported from here

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slideId = searchParams.get('slideId');

  if (!slideId) {
    return NextResponse.json({ error: 'slideId is required' }, { status: 400 });
  }

  const comments = await db.getComments(slideId);

  return NextResponse.json({ comments });
}

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';

  try {
    await rateLimiter.consume(ip);
  } catch (error) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
  }

  const { slideId, text, parentId } = await request.json();

  if (!slideId || !text) {
    return NextResponse.json({ error: 'slideId and text are required' }, { status: 400 });
  }

  const sanitizedText = sanitize(text.trim());
  const slide = await db.getSlide(slideId);

  if (!slide) {
    return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
  }

  const newComment = await db.addComment(slideId, '123', sanitizedText, parentId); // Mock user ID

  await pusherServer.trigger(`comments-${slideId}`, 'new-comment', newComment);

  return NextResponse.json({ message: 'Comment added successfully', comment: newComment });
}
