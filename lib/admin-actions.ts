"use server";

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import * as bcrypt from '@node-rs/bcrypt';
import { sendWelcomeEmail } from '@/lib/email';

// Helper for generating random password
function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export async function createUserByAdmin(email: string) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, message: 'Musisz być zalogowany.' };
        }

        // Verify ADMIN role
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        });

        // Use lowercase 'admin' to match typical convention and Prisma schema default (lower case)
        if (!currentUser || currentUser.role !== 'admin') {
            return { success: false, message: 'Brak uprawnień. Wymagana rola administratora.' };
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, message: 'Użytkownik z tym adresem email już istnieje.' };
        }

        const tempPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Ensure username is unique
        let username = email.split('@')[0];
        const checkUsername = await prisma.user.findUnique({ where: { username } });
        if (checkUsername) {
            username = `${username}_${Math.floor(Math.random() * 1000)}`;
        }

        // Create User
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username: username,
                displayName: username,
                role: 'user', // Default role
                emailConsent: true,
                emailLanguage: 'pl'
            }
        });

        // Send Welcome Email
        const emailResult = await sendWelcomeEmail(email, tempPassword);

        if (!emailResult.success) {
            // We return success true because the user WAS created, but warn about email.
            return {
                success: true,
                message: `Użytkownik utworzony. Błąd wysyłki email. Hasło: ${tempPassword}`
            };
        }

        return { success: true, message: 'Użytkownik utworzony i powiadomiony mailowo.' };

    } catch (error: any) {
        console.error("Error creating user:", error);
        return { success: false, message: 'Wystąpił błąd serwera.' };
    }
}
