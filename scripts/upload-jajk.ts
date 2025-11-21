
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function upload() {
  let fileBuffer: Buffer;
  try {
    const filePath = path.join(process.cwd(), 'jajk.png');
    if (!fs.existsSync(filePath)) {
      console.error('jajk.png not found');
      return;
    }
    fileBuffer = fs.readFileSync(filePath);

    console.log('Uploading jajk.png...');
    const blob = await put('jajk.png', fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    console.log('Upload successful!');
    console.log('URL:', blob.url);
  } catch (error: any) {
    if (error.message && error.message.includes('already exists')) {
        console.log('Blob already exists. Retrying with overwrite...');
        try {
             // Re-read buffer if needed, but since it was read before the try block (or inside but before error),
             // we should make sure it is available.
             // Actually, simpler: just read it again or structure code to not rely on scoped var in catch.
             const filePath = path.join(process.cwd(), 'jajk.png');
             const fb = fs.readFileSync(filePath);

             const blobRetry = await put('jajk.png', fb, {
                access: 'public',
                addRandomSuffix: false,
                token: process.env.BLOB_READ_WRITE_TOKEN,
                // @ts-ignore
                allowOverwrite: true
            });
            console.log('Upload successful!');
            console.log('URL:', blobRetry.url);
        } catch (retryError) {
            console.error("Retry failed:", retryError);
        }
    } else {
        console.error('Error uploading:', error);
    }
  }
}

// We don't need two functions running, let's just keep one clean version.
upload();
