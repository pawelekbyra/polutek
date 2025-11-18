// app/api/slide/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSlideById, Like } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const slideId = params.id;

    if (!slideId) {
        return NextResponse.json({ error: 'Slide ID is required' }, { status: 400 });
    }

    const session = await verifySession();
    const currentUserId = session?.user?.id;

    try {
        const slide = await getSlideById(slideId, {
            include: {
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
                author: {
                    select: {
                        avatar: true,
                    }
                }
            },
        });

        if (!slide) {
            return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
        }

        const { likes, _count, author, ...rest } = slide;
        const formattedSlide = {
            ...rest,
            avatar: author?.avatar,
            initialLikes: likes.length,
            initialComments: _count.comments,
            isLiked: currentUserId ? (likes as Like[]).some(like => like.userId === currentUserId) : false,
        }

        return NextResponse.json(formattedSlide);

    } catch (error) {
        console.error('Failed to fetch slide:', error);
        return NextResponse.json({ error: 'Failed to fetch slide' }, { status: 500 });
    }
}
