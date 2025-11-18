import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { findUserById } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const payload = await verifySession();

    if (!payload || !payload.user) {
        return NextResponse.json({ isLoggedIn: false, user: null });
    }

    const freshUser = await findUserById(payload.user.id);
    if (!freshUser) {
        // This can happen if the user was deleted but the cookie remains.
        return NextResponse.json({ isLoggedIn: false, user: null });
    }
    const { password, ...userPayload } = freshUser;

    return NextResponse.json({ isLoggedIn: true, user: userPayload });
}
