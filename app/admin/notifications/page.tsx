import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNotificationsClient from './AdminNotificationsClient';
import React from 'react';
import { UserRole } from '@/lib/db.interfaces';

export const dynamic = 'force-dynamic';

export default async function AdminNotificationsPage() {
  const payload = await verifySession();
  if (!payload || payload.user.role !== UserRole.ADMIN) {
    redirect('/admin/login');
  }

  return <AdminNotificationsClient />;
}
