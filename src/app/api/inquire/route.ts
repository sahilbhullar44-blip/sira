import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { firstName, lastName, email, message } = body;

        // Validate all fields
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create new inquiry
        const inquiry = await Inquiry.create({
            firstName,
            lastName,
            email,
            message,
        });

        return NextResponse.json(
            { message: 'Inquiry received successfully', inquiry },
            { status: 201 }
        );
    } catch (error) {
        console.error('Inquiry API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
