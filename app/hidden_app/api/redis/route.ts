
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis client, or a mock for build-time
const createRedisClient = () => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    try {
      return Redis.fromEnv();
    } catch (error) {
      console.error('Failed to initialize Redis from environment variables.');
      // Fallback to a mock client if initialization fails
      return {
        get: async () => Promise.resolve(null),
        // Add other methods as needed, returning dummy data
      };
    }
  }
  // Provide a mock client for build and other environments
  return {
    get: async () => Promise.resolve(null),
  };
};

const redis = createRedisClient();

export const POST = async () => {
  // Fetch data from Redis
  const result = await redis.get("item");

  // Return the result in the response
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};
