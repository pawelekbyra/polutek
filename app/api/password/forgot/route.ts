import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUser } from '@/lib/db-postgres';
import { sendPasswordResetLinkEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      // We don't want to reveal if a user exists or not
      return NextResponse.json({ success: true, message: 'If your account exists, a password reset link has been sent.' });
    }

    // Generate a reset token that expires in 1 hour
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save the token and expiry to the user
    await updateUser(user.id, {
      passwordResetToken,
      passwordResetExpires,
    });

    // Construct the reset link
    const resetUrl = `${req.nextUrl.origin}/reset-password?token=${resetToken}`;

    // Send the email
    await sendPasswordResetLinkEmail(email, resetUrl);

    return NextResponse.json({ success: true, message: 'If your account exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Password forgot error:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
