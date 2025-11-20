import Ably from 'ably';

if (!process.env.ABLY_API_KEY) {
  console.warn('ABLY_API_KEY environment variable not set. Realtime features will not work.');
}

// Use a dummy key for build time if not set, or handle gracefully.
// The error is thrown at module level which breaks build if Env is missing.
// We use a placeholder if missing to allow build to pass, but it will fail at runtime if used.
const apiKey = process.env.ABLY_API_KEY || 'placeholder:key';

export const ably = new Ably.Rest({ key: apiKey });
