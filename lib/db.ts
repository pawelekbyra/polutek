// lib/db.ts
import * as postgres from './db-prisma';
import { SlideDTO as Slide } from './dto';

// This type definition merges the exported functions from db-prisma with additional,
// potentially custom or dynamically determined methods that might be added at runtime.
export type Db = typeof postgres & {
    getAllColumnCoords?: () => Promise<{ x: number }[]>;

    getSlidesInColumn?: (
        columnIndex: number,
        options: { offset?: number; limit?: number; currentUserId?: string }
    ) => Promise<Slide[]>;

    getSlides?: (options: { limit?: number, cursor?: string, currentUserId?: string }) => Promise<Slide[]>;
};

let db: Db;

// Force use of Prisma implementation
db = postgres;
console.log("Using Prisma (SQLite) DB implementation.");

// Export the configured database instance for use in other parts of the application.
export { db };

// Re-export all interfaces from db.interfaces to make them available
// to any module that imports from 'lib/db'.
export * from './db.interfaces';

// EXPORT ALL FUNCTIONS DIRECTLY
export * from './db-prisma';
