// lib/db.ts
import * as postgres from './db-postgres';
import * as slides from './db-slides';
import { Slide } from './types';

// Combine postgres user/auth/notif functions with prisma slide functions
export const db = {
    ...postgres,
    ...slides,
    // Mock/extra functions if needed for compatibility
    getAllColumnCoords: async () => [{ x: 0 }],
    getSlidesInColumn: async (col: number, opts: any) => slides.getSlides(opts),
};

// Export types
export * from './db.interfaces';
