import { NextResponse } from 'next/server';
import { Event } from '../../../../models/Event.js';

export async function GET() {
    try {
        const events = await Event.getAll();

        const eventsWithStatus = events.map(event => ({
            ...event.toObject(),
            status: Event.getEventStatus(event.startTime, event.endTime)
        }));

        return NextResponse.json({ events: eventsWithStatus });
    } catch (error) {
        console.error('Error fetching public events:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}