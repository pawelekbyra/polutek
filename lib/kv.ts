
import { Redis } from '@upstash/redis';

// Initialize Redis client, or a mock for build-time
const createRedisClient = () => {
  // Check for production-like environment and existence of environment variables
  if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return Redis.fromEnv();
    } catch (error) {
      console.error('Failed to initialize Redis from environment variables, falling back to mock.');
      // Fallback to a mock client if initialization fails even with env vars
      return {
        pipeline: () => ({
          incr: () => {},
          expire: () => {},
          exec: async () => [0, 0],
        }),
        // Add other methods as needed, returning dummy data
      } as unknown as Redis;
    }
  }

  // Provide a mock client for build and other environments where env vars are not set
  return {
    pipeline: () => ({
      incr: () => {},
      expire: () => {},
      exec: async () => [0, 0],
    }),
  } as unknown as Redis;
};

export const redis = createRedisClient();
