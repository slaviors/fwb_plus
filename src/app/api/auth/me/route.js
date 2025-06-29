import { NextResponse } from 'next/server';
import { getUser } from '../../../../lib/auth.js';

export async function GET(request) {
  try {
    const user = getUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}