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

async function checkAdmin() {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Musisz być zalogowany.');
    }

    const currentUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
    });

    if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Brak uprawnień. Wymagana rola administratora.');
    }
    return session.user.id;
}

export async function createUserByAdmin(email: string) {
    try {
        await checkAdmin();

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

        if (!['user', 'admin', 'patron', 'author'].includes(newRole)) {
            return { success: false, message: 'Nieprawidłowa rola.' };
        }

        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });

        revalidatePath('/admin');
        return { success: true, message: `Rola użytkownika zmieniona na ${newRole}.` };
    } catch (error: any) {
        return { success: false, message: error.message || 'Błąd aktualizacji roli.' };
    }
}
