import { useCallback } from 'react';

// TODO: Define types
interface Comment {
  id: string;
}
interface Mention {}
interface GifData {}

export const useCreateComment = () => {
  const createComment = useCallback(
    async ({
      entityId,
      parentCommentId,
      content,
      gif,
      mentions,
    }: {
      entityId: string;
      parentCommentId: string | null;
      content?: string;
      gif?: GifData;
      mentions?: Mention[];
    }) => {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slideId: entityId,
          text: content,
          parentId: parentCommentId,
          gif,
          mentions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      return response.json();
    },
    []
  );

  return createComment;
};

export default useCreateComment;
