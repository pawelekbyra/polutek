import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const personaPath = path.join(process.cwd(), 'robert-persona.md');
    // Sprawdzamy czy plik persony istnieje, żeby uniknąć błędu odczytu
    if (!fs.existsSync(personaPath)) {
       console.error('Persona file not found at:', personaPath);
       // Opcjonalnie: można tu obsłużyć błąd lub użyć domyślnego promptu
    }
    const system = fs.readFileSync(personaPath, 'utf-8');

    const result = streamText({
      model: google('gemini-1.5-flash-002'), // Używamy konkretnej wersji 002
      system,
      messages: convertToModelMessages(messages),
    });

    // W wersji AI SDK 3.1+ / 4.x / 5.x używamy toDataStreamResponse()
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in /api/robert:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
