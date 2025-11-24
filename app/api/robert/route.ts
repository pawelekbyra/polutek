import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      // ... obsługa błędu klucza ...
    }
    
    // ... wczytywanie persony ...

    const result = streamText({
      // ✅ Zmiana na najnowszy model Gemini 3
      model: google('gemini-3-pro-preview'), 
      system,
      messages: convertToModelMessages(messages),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    // ... obsługa błędu ...
  }
}
