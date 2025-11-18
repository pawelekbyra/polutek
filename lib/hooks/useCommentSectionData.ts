import { useCallback, useEffect, useRef, useState } from "react";
import { Comment, GifData, Mention } from "../../lib/types";
import { EntityCommentsTree } from "../../lib/types";
import { CommentsSortByOptions } from "../../lib/types";
import { User } from "../../lib/types";
import useCreateComment from "./useCreateComment";
import { handleError } from "../../lib/utils";
import useDeleteComment from "./useDeleteComment";
import useUpdateComment from "./useUpdateComment";
import useEntityComments from "./useEntityComments";
import useFetchComment from "./useFetchComment";
import { useUser } from "../../context/UserContext";
import { Entity } from "../../lib/types";
import { useEntity, useFetchEntity, useFetchEntityByForeignId, useFetchEntityByShortId } from "./useEntities";
import { isUUID } from "../../lib/utils";
import { useStableObject } from "./useStableObject";

export interface UseCommentSectionDataProps {
  entity?: Entity | undefined | null;
  entityId?: string | undefined | null;
  foreignId?: string | undefined | null;
  shortId?: string | undefined | null;
  createIfNotFound?: boolean;
  callbacks?: Record<string, (...args: any[]) => void> | undefined;
  limit?: number;
  defaultSortBy?: CommentsSortByOptions;
  highlightedCommentId?: string | null;
}

export interface UseCommentSectionDataValues {
  entity: Entity | null | undefined;
  callbacks?: Record<string, (...args: any[]) => void> | undefined;
  entityCommentsTree: EntityCommentsTree;
  comments: Comment[];
  newComments: Comment[];
  highlightedComment: {
    comment: Comment;
    parentComment: Comment | null;
  } | null;
  loading: boolean;
  hasMore: boolean;
  submittingComment: boolean;
  loadMore: () => void;
  sortBy: CommentsSortByOptions | null;
  setSortBy: (newSortBy: CommentsSortByOptions) => void;
  pushMention: User | null;
  selectedComment: Comment | null;
  setSelectedComment: (newSelectedComment: Comment | null) => void;
  repliedToComment: Partial<Comment> | null;
  setRepliedToComment: (newRepliedToComment: Comment | null) => void;
  showReplyBanner: boolean;
  setShowReplyBanner: (newState: boolean) => void;
  addCommentsToTree: (
    newComments: Comment[] | undefined,
    newlyAdded?: boolean
  ) => void;
  removeCommentFromTree: (commentId: string) => void;
  handleDeepReply: (comment: Comment) => void;
  handleShallowReply: (comment: Comment) => void;

  createComment: (props: {
    parentId?: string;
    content?: string;
    gif?: GifData;
    mentions: Mention[];
  }) => Promise<void>;
  updateComment: (props: {
    commentId: string;
    content: string;
  }) => Promise<void>;
  deleteComment: (props: { commentId: string }) => Promise<void>;
}

function useCommentSectionData(
  props: UseCommentSectionDataProps
): UseCommentSectionDataValues {
  const {
    entity: entityProp,
    entityId,
    foreignId,
    shortId,
    createIfNotFound,

    defaultSortBy = "top" as CommentsSortByOptions,
    limit = 15,
    callbacks: callbacksProp = {},
    highlightedCommentId,
  } = props;

  const callbacks = useStableObject(callbacksProp);
  const { entity: entityFromContext, setEntity: setContextEntity } = useEntity();
  const [entity, setEntity] = useState<Entity | null | undefined>(
    entityProp ?? entityFromContext
  );

  const { user } = useUser();
  const {
    entityCommentsTree,
    comments,
    newComments,
    loading,
    hasMore,
    sortBy,
    setSortBy,
    loadMore,
    addCommentsToTree,
    removeCommentFromTree,
  } = useEntityComments({ entityId: entity?.id, defaultSortBy, limit });

  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const updateComment = useUpdateComment();
  const fetchComment = useFetchComment();
  const fetchEntity = useFetchEntity();
  const fetchEntityByForeignId = useFetchEntityByForeignId();
  const fetchEntityByShortId = useFetchEntityByShortId();

  const [highlightedComment, setHighlightedComment] = useState<{
    comment: Comment;
    parentComment: Comment | null;
  } | null>(null);
  const fetchingCommentIdRef = useRef<string | null>(null);
  const fetchedStatus = useRef<Record<string, boolean>>({});

  const submittingComment = useRef(false);
  const [submittingCommentState, setSubmittingCommentState] = useState(false);

  const [pushMention, setPushMention] = useState<null | User>(null);
  const [repliedToComment, setRepliedToComment] =
    useState<Partial<Comment> | null>(null);
  const [showReplyBanner, setShowReplyBanner] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleDeepReply = useCallback(
    (comment: Comment) => {
      setRepliedToComment!(comment);
      setShowReplyBanner(true);
    },
    [setRepliedToComment]
  );

  const handleShallowReply = useCallback(
    (comment: Comment) => {
      setRepliedToComment!({ id: comment.parentId ?? undefined });
      setPushMention(comment.user);
    },
    [setRepliedToComment]
  );

  const handleCreateComment = useCallback(
    async (props: {
      parentId?: string;
      content?: string;
      gif?: GifData;
      mentions?: Mention[];
    }) => {
      const { parentId, content, gif, mentions } = props;

      if (submittingComment.current) return;
      if (!entity) return;
      if (!user) return;

      submittingComment.current = true;
      setSubmittingCommentState(true);

      const TEMP_ID = Math.random().toString(36).substring(2, 7);
      const tempNewComment: Comment = {
        id: TEMP_ID,
        foreignId: null,
        projectId: "TEMP_PROJECT_ID",
        userId: user.id,
        parentId: parentId ?? repliedToComment?.id ?? null,
        entityId: entity.id,
        content: content ?? null,
        gif: gif ?? null,
        mentions: mentions ?? [],
        user: user as User,
        upvotes: [],
        downvotes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        parentDeletedAt: null,
        repliesCount: 0,
        metadata: {},
      };

      try {
        addCommentsToTree([tempNewComment], true);
        const newCommentData = await createComment({
          entityId: entity.id,
          parentCommentId: parentId ?? repliedToComment?.id ?? null,
          content,
          gif,
          mentions: mentions ?? [],
        });

        if (newCommentData) {
          removeCommentFromTree(TEMP_ID);
          addCommentsToTree([newCommentData.comment], true);
        }
      } catch (err: unknown) {
        removeCommentFromTree(TEMP_ID);
        handleError(err, "Failed to submit a new comment: ");
      } finally {
        submittingComment.current = false;
        setSubmittingCommentState(false);
      }
    },
    [user, addCommentsToTree, removeCommentFromTree, entity, createComment, repliedToComment, callbacks]
  );

  const handleDeleteComment = useCallback(
    async ({ commentId }: { commentId: string }) => {
      if (!isUUID(commentId)) return;
      try {
        removeCommentFromTree(commentId);
        await deleteComment({ commentId });
      } catch (err) {
        handleError(err, "Failed to delete comment");
      }
    },
    [deleteComment, removeCommentFromTree]
  );

  const handleUpdateComment = useCallback(
    async ({ commentId, content }: { commentId: string; content: string }) => {
      try {
        await updateComment({ commentId, content });
      } catch (err) {
        handleError(err, "Failed to update comment");
      }
    },
    [updateComment]
  );

  useEffect(() => {
    const handleFetchSingleComment = async () => {
      if (fetchingCommentIdRef.current === highlightedCommentId) return;
      fetchingCommentIdRef.current = highlightedCommentId!;

      try {
        const fetchedCommentData = await fetchComment({
          commentId: highlightedCommentId!,
          withParent: true,
        });
        if (fetchedCommentData) {
            setHighlightedComment(fetchedCommentData);
            const { comment: targetComment, parentComment } = fetchedCommentData;
            addCommentsToTree?.(
              parentComment ? [targetComment, parentComment] : [targetComment]
            );
        }
      } catch (err) {
        handleError(err, "Fetching single comment failed");
      }
    };

    if (highlightedCommentId) {
      handleFetchSingleComment();
    }
  }, [highlightedCommentId, fetchComment, addCommentsToTree]);

  useEffect(() => {
    const handleFetchEntity = async () => {
      if (!foreignId && !entityId && !shortId) return;
      if (entity && entityId && entity.id === entityId) return;
      if (entity && foreignId && entity.foreignId === foreignId) return;
      if (entity && shortId && entity.shortId === shortId) return;

      const uniqueKey = `${entityId ?? ""}-${foreignId ?? ""}-${shortId ?? ""}`;
      if (fetchedStatus.current[uniqueKey]) return;
      fetchedStatus.current[uniqueKey] = true;

      try {
        let fetchedEntity: Entity | null = null;
        if (entityId) {
          fetchedEntity = await fetchEntity({ entityId });
        } else if (foreignId) {
          fetchedEntity = await fetchEntityByForeignId({ foreignId, createIfNotFound });
        } else if (shortId) {
          fetchedEntity = await fetchEntityByShortId({ shortId });
        }

        if (fetchedEntity) {
          setEntity(fetchedEntity);
        }
      } catch (err) {
        handleError(err, "Fetching entity failed");
      }
    };

    handleFetchEntity();
  }, [fetchEntity, fetchEntityByForeignId, fetchEntityByShortId, entityId, foreignId, shortId, entity, createIfNotFound]);

  return {
    entity,
    callbacks,
    entityCommentsTree,
    comments,
    newComments,
    highlightedComment,
    loading,
    hasMore,
    submittingComment: submittingCommentState,
    loadMore,
    sortBy,
    setSortBy,
    pushMention,
    selectedComment,
    setSelectedComment,
    repliedToComment,
    setRepliedToComment,
    showReplyBanner,
    setShowReplyBanner,
    addCommentsToTree,
    removeCommentFromTree,
    handleShallowReply,
    handleDeepReply,
    createComment: handleCreateComment,
    updateComment: handleUpdateComment,
    deleteComment: handleDeleteComment,
  };
}

export default useCommentSectionData;
