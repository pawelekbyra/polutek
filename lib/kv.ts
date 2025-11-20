import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (!url || !token) {
    console.warn("Missing Redis environment variables (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN). Rate limiting and other Redis features will fail at runtime.");
}

// Use dummy values if missing to prevent build failure.
// The Redis client will likely fail if used with these values, but it allows the build to complete.
const validUrl = url || 'https://example.com';
const validToken = token || 'example_token';

export const redis = new Redis({
  url: validUrl,
  token: validToken,
});
