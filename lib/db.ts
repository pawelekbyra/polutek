// lib/db.ts
import * as dbLayer from './db-postgres';
export * from './db.interfaces';
export * from './db-postgres';

export const db = dbLayer;
