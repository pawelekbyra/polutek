import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

// PUT handler to update the user's profile
export async function PUT(req: NextRequest) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }
    const currentUserId = session.user.id;

    try {
        const body = await req.json();
        const { firstName, lastName, email } = body;

        if (!firstName || !lastName || !email) {
            return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser && existingUser.id !== currentUserId) {
            return NextResponse.json({ success: false, message: 'This email is already in use.' }, { status: 409 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUserId },
            data: {
                email,
                displayName: `${firstName} ${lastName}`,
            }
        });

        // With NextAuth + JWT strategy, the session will be updated in the next request
        // because the 'jwt' callback in auth.ts is already configured to fetch fresh data from DB
        // if the trigger is 'update' OR on session refresh.

        const { password, ...userPayload } = updatedUser;
        return NextResponse.json({ success: true, data: userPayload });

    } catch (error) {
        console.error('Error in profile update API:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
