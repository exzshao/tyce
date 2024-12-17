import { NextResponse } from 'next/server'

// Connect to backend API (default: localhost:8000)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export async function POST(request: Request) {
  try {
    // Get message and files from request
    const { message, files } = await request.json()

    // Send to backend
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, files }),
    })

    // Handle errors
    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    return NextResponse.json(await response.json())

  } catch (error) {
    return NextResponse.json(
      { error: 'Chat failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 