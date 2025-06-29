import mongoose from 'mongoose';
import connectToDatabase from '../lib/mongodb.js';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export class EventClass {
    static async getAll() {
        await connectToDatabase();
        return await Event.find({}).sort({ startTime: 1 });
    }

    static async getById(id) {
        await connectToDatabase();
        return await Event.findById(id);
    }

    static async create(eventData) {
        await connectToDatabase();
        const event = new Event(eventData);
        return await event.save();
    }

    static async update(id, eventData) {
        await connectToDatabase();
        return await Event.findByIdAndUpdate(id, eventData, { new: true });
    }

    static async delete(id) {
        await connectToDatabase();
        return await Event.findByIdAndDelete(id);
    }

    static getEventStatus(startTime, endTime) {
        const now = new Date();
        const jakartaOffset = 7 * 60 * 60 * 1000; const jakartaNow = new Date(now.getTime() + jakartaOffset);

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (jakartaNow < start) {
            return 'planned';
        } else if (jakartaNow >= start && jakartaNow <= end) {
            return 'ongoing';
        } else {
            return 'ended';
        }
    }
}

export { EventClass as Event };