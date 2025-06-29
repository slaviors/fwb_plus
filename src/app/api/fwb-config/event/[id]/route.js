import { NextResponse } from 'next/server';
import { Event } from '../../../../../models/Event.js';
import { getUser } from '../../../../../lib/auth.js';

export async function GET(request, { params }) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const event = await Event.getById(params.id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      event: {
        ...event.toObject(),
        status: Event.getEventStatus(event.startTime, event.endTime)
      }
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}