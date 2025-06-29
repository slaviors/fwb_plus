import { NextResponse } from 'next/server';
import { Event } from '../../../../../../models/Event.js';
import { getUser } from '../../../../../../lib/auth.js';

export async function PUT(request, { params }) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, location, startTime, endTime } = await request.json();

    if (!title || !description || !location || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      );
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return NextResponse.json(
        { error: 'End time must be after start time' }, 
        { status: 400 }
      );
    }

    const eventData = {
      title,
      description,
      location,
      startTime: start,
      endTime: end
    };

    const updatedEvent = await Event.update(params.id, eventData);
    
    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Event updated successfully',
      event: {
        ...updatedEvent.toObject(),
        status: Event.getEventStatus(updatedEvent.startTime, updatedEvent.endTime)
      }
    });

  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}