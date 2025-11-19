import { NextRequest, NextResponse } from 'next/server';
import { getUserByPasswordResetToken, updateUser } from '@/lib/db-postgres';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, message: 'Token and password are required' }, { status: 400 });
    }

    // Hash the token that the user provides to match the one in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await getUserByPasswordResetToken(hashedToken);

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      return NextResponse.json({ success: false, message: 'Token is invalid or has expired' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token fields
    await updateUser(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
      // Also, increment session version to log out of all other devices
      sessionVersion: (user.sessionVersion || 0) + 1,
    });

    return NextResponse.json({ success: true, message: 'Password has been reset successfully.' });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
