import { NextResponse } from 'next/server';
import { Microsite } from '../../../../models/Microsite.js';

export async function GET() {
    try {
        const microsite = await Microsite.getPublished();

        if (!microsite) {
            return NextResponse.json({
                microsite: {
                    links: [],
                    socialMedia: {}
                }
            });
        }

        return NextResponse.json({
            microsite: {
                links: microsite.links,
                socialMedia: microsite.socialMedia
            }
        });
    } catch (error) {
        console.error('Error fetching public microsite:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}