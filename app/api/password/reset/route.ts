import { NextRequest, NextResponse } from 'next/server';
import { getPasswordResetToken, findUserById, updateUser, deletePasswordResetToken } from '@/lib/db-postgres';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, message: 'Token and password are required' }, { status: 400 });
    }

    // The user provides the raw token, we don't hash it here, we match it in the DB.
    // The token in the DB is also not hashed in this implementation.
    const resetToken = await getPasswordResetToken(token);

    if (!resetToken || new Date() > new Date(resetToken.expiresAt)) {
      return NextResponse.json({ success: false, message: 'Token is invalid or has expired' }, { status: 400 });
    }

    const user = await findUserById(resetToken.userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
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

    // Invalidate the token after use
    await deletePasswordResetToken(resetToken.id);

    return NextResponse.json({ success: true, message: 'Password has been reset successfully.' });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
