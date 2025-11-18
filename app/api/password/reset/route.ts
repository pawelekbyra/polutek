import { NextRequest, NextResponse } from 'next/server';
import { getPasswordResetToken, deletePasswordResetToken, updateUser } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Missing token or password.' }, { status: 400 });
    }

    const savedToken = await getPasswordResetToken(token);

    if (!savedToken) {
      return NextResponse.json({ message: 'Invalid or expired token.' }, { status: 400 });
    }

    if (new Date() > new Date(savedToken.expiresAt)) {
      await deletePasswordResetToken(token);
      return NextResponse.json({ message: 'Token has expired.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUser(savedToken.userId, { password: hashedPassword });

    await deletePasswordResetToken(token);

    return NextResponse.json({ message: 'Password has been reset successfully.' });

  } catch (error) {
    console.error('Error in reset password route:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
