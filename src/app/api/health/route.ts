import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker and other monitoring systems
 */
export async function GET() {
  try {
    // You can add database connection checks here if needed
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Service unhealthy',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}