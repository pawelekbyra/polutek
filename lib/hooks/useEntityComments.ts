import { useState, useEffect, useCallback } from 'react';
import { addCommentsToTree } from '../../lib/addCommentsToTree';
import { Comment, EntityCommentsTree } from '../../lib/types';

export const useEntityComments = ({ entityId, defaultSortBy, limit }: any) => {
  const [entityCommentsTree, setEntityCommentsTree] = useState<EntityCommentsTree>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComments, setNewComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState(defaultSortBy);

  const fetchComments = useCallback(async (currentCursor: string | null) => {
    if (!entityId || loading) return;

    setLoading(true);
    try {
      const url = `/api/comments?slideId=${entityId}&sortBy=${sortBy}&limit=${limit}${currentCursor ? `&cursor=${currentCursor}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.comments.length > 0) {
        setComments(prev => currentCursor ? [...prev, ...data.comments] : data.comments);
        addCommentsToTree(setEntityCommentsTree, data.comments);
      }

      setHasMore(data.comments.length === limit);
      setCursor(data.nextCursor || null);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    } finally {
      setLoading(false);
    }
  }, [entityId, sortBy, limit, loading]);

  useEffect(() => {
    setComments([]);
    setCursor(null);
    fetchComments(null);
  }, [entityId, sortBy]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchComments(cursor);
    }
  };

  const removeCommentFromTree = (commentId: string) => {
    setEntityCommentsTree(prevTree => {
      const newTree = { ...prevTree };
      delete newTree[commentId];
      // Also remove from replies
      for (const key in newTree) {
        if (newTree[key].replies[commentId]) {
          delete newTree[key].replies[commentId];
        }
      }
      return newTree;
    });
  };

  return {
    entityCommentsTree,
    comments,
    newComments,
    loading,
    hasMore,
    sortBy,
    setSortBy,
    loadMore,
    addCommentsToTree: (newComments: any, newlyAdded: any) => addCommentsToTree(setEntityCommentsTree, newComments, newlyAdded),
    removeCommentFromTree,
  };
};

export default useEntityComments;
