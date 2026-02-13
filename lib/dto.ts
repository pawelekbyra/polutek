// --- Base Types from Prisma (Extended) ---

// Public User Profile (stripped of sensitive data)
export type PublicUser = {
    id: string;
    username: string | null;
    displayName: string | null;
    avatar: string | null;
    role: string;
};

// Comment with Relations (matching what the frontend needs)
// Includes author, nested replies (recursive), and like count/status
export type CommentWithRelations = {
    id: string;
    text: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    slideId: string;
    parentId: string | null;
    author: {
        id: string;
        username: string | null;
        displayName: string | null;
        avatar: string | null;
        role: string;
    };
    isLiked: boolean;
    replies?: CommentWithRelations[];
    parentAuthorUsername?: string | null;
    parentAuthorId?: string | null;
    _count?: {
        likes: number;
        replies?: number;
    };
};

// --- Slide Types (Consolidating Frontend & Backend) ---

export interface BaseSlideDTO {
  id: string;
  // Core data
  userId: string;
  username: string | null;
  avatar: string;

  // Metadata
  createdAt: string; // ISO string from JSON

  // Social
  initialLikes: number;
  isLiked: boolean;
  initialComments: number;

  // Settings
  accessLevel: 'PUBLIC' | 'SECRET_PATRON' | 'SECRET_PWA';
}

export interface HtmlSlideDataDTO {
  htmlContent: string;
}

export interface HtmlSlideDTO extends BaseSlideDTO {
  type: 'html';
  data: HtmlSlideDataDTO;
}

export interface VideoSlideDataDTO {
  mp4Url: string;
  hlsUrl: string | null;
  poster: string;
  title: string;
  description: string;
}

export interface VideoSlideDTO extends BaseSlideDTO {
  type: 'video';
  data: VideoSlideDataDTO;
}

export type SlideDTO = HtmlSlideDTO | VideoSlideDTO;

// --- API Responses ---

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  nextCursor?: string | null;
}
