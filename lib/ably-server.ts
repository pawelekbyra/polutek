// lib/ably-server.ts
import * as Ably from 'ably';

const ablyApiKey = process.env.ABLY_API_KEY;

if (!ablyApiKey) {
    throw new Error('ABLY_API_KEY is not defined in environment variables');
}

const serverClient = new Ably.Rest(ablyApiKey);

export default serverClient;
