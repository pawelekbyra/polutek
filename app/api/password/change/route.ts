// app/api/password/change/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
    const session = await verifySession();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validatedFields = changePasswordSchema.safeParse(body);

    if (!validatedFields.success) {
        return NextResponse.json({ error: 'Invalid input', details: validatedFields.error.flatten() }, { status: 400 });
    }

    const { currentPassword, newPassword } = validatedFields.data;

    try {
        const user = await prisma.users.findUnique({ where: { id: session.user.id } });

        if (!user || !user.password) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid current password' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.users.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ success: true, message: 'Password changed successfully' });

    } catch (error) {
        console.error('Failed to change password:', error);
        return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
    }
}
