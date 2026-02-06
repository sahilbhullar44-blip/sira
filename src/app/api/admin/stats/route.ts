import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Event from '@/models/Event';
import Inquiry from '@/models/Inquiry';
import Analytics from '@/models/Analytics';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
    try {
        // 1. Verify Authentication
        const session = await getSession();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = (session as any)?.user;

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [userCount, eventCount, inquiryCount, visitCount, ticketLeads] = await Promise.all([
            User.countDocuments({ role: 'user' }),
            Event.countDocuments(),
            Inquiry.countDocuments(),
            Analytics.countDocuments({ type: 'page_view' }),
            Analytics.countDocuments({ action: 'ticket_waitlist', type: 'form_submit' }),
        ]);

        const recentInteractions = await Analytics.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalInteractions = await Analytics.countDocuments();

        // Get events with their ticket sales count
        const events = await Event.find().sort({ date: 1 });
        const eventsWithStats = await Promise.all(events.map(async (event) => {
            const soldCount = await Analytics.countDocuments({
                action: 'ticket_waitlist',
                type: 'form_submit',
                'metadata.event': event.title
            });
            return {
                ...event.toObject(),
                ticketsSold: soldCount,
                capacity: event.capacity || 2000
            };
        }));

        // 3. Construct Response
        return NextResponse.json({
            users: userCount,
            events: eventCount, // Keep total count
            eventsData: eventsWithStats, // Send detailed data for charts
            inquiries: inquiryCount,
            ticketsSold: ticketLeads,
            totalVisits: visitCount,
            recentInteractions,
            pagination: {
                total: totalInteractions,
                page,
                limit,
                totalPages: Math.ceil(totalInteractions / limit)
            }
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Stats API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
