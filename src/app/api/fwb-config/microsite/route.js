import { NextResponse } from 'next/server';
import { Microsite } from '../../../../models/Microsite.js';
import { getUser } from '../../../../lib/auth.js';

export async function GET(request) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const microsite = await Microsite.get();
    return NextResponse.json({ microsite });
  } catch (error) {
    console.error('Error fetching microsite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { links, socialMedia } = await request.json();

    const micrositeData = {
      links: links || [],
      socialMedia: socialMedia || {},
      createdBy: user.username,
      isPublished: false
    };

    const microsite = await Microsite.create(micrositeData);
    
    return NextResponse.json({
      message: 'Microsite created successfully',
      microsite
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating microsite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, links, socialMedia, isPublished } = await request.json();

    const micrositeData = {
      links: links || [],
      socialMedia: socialMedia || {},
      isPublished: isPublished || false
    };

    const microsite = await Microsite.update(id, micrositeData);
    
    return NextResponse.json({
      message: 'Microsite updated successfully',
      microsite
    });

  } catch (error) {
    console.error('Error updating microsite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}