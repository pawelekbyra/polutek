// lib/ably-client.ts
import * as Ably from 'ably';

const ablyApiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;

if (!ablyApiKey) {
    throw new Error('NEXT_PUBLIC_ABLY_API_KEY is not defined in environment variables');
}

const client = new Ably.Realtime(ablyApiKey);

export default client;
