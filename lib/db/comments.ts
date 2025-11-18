import { prisma } from '../prisma';

/**
 * Gets all comments for a given slide.
 * @param slideId The ID of the slide.
 * @param userId The ID of the current user to check for votes.
 */
export const getCommentsBySlideId = async (slideId: string, userId?: string) => {
    const comments = await prisma.comment.findMany({
        where: { slideId },
        include: {
            author: true,
            votes: true,
            children: {
                include: {
                    author: true,
                    votes: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    // Map user's vote status
    return comments.map(comment => ({
        ...comment,
        userVote: comment.votes.find(v => v.userId === userId)?.type,
        upvotes: comment.votes.filter(v => v.type === 'upvote').length,
        downvotes: comment.votes.filter(v => v.type === 'downvote').length,
        children: comment.children.map(reply => ({
            ...reply,
            userVote: reply.votes.find(v => v.userId === userId)?.type,
            upvotes: reply.votes.filter(v => v.type === 'upvote').length,
            downvotes: reply.votes.filter(v => v.type === 'downvote').length,
        })),
    }));
};

/**
 * Adds a new comment.
 * @param data The comment data.
 */
export const addComment = async (data: { content: string; slideId: string; authorId: string; parentId?: string; }) => {
    return prisma.comment.create({
        data,
        include: {
            author: true,
        },
    });
};

/**
 * Toggles a vote on a comment.
 * @param commentId The ID of the comment.
 * @param userId The ID of the user.
 * @param voteType The type of vote ('upvote' or 'downvote').
 */
export const toggleCommentVote = async (commentId: string, userId: string, voteType: 'upvote' | 'downvote') => {
    const existingVote = await prisma.commentVote.findUnique({
        where: {
            userId_commentId: {
                userId,
                commentId,
            },
        },
    });

    let newStatus: 'upvoted' | 'downvoted' | 'none';

    if (existingVote) {
        if (existingVote.type === voteType) {
            // User is undoing their vote
            await prisma.commentVote.delete({ where: { id: existingVote.id } });
            newStatus = 'none';
        } else {
            // User is changing their vote
            await prisma.commentVote.update({
                where: { id: existingVote.id },
                data: { type: voteType },
            });
            newStatus = voteType === 'upvote' ? 'upvoted' : 'downvoted';
        }
    } else {
        // User is casting a new vote
        await prisma.commentVote.create({
            data: {
                userId,
                commentId,
                type: voteType,
            },
        });
        newStatus = voteType === 'upvote' ? 'upvoted' : 'downvoted';
    }

    const votes = await prisma.commentVote.findMany({
        where: { commentId },
    });

    return {
        newStatus,
        upvotesCount: votes.filter(v => v.type === 'upvote').length,
        downvotesCount: votes.filter(v => v.type === 'downvote').length,
    };
};

/**
 * Gets a single comment by its ID.
 * @param id The ID of the comment.
 */
export const getCommentById = async (id: string) => {
    return prisma.comment.findUnique({
        where: { id },
    });
};
