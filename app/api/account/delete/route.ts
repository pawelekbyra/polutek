// app/api/account/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { deleteAccount } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { z } from 'zod';

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
        const success = await deleteAccount(session.user.id, password);

        if (!success) {
            return NextResponse.json({ error: 'Invalid password or user not found' }, { status: 400 });
        }

        // Clear the session cookie upon successful deletion
        const response = NextResponse.json({ success: true, message: 'Account deleted successfully' });
        response.cookies.delete('session');
        return response;

    } catch (error) {
        console.error('Failed to delete account:', error);
        return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
    }
}
