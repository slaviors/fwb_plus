import { NextResponse } from 'next/server';
import { Event } from '../../../../../../models/Event.js';
import { getUser } from '../../../../../../lib/auth.js';

export async function DELETE(request, { params }) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deletedEvent = await Event.delete(params.id);
    
    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}