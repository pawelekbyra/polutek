// app/api/profile/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateUser, changePassword } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const updateProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional(),
    email: z.string().email('Invalid email address').optional(),
    emailConsent: z.boolean().optional(),
    emailLanguage: z.enum(['pl', 'en']).optional(),
    newPassword: z.string().min(8).optional(),
    isProfileComplete: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
    const session = await verifySession();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validatedFields = updateProfileSchema.safeParse(body);

    if (!validatedFields.success) {
        return NextResponse.json({ error: 'Invalid input', details: validatedFields.error.flatten() }, { status: 400 });
    }

    const { firstName, lastName, email, newPassword, isProfileComplete } = validatedFields.data;

    try {
        // Handle password change separately
        if (newPassword) {
            await changePassword(session.user.id, newPassword);
        }

        // Handle other profile updates
        const dataToUpdate: any = {};
        if (firstName && lastName) dataToUpdate.displayName = `${firstName} ${lastName}`;
        if (email) dataToUpdate.email = email;
        if (isProfileComplete !== undefined) dataToUpdate.is_profile_complete = isProfileComplete;

        let updatedUser = session.user;
        if (Object.keys(dataToUpdate).length > 0) {
            const result = await updateUser(session.user.id, dataToUpdate);
            const { password, ...userPayload } = result;
            updatedUser = userPayload;
        }

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error('Failed to update profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
