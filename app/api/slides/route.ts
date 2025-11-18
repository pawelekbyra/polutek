import { NextRequest, NextResponse } from 'next/server';
import { getSlidesWithCursor } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor') || undefined;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 5;

    const session = await verifySession();
    const currentUserId = session?.user?.id;

    const slides = await getSlidesWithCursor(cursor, limit, currentUserId);

    let nextCursor: string | null = null;
    if (slides.length === limit) {
      nextCursor = slides[slides.length - 1].id;
    }

    return NextResponse.json({
      slides,
      nextCursor,
    });
  } catch (error) {
    console.error('Failed to fetch slides:', error);
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 });
  }
}
