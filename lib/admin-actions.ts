'use server';

import { revalidatePath } from 'next/cache';
import { getAllUsers, updateUser } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { User } from './db.interfaces';
import { Role } from '@prisma/client';

export async function getAllUsersAction(): Promise<User[]> {
  const payload = await verifySession();
  if (!payload || !payload.user || payload.user.role !== 'ADMIN') {
    throw new Error('Not authorized');
  }
  return getAllUsers();
}

export async function updateUserRoleAction(userId: string, role: Role): Promise<User | null> {
  const payload = await verifySession();
  if (!payload || !payload.user || payload.user.role !== 'ADMIN') {
    throw new Error('Not authorized');
  }
  const updatedUser = await updateUser(userId, { role });
  revalidatePath('/admin/users');
  return updatedUser;
}
