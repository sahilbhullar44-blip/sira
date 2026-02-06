import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Analytics from '@/models/Analytics';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, action, metadata, userId } = body;

        if (!type || !action) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        await Analytics.create({
            type,
            action,
            metadata,
            userId,
        });

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error) {
        // Fail silently or log error, don't break frontend
        console.error('Analytics Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
