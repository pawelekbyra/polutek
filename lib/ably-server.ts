import Ably from 'ably';

if (!process.env.ABLY_API_KEY) {
  console.warn('ABLY_API_KEY environment variable not set. Real-time features will be disabled.');
}

export const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY || 'missing_key' });
