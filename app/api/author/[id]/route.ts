// app/api/author/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findUserById, getSlidesByAuthorId, Slide } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const authorId = params.id;

    if (!authorId) {
        return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }

    try {
        const author = await findUserById(authorId, {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            bio: true,
        });

        if (!author) {
            return NextResponse.json({ error: 'Author not found' }, { status: 404 });
        }

        const slides = await getSlidesByAuthorId(authorId);

        const formattedSlides = slides.map((slide: Slide) => {
            let data: { poster?: string; imageUrl?: string, title?: string } = {};
            try {
                // Prisma returns data as a JSON object, no need to parse
                if (typeof slide.data === 'object' && slide.data !== null) {
                    data = slide.data as { poster?: string; imageUrl?: string, title?: string };
                }
            } catch (e) { /* ignore error */ }

            return {
                id: slide.id,
                title: data.title || 'Untitled',
                thumbnailUrl: data.poster || data.imageUrl || '',
            }
        })

        return NextResponse.json({
            id: author.id,
            username: author.displayName || author.username,
            avatarUrl: author.avatar,
            bio: author.bio,
            slides: formattedSlides,
        });

    } catch (error) {
        console.error('Failed to fetch author profile:', error);
        return NextResponse.json({ error: 'Failed to fetch author profile' }, { status: 500 });
    }
}
