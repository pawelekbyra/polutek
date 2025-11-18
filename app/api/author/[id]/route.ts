// app/api/author/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const authorId = params.id;

    if (!authorId) {
        return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }

    try {
        const author = await prisma.users.findUnique({
            where: { id: authorId },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true,
                bio: true,
            }
        });

        if (!author) {
            return NextResponse.json({ error: 'Author not found' }, { status: 404 });
        }

        const slides = await prisma.slides.findMany({
            where: { userId: authorId },
            take: 6,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                content: true, // For thumbnail
            }
        });

        const formattedSlides = slides.map(slide => {
            const data = JSON.parse(slide.content || '{}');
            return {
                id: slide.id,
                title: slide.title,
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
