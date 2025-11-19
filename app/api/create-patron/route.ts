import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser, updateUser } from '@/lib/db-postgres';
import { UserRole } from '@/lib/db.interfaces';
import { sendPasswordResetLinkEmail } from '@/lib/email';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, username, displayName } = await req.json();

    if (!email || !username || !displayName) {
      return NextResponse.json({ success: false, message: 'Email, username, and displayName are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'An account with this email already exists.' }, { status: 409 });
    }

    // Create a temporary, unusable password hash
    const tempPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);

    const newUser = await createUser({
      email,
      username,
      displayName,
      password: tempPassword,
      role: UserRole.PATRON,
    });

    // Generate a reset token to force password setup
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 24 * 3600000); // 24 hours

    await updateUser(newUser.id, {
      passwordResetToken,
      passwordResetExpires,
    });

    // Construct the password setup link
    const setupUrl = `${req.nextUrl.origin}/reset-password?token=${resetToken}`;

    // Send the email, welcoming them and asking to set a password
    await sendPasswordResetLinkEmail(email, setupUrl);

    return NextResponse.json({ success: true, user: { id: newUser.id, email: newUser.email } });

  } catch (error) {
    console.error('Create patron error:', error);
    // Check for unique constraint error, e.g., on 'username'
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
        return NextResponse.json({ success: false, message: 'A user with that username already exists.' }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
