// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as db from '../lib/db'; // Using the new data layer

(async () => {
    console.log("Starting admin creation script...");
    const adminUsername = 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error("ADMIN_PASSWORD environment variable is not set.");
        process.exit(1);
    }

    try {
        // 1. Check if admin user exists
        const adminUser = await db.findUserByEmail(adminUsername);

        if (adminUser) {
            console.log(`User '${adminUsername}' already exists.`);
            // 2a. If user exists, ensure their role is 'ADMIN'
            if (adminUser.role !== 'ADMIN') {
                console.log("Updating user to have 'ADMIN' role.");
                await db.updateUser(adminUser.id, { role: 'ADMIN' });
            }
            // 2b. Optionally update password if needed
            const isPasswordCorrect = await bcrypt.compare(adminPassword, adminUser.password || '');
            if (!isPasswordCorrect) {
                console.log("Updating admin password.");
                await db.changePassword(adminUser.id, adminPassword);
            }
        } else {
            // 3. If user doesn't exist, create it
            console.log(`Creating new admin user: '${adminUsername}'`);
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await db.createUser({
                email: adminUsername,
                username: adminUsername,
                password: hashedPassword,
                role: 'ADMIN',
                displayName: 'Administrator',
            });
        }

        // 4. Verify final state
        const verifiedUser = await db.findUserByEmail(adminUsername);
        if (verifiedUser && verifiedUser.role === 'ADMIN') {
            console.log("Admin user verified successfully.");
        } else {
            console.error("Verification failed. Admin user not found or does not have ADMIN role.");
        }

    } catch (error) {
        console.error("Error in admin creation script:", error);
        process.exit(1);
    } finally {
        await db.prisma.$disconnect();
        console.log("Script finished.");
    }
})();
