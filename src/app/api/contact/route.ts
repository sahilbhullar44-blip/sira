import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { emailOrPhone } = body;

        if (!emailOrPhone) {
            return NextResponse.json(
                { error: 'Email or phone number is required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        let user = await User.findOne({ emailOrPhone });

        if (user) {
            return NextResponse.json(
                { message: 'User info already recorded', user },
                { status: 200 }
            );
        }

        // Create new user
        user = await User.create({
            emailOrPhone,
        });

        return NextResponse.json(
            { message: 'Contact info saved successfully', user },
            { status: 201 }
        );
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
