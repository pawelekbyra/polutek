import type { User, Comment } from './db.interfaces';

// In-memory store for mock data
let users: { [id: string]: User } = {
  "user_admin_01": {
    id: "user_admin_01",
    username: "admin",
    email: "admin",
    password: "$2b$10$cPzLYOVH./kw0c0bh93tL.2rMCzlqksiG/CILtgr3UuXsYbeSFMJq", // admin
    role: "admin",
    displayName: "Administrator",
    avatar: "https://i.pravatar.cc/150?u=admin",
    sessionVersion: 1,
  }
};
let comments: { [id: string]: Comment } = {};

// Mock database object
export const db = {
  // --- User Functions ---
  async findUserByEmail(email: string): Promise<User | undefined> {
    return Object.values(users).find(user => user.email === email);
  },

  async findUserById(id: string): Promise<User | undefined> {
    return users[id];
  },

  async createUser(userData: Omit<User, 'id' | 'sessionVersion'>): Promise<User> {
    const id = `user_${crypto.randomUUID()}`;
    const user: User = { ...userData, id, sessionVersion: 1 };
    users[id] = user;
    return user;
  },

  // --- Comment Functions ---
  async getComments(slideId: string) {
    return Object.values(comments).filter(c => c.slideId === slideId).sort((a, b) => b.createdAt - a.createdAt);
  },

  async addComment(slideId: string, userId: string, text: string, parentId: string | null = null) {
    const user = await this.findUserById(userId) || { username: 'mockuser', displayName: 'Mock User', avatar: '' };
    const commentId = `comment_${crypto.randomUUID()}`;
    const newComment: Comment = {
      id: commentId,
      slideId,
      userId,
      text,
      parentId,
      createdAt: Date.now(),
      likedBy: [],
      user: { displayName: user.displayName || user.username, avatar: user.avatar || '' },
      replies: [],
    };
    comments[commentId] = newComment;

    return newComment;
  },

  async toggleCommentLike(commentId: string, userId: string): Promise<{ newStatus: 'liked' | 'unliked', likeCount: number }> {
    const comment = comments[commentId];
    if (!comment) {
      throw new Error('Comment not found');
    }

    let newStatus: 'liked' | 'unliked';
    const index = comment.likedBy.indexOf(userId);

    if (index > -1) {
      // User has already liked, so unlike
      comment.likedBy.splice(index, 1);
      newStatus = 'unliked';
    } else {
      // User has not liked, so like
      comment.likedBy.push(userId);
      newStatus = 'liked';
    }

    return { newStatus, likeCount: comment.likedBy.length };
  },

  // --- Notification Functions ---
  async getNotifications(userId: string) {
    return [];
  },

  async markNotificationAsRead(notificationId: string) {
    return { success: true };
  },

  async pingDb() {
    return Promise.resolve();
  },
};
