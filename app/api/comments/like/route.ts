import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Assuming db is exported from here

export async function POST(request: NextRequest) {
  const { commentId, vote } = await request.json();

  if (!commentId || !vote) {
    return NextResponse.json({ error: 'commentId and vote are required' }, { status: 400 });
  }

  if (vote === 'up') {
    await db.upvoteComment(commentId, '123'); // Mock user ID
  } else if (vote === 'down') {
    await db.downvoteComment(commentId, '123'); // Mock user ID
  } else {
    return NextResponse.json({ error: 'Invalid vote value' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Vote submitted successfully' });
}
