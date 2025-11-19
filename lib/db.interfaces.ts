// This file contains the core data interfaces used in lib/db.ts
// It is separated to avoid circular dependencies when types are needed in other files.

export enum UserRole {
  ADMIN = 'ADMIN',
  TWÓRCA = 'TWÓRCA',
  PATRON = 'PATRON',
}

export interface User {
  id: string;
  email: string;
  username: string;
  password?: string | null;
  displayName?: string | null;
  avatar?: string | null;
  sessionVersion?: number;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  stripeCustomerId?: string | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
}

export interface Comment {
  id: string;
  slideId: string;
  userId: string;
  text: string;
  createdAt: number; // Unix timestamp
  likedBy: string[]; // Array of userIds
  parentId?: string | null;
  replies?: Comment[];
  // This can be hydrated with user info
  user?: {
    id: string;
    displayName: string;
    avatar: string;
  }
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  text: string;
  link: string; // e.g., /slide/slide_id?comment=comment_id
  createdAt: number;
  read: boolean;
  fromUser?: {
    id: string;
    displayName: string;
    avatar: string;
  };
}
