import { pingDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // force dynamic execution

export async function GET() {
  try {
    // Perform a simple query to check the database connection
    await pingDb();
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed.' },
      { status: 500 }
    );
  }
}
