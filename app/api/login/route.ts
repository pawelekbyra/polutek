import { NextResponse } from 'next/server';
import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { login, password } = body;

    if (!login || !password) {
      return NextResponse.json({ success: false, message: 'Missing login or password' }, { status: 400 });
    }

    // Delegate authentication to NextAuth's `signIn` function
    // It will use the `authorize` function in `auth.ts`
    await signIn('credentials', {
      login,
      password,
      redirect: false, // Prevent NextAuth from redirecting
    });

    // If signIn completes without throwing an error, authentication was successful.
    // Now, fetch the user data to return to the client.
    let user = null;
    if (login.includes('@')) {
      user = await prisma.user.findUnique({ where: { email: login } });
    } else {
      user = await prisma.user.findUnique({ where: { username: login } });
    }

    // This should always find a user if signIn was successful, but as a safeguard:
    if (!user) {
        return NextResponse.json({ success: false, message: 'User not found after successful login' }, { status: 500 });
    }

    // Prepare a safe user object to return
    const userWithoutPassword = {
        id: user.id,
        email: user.email,
        displayName: user.displayName || user.name,
        username: user.username,
        role: user.role,
        avatar: user.avatar || user.image || DEFAULT_AVATAR_URL,
    };

    return NextResponse.json({ success: true, user: userWithoutPassword });

  } catch (error) {
    // Handle NextAuth specific errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          // This error is thrown when the `authorize` function returns null
          return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        default:
          return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 });
      }
    }

    // If it's not a NextAuth error, it might be something else (e.g., JSON parsing).
    // Let Next.js handle it by re-throwing, which will result in a 500.
    // Or, for more control, return a generic error response.
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
