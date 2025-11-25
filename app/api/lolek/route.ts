import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-2.5-pro'),
    messages,
  });

  // Corrected to use toTextStreamResponse as per the updated API
  return result.toTextStreamResponse();
}
