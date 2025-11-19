
import { PrismaClient, SlideType, AccessLevel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const BUNNY_URLS = [
  "https://vz-2b8514ee-f98.b-cdn.net/dc55db61-3b48-4524-9d77-a375f6ef196c/playlist.m3u8",
  "https://vz-2b8514ee-f98.b-cdn.net/57a5f174-8102-47e4-93d7-90648523ec9a/playlist.m3u8",
  "https://vz-2b8514ee-f98.b-cdn.net/ee0c65db-834f-4dfe-8b17-cfe0435cefe9/playlist.m3u8",
];

const SLIDES_TO_CREATE = [
    // Publiczne Wideo (Do testowania feeda)
    {
        title: "Wideo Publiczne: Niesamowity Krajobraz",
        description: "Darmowa treść dla każdego. Testujemy jakość HLS.",
        hlsUrl: BUNNY_URLS[0],
        access: AccessLevel.Public,
        type: SlideType.Video,
        feedOrder: 10,
    },
    // Wideo Ograniczone (Do testowania logiki SecretOverlay)
    {
        title: "SECRET: Wideo Tylko Dla Patrona",
        description: "Ta treść odblokuje się tylko po spełnieniu warunków PWA/Patrona.",
        hlsUrl: BUNNY_URLS[1],
        access: AccessLevel.Secret,
        type: SlideType.Video,
        feedOrder: 20,
    },
    // Publiczny HTML (Do testowania HTML/Sanitizacji)
    {
        title: "HTML: Komponent Wprowadzający",
        description: "Testuje wyświetlanie HTML i sanitizację danych. Wersja Publiczna.",
        htmlContent: '<h1>Ting Tong: Test HTML</h1><p>Wersja 2.0 jest stabilna! </p>',
        access: AccessLevel.Public,
        type: SlideType.Html,
        feedOrder: 30,
    },
    // Wideo Ograniczone (Kolejny secret)
    {
        title: "Wideo Ograniczone: Ekskluzywny Materiał",
        description: "Wymaga autoryzacji tokenem.",
        hlsUrl: BUNNY_URLS[2],
        access: AccessLevel.Secret,
        type: SlideType.Video,
        feedOrder: 40,
    }
];

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Delete old slides
  console.log('🧹 Cleaning old slides...');
  await prisma.slide.deleteMany({});

  // 2. Ensure Author user exists
  console.log('👤 Checking/Creating Author user...');
  const authorEmail = 'author@tt.com';
  const authorUsername = 'author';

  let author = await prisma.user.findUnique({
    where: { email: authorEmail },
  });

  if (!author) {
    const hashedPassword = await bcrypt.hash('author123', 10);
    author = await prisma.user.create({
      data: {
        email: authorEmail,
        username: authorUsername,
        password: hashedPassword,
        role: 'Author',
        displayName: 'Author A',
        avatar: null,
      },
    });
    console.log('✅ Created new Author user');
  } else {
    // Ensure role is Author
    if (author.role !== 'Author') {
        author = await prisma.user.update({
            where: { id: author.id },
            data: { role: 'Author' }
        });
        console.log('✅ Updated existing user to Author role');
    } else {
        console.log('✅ Author user exists');
    }
  }

  // 3. Create Slides
  console.log('📹 Creating slides...');

  for (const slideData of SLIDES_TO_CREATE) {
    let content = {};

    if (slideData.type === SlideType.Video) {
      content = {
        mp4Url: '', // Assuming empty for now based on previous logic or just omit
        hlsUrl: (slideData as any).hlsUrl,
        poster: '',
        title: slideData.title,
        description: slideData.description,
      };
    } else if (slideData.type === SlideType.Html) {
      content = {
        htmlContent: (slideData as any).htmlContent,
      };
    }

    await prisma.slide.create({
      data: {
        authorId: author.id,
        type: slideData.type,
        access: slideData.access,
        title: slideData.title,
        description: slideData.description,
        content: content, // Prisma handles JSON
        feedOrder: slideData.feedOrder,
      },
    });
  }

  console.log(`✅ Created ${SLIDES_TO_CREATE.length} slides.`);
  console.log('🚀 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
