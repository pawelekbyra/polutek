export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Mention {
  id: string;
  name: string;
}

export interface GifData {
  id: string;
  url: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string | null;
  gif: GifData | null;
  mentions: Mention[];
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  parentDeletedAt: Date | null;
  upvotes: string[];
  downvotes: string[];
  repliesCount: number;
  metadata: Record<string, any>;
  foreignId: string | null;
  projectId: string;
  userId: string;
  entityId: string;
}

export interface Entity {
  id: string;
  foreignId: string | null;
  shortId: string | null;
  repliesCount: number;
}

export interface EntityCommentsTree {
  [key: string]: {
    comment: Comment;
    replies: {
      [key: string]: Comment;
    };
    new?: boolean;
  };
}

export type CommentsSortByOptions = 'top' | 'newest' | 'oldest';
