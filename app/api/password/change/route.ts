import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import * as bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: 'New password must be at least 8 characters long.' }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'New passwords do not match.' }, { status: 400 });
    }

    const userFromDb = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!userFromDb) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    if (!userFromDb.password) {
        return NextResponse.json({ success: false, message: 'Incorrect current password.' }, { status: 403 });
    }
    const isPasswordCorrect = await bcrypt.compare(currentPassword, userFromDb.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ success: false, message: 'Incorrect current password.' }, { status: 403 });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            password: newPasswordHash,
            sessionVersion: (userFromDb.sessionVersion || 1) + 1,
        }
    });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully!',
    });

  } catch (error) {
    console.error('Error in password change API:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
