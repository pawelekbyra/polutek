// app/api/profile/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';
import { z } from 'zod';

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

    const dataToUpdate: any = {};
    if (firstName && lastName) dataToUpdate.displayName = `${firstName} ${lastName}`;
    if (email) dataToUpdate.email = email;
    if (isProfileComplete) dataToUpdate.is_profile_complete = isProfileComplete;
    if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        dataToUpdate.password = hashedPassword;
    }


    try {
        const updatedUser = await prisma.users.update({
            where: { id: session.user.id },
            data: dataToUpdate,
        });

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error('Failed to update profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
