import { NextRequest, NextResponse } from 'next/server';
import { getSlides } from '@/lib/db-prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor') || undefined;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 5;

    const session = await auth();
    const currentUserId = session?.user?.id;

    const slides = await getSlides({ limit, cursor, currentUserId });

    let nextCursor: string | null = null;
    if (slides.length === limit) {
      const lastSlide = slides[slides.length - 1];
      nextCursor = lastSlide.createdAt.toString();
    }

    return NextResponse.json({
      slides,
      nextCursor,
    });
  } catch (error: any) {
    console.error('Failed to fetch slides:', error?.message || error);
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 });
  }
}
