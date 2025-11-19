import { prisma } from './prisma';
import { Slide, VideoSlideData, HtmlSlideData } from './types';
import { Slide as PrismaSlide, SlideType as PrismaSlideType, AccessLevel } from '@prisma/client';

// Helper to map Prisma Slide to App Slide
function mapPrismaSlideToAppSlide(pSlide: PrismaSlide & { author: { username: string, avatar: string | null } }): Slide {
    const content = pSlide.content as any; // Json type

    const base = {
        id: pSlide.id,
        userId: pSlide.authorId,
        username: pSlide.author.username,
        avatar: pSlide.author.avatar || '',
        x: 0, // Deprecated in schema but required by type
        y: pSlide.feedOrder, // Map feedOrder to y for sorting? or just 0.
        createdAt: pSlide.createdAt.getTime(),
        initialLikes: 0, // Need to fetch
        initialComments: 0, // Need to fetch
        isLiked: false, // Need context
        access: pSlide.access === AccessLevel.Secret ? 'secret' : 'public',
    };

    if (pSlide.type === PrismaSlideType.Video) {
        return {
            ...base,
            type: 'video',
            access: base.access as 'public' | 'secret',
            data: {
                mp4Url: content.mp4Url || '',
                hlsUrl: content.hlsUrl || null,
                poster: content.poster || '',
                title: pSlide.title || '',
                description: pSlide.description || '',
            }
        } as Slide;
    } else {
        return {
            ...base,
            type: 'html',
            access: base.access as 'public' | 'secret',
            data: {
                htmlContent: content.htmlContent || '',
            }
        } as Slide;
    }
}

export async function getSlide(slideId: string): Promise<Slide | null> {
    const pSlide = await prisma.slide.findUnique({
        where: { id: slideId },
        include: { author: true }
    });
    if (!pSlide) return null;
    return mapPrismaSlideToAppSlide(pSlide);
}

export async function getAllSlides(): Promise<Slide[]> {
    const pSlides = await prisma.slide.findMany({
        include: { author: true },
        orderBy: { feedOrder: 'asc' }
    });
    return pSlides.map(mapPrismaSlideToAppSlide);
}

export async function createSlide(slideData: Omit<Slide, 'id' | 'createdAt' | 'initialLikes' | 'isLiked' | 'initialComments'>): Promise<Slide> {
    // Map App Slide data to Prisma
    const content = slideData.data;
    const access = slideData.access === 'secret' ? AccessLevel.Secret : AccessLevel.Public;
    const type = slideData.type === 'video' ? PrismaSlideType.Video : PrismaSlideType.Html;

    // We need authorId. App Slide has userId.
    const pSlide = await prisma.slide.create({
        data: {
            authorId: slideData.userId,
            type: type,
            access: access,
            title: (content as any).title || null,
            description: (content as any).description || null,
            content: content as any,
            feedOrder: slideData.y || 0, // Use y as feedOrder if present
        },
        include: { author: true }
    });
    return mapPrismaSlideToAppSlide(pSlide);
}

export async function updateSlide(slideId: string, updates: Partial<Omit<Slide, 'id' | 'createdAt' | 'userId' | 'username' | 'x' | 'y'>>): Promise<Slide | null> {
    // This is tricky because updates.data might be partial.
    // For now, assume simple updates.
    const current = await prisma.slide.findUnique({ where: { id: slideId } });
    if (!current) return null;

    const data: any = {};
    if (updates.data) {
        data.content = updates.data as any;
        if ('title' in updates.data) data.title = (updates.data as any).title;
        if ('description' in updates.data) data.description = (updates.data as any).description;
    }

    const pSlide = await prisma.slide.update({
        where: { id: slideId },
        data: data,
        include: { author: true }
    });
    return mapPrismaSlideToAppSlide(pSlide);
}

export async function deleteSlide(slideId: string): Promise<boolean> {
    try {
        await prisma.slide.delete({ where: { id: slideId } });
        return true;
    } catch {
        return false;
    }
}

export async function getSlides(options: { limit?: number, cursor?: string, currentUserId?: string }): Promise<Slide[]> {
    const { limit = 10, cursor, currentUserId } = options;

    const pSlides = await prisma.slide.findMany({
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined, // Wait, cursor in options is timestamp usually?
        // Previous implementation used createdAt timestamp as cursor.
        // Prisma cursor requires unique ID or unique compound.
        // If cursor is timestamp string, we might need to filter by createdAt < date.
        orderBy: { feedOrder: 'asc' }, // or createdAt
        include: {
            author: true,
            likes: { where: { userId: currentUserId || '' } },
            _count: { select: { likes: true, comments: true } }
        },
        where: cursor ? { createdAt: { lt: new Date(parseInt(cursor)) } } : undefined
    });

    return pSlides.map(p => {
        const s = mapPrismaSlideToAppSlide(p);
        s.initialLikes = p._count.likes;
        s.initialComments = p._count.comments;
        s.isLiked = p.likes.length > 0;
        return s;
    });
}

export async function toggleLike(slideId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    const existingLike = await prisma.like.findUnique({
        where: { slideId_userId: { slideId, userId } }
    });

    let newStatus: 'liked' | 'unliked';

    if (existingLike) {
        await prisma.like.delete({
            where: { slideId_userId: { slideId, userId } }
        });
        newStatus = 'unliked';
    } else {
        await prisma.like.create({
            data: { slideId, userId }
        });
        newStatus = 'liked';
    }

    const count = await prisma.like.count({
        where: { slideId }
    });

    return { newStatus, likeCount: count };
}

export async function getSlidesInView(options: { x: number, y: number, width: number, height: number, currentUserId?: string, metadataOnly?: boolean }): Promise<Slide[]> {
    // In the new schema, x/y are less relevant, but we can map feedOrder to y.
    // We will just fetch all or by feedOrder.
    const { currentUserId } = options;

    const pSlides = await prisma.slide.findMany({
        include: {
            author: true,
            likes: { where: { userId: currentUserId || '' } },
            _count: { select: { likes: true, comments: true } }
        },
        orderBy: { feedOrder: 'asc' }
    });

     return pSlides.map(p => {
        const s = mapPrismaSlideToAppSlide(p);
        s.initialLikes = p._count.likes;
        s.initialComments = p._count.comments;
        s.isLiked = p.likes.length > 0;
        return s;
    });
}
