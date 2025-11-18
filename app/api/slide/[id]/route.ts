// app/api/slide/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
        const slide = await prisma.slides.findUnique({
            where: { id: slideId },
            include: {
                likes: {
                    select: {
                        userId: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
                users: {
                    select: {
                        avatar: true,
                    }
                }
            },
        });

        if (!slide) {
            return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
        }

        const { likes, comments, users, slideType, content, createdAt, ...rest } = slide;
        const formattedSlide = {
            ...rest,
            avatar: users?.avatar,
            type: slideType,
            createdAt: createdAt ? new Date(createdAt).getTime() : 0,
            initialLikes: likes.length,
            initialComments: comments.length,
            isLiked: currentUserId ? likes.some(like => like.userId === currentUserId) : false,
            data: JSON.parse(content || '{}'),
        }

        return NextResponse.json(formattedSlide);

    } catch (error) {
        console.error('Failed to fetch slide:', error);
        return NextResponse.json({ error: 'Failed to fetch slide' }, { status: 500 });
    }
}
