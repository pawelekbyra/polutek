
import { config } from 'dotenv';
import * as bcrypt from '@node-rs/bcrypt';
import { createUser, createSlide, findUserByEmail, updateUser } from '../lib/db-postgres';
import { User } from '../lib/db.interfaces';

config({ path: '.env.local' });

async function seed() {
  // 0. Safety Check
  if (process.env.NODE_ENV !== 'development') {
    console.error('❌ Error: This script can only be run in development environment (NODE_ENV=development).');
    process.exit(1);
  }

  console.log('Starting database seed (UPSERT mode)...');

  try {
    // 1. Upsert Users
    console.log('Upserting test users...');
    const saltRounds = 10;

    const usersToSeed = [
      {
        username: 'Admin',
        email: 'admin@admin.pl',
        passwordPlain: 'admin',
        displayName: 'Administrator TT',
        role: 'admin' as const,
      },
      {
        username: 'Author', // Keeping username as originally in script, but email matching table in prompt
        email: 'autor@autor.pl',
        passwordPlain: 'autor',
        displayName: 'Author A',
        role: 'author' as const,
      },
      {
        username: 'Patron',
        email: 'patron@patron.pl',
        passwordPlain: 'patron',
        displayName: 'Patron P',
        role: 'patron' as const,
      }
    ];

    const createdUsers: Record<string, User> = {};

    for (const u of usersToSeed) {
        const hashedPassword = await bcrypt.hash(u.passwordPlain, saltRounds);
        const existingUser = await findUserByEmail(u.email);

        if (existingUser) {
            console.log(`🔄 Updating existing user: ${u.email}`);
            const updated = await updateUser(existingUser.id, {
                password: hashedPassword,
                role: u.role,
                displayName: u.displayName,
                username: u.username
            });
            if (updated) createdUsers[u.role] = updated;
        } else {
             console.log(`✨ Creating new user: ${u.email}`);
             const created = await createUser({
                username: u.username,
                email: u.email,
                password: hashedPassword,
                displayName: u.displayName,
                role: u.role,
                avatar: undefined // explicit undefined to trigger NULL handling
             });
             createdUsers[u.role] = created;
        }
    }

    // 2. Upsert Slides (Only if Author exists)
    const authorUser = createdUsers['author'];
    if (authorUser) {
        console.log('Creating/Appending test slides for Author...');
        // Note: Since we don't have a reliable "findSlide" or unique key for slides other than ID (which is random),
        // we will just create new slides. This might duplicate slides if run multiple times,
        // but the prompt focus was on SECURE USER SEEDING.
        // To be safe and not flood DB, we might want to skip slide creation if we are in "update" mode,
        // OR just accept that running seed adds more slides.
        // Given the instruction "Bezpieczne odtworzenie kont testowych", I will proceed with creating slides
        // as it ensures the test environment has content.

        const testVideoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

        // Slide 1: Public Video
        await createSlide({
            userId: authorUser.id,
            username: authorUser.username,
            avatar: authorUser.avatar || '',
            x: 0,
            y: 0,
            type: 'video',
            access: 'public',
            data: {
                title: 'Public Slide 1',
                hlsUrl: testVideoUrl,
                mp4Url: '',
                poster: '',
                description: 'A public test slide.'
            }
        });

        // Slide 2: Secret Video
        await createSlide({
            userId: authorUser.id,
            username: authorUser.username,
            avatar: authorUser.avatar || '',
            x: 0,
            y: 1,
            type: 'video',
            access: 'secret',
            data: {
                title: 'Secret Slide 2',
                hlsUrl: testVideoUrl,
                mp4Url: '',
                poster: '',
                description: 'A secret test slide.'
            }
        });

        // Slide 3: Public HTML
        await createSlide({
            userId: authorUser.id,
            username: authorUser.username,
            avatar: authorUser.avatar || '',
            x: 0,
            y: 2,
            type: 'html',
            access: 'public',
            data: {
                title: 'Public HTML Slide',
                htmlContent: '<div style="padding: 20px; text-align: center;"><h1>Hello World</h1><p>This is a public HTML slide.</p></div>'
            }
        });

        console.log('Slides created.');
    }

    console.log('Database seed completed successfully.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
