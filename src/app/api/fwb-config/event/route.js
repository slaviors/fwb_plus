import { NextResponse } from 'next/server';
import { Event } from '../../../../models/Event.js';
import { getUser } from '../../../../lib/auth.js';

export async function GET(request) {
    try {
        const user = getUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const events = await Event.getAll();

        const eventsWithStatus = events.map(event => ({
            ...event.toObject(),
            status: Event.getEventStatus(event.startTime, event.endTime)
        }));

        return NextResponse.json({ events: eventsWithStatus });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request) {
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
            endTime: end,
            createdBy: user.username
        };

        const newEvent = await Event.create(eventData);

        return NextResponse.json({
            message: 'Event created successfully',
            event: {
                ...newEvent.toObject(),
                status: Event.getEventStatus(newEvent.startTime, newEvent.endTime)
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}