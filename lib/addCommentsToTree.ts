// TODO: Define Comment and EntityCommentsTree types
interface Comment {
  id: string;
  parentId: string | null;
}

interface EntityCommentsTree {
  [key: string]: {
    comment: Comment;
    replies: {
      [key: string]: Comment;
    };
    new?: boolean;
  };
}

// TODO: Implement handleError
const handleError = (err: any, message: string) => {
  console.error(message, err);
};

function addSingleCommentToTree(
  entityCommentsTree: EntityCommentsTree,
  newComment: Comment,
  newlyAdded?: boolean
): EntityCommentsTree {
  try {
    if (newComment.parentId) {
      if (!entityCommentsTree[newComment.parentId]) return entityCommentsTree;

      return {
        ...entityCommentsTree,
        [newComment.parentId]: {
          ...entityCommentsTree[newComment.parentId],
          replies: {
            ...(entityCommentsTree[newComment.parentId]?.replies || []),
            [newComment.id]: { ...newComment, new: !!newlyAdded },
          },
        },
        [newComment.id]: {
          comment: newComment,
          replies: {},
          new: !!newlyAdded,
        },
      };
    } else {
      return {
        ...entityCommentsTree,
        [newComment.id]: {
          comment: newComment,
          replies: {},
          new: !!newlyAdded,
        },
      };
    }
  } catch (err) {
    handleError(err, "Failed to add a comment to the tree");
    throw new Error();
  }
}

export const addCommentsToTree = (
  setEntityCommentsTree: (
    value: React.SetStateAction<EntityCommentsTree>
  ) => void,
  newComments: Comment[] | undefined,
  newlyAdded?: boolean
) => {
  setEntityCommentsTree((prevCommentsTree) => {
    let newTree = prevCommentsTree;

    if (newComments) {
      for (const comment of newComments) {
        newTree = addSingleCommentToTree(newTree, comment, newlyAdded);
      }
    }

    return newTree;
  });
};
