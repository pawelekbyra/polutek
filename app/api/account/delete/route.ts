// app/api/account/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const deleteAccountSchema = z.object({
    password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
    const session = await verifySession();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validatedFields = deleteAccountSchema.safeParse(body);

    if (!validatedFields.success) {
        return NextResponse.json({ error: 'Invalid input', details: validatedFields.error.flatten() }, { status: 400 });
    }

    const { password } = validatedFields.data;

    try {
        const user = await prisma.users.findUnique({ where: { id: session.user.id } });

        if (!user || !user.password) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        await prisma.users.delete({ where: { id: session.user.id } });

        return NextResponse.json({ success: true, message: 'Account deleted successfully' });

    } catch (error) {
        console.error('Failed to delete account:', error);
        return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
    }
}
