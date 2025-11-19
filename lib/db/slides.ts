import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

/**
 * Gets a paginated list of slides with cursor.
 * @param cursor The cursor for pagination.
 * @param limit The number of slides to fetch.
 * @param userId The ID of the current user to check for likes.
 */
export const getSlidesWithCursor = async (cursor: string | undefined, limit: number, userId?: string) => {
  const slides = await prisma.slide.findMany({
    take: limit,
    ...(cursor && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      likes: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  return slides.map(slide => ({
    ...slide,
    isLiked: slide.likes.length > 0,
  }));
};

/**
 * Gets a single slide by its ID with optional related data.
 * @param id The ID of the slide.
 * @param include Optional object to include related data.
 */
export const getSlideById = async <T extends Prisma.SlideInclude>(id: string, include?: T) => {
  return prisma.slide.findUnique({
    where: { id },
    ...(include && { include }),
  });
};

/**
 * Toggles a like on a slide for a user.
 * @param slideId The ID of the slide.
 * @param userId The ID of the user.
 */
export const toggleLike = async (slideId: string, userId: string) => {
  const like = await prisma.like.findUnique({
    where: {
      userId_slideId: {
        userId,
        slideId,
      },
    },
  });

  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return { liked: false };
  } else {
    await prisma.like.create({
      data: {
        userId,
        slideId,
      },
    });
    return { liked: true };
  }
};

/**
 * Gets all slides.
 */
export const getAllSlides = async () => {
  return prisma.slide.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      likes: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
};

/**
 * Creates a new slide.
 * @param data The slide data.
 */
export const createSlide = async (data: any) => {
  return prisma.slide.create({
    data,
  });
};

/**
 * Updates a slide.
 * @param id The ID of the slide to update.
 * @param data The data to update.
 */
export const updateSlide = async (id: string, data: any) => {
  return prisma.slide.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a slide.
 * @param id The ID of the slide to delete.
 */
export const deleteSlide = async (id: string) => {
  return prisma.slide.delete({
    where: { id },
  });
};

/**
 * Gets a limited number of slides for a specific author.
 * @param authorId The ID of the author.
 * @param limit The number of slides to fetch.
 */
export const getSlidesByAuthorId = async (authorId: string, limit: number = 6) => {
    return prisma.slide.findMany({
        where: { authorId: authorId },
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            author: true,
            likes: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                },
            },
        },
    });
};
