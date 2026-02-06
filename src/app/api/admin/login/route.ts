import { NextRequest, NextResponse } from 'next/server';
import { encrypt, login } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Login function will throw if credentials are invalid
        const user = await login(body);

        // 1. Create session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await encrypt({
            user: {
                _id: user._id,
                email: user.emailOrPhone,
                role: user.role,
                name: user.name
            }, expires
        });

        // 2. Set cookie
        const response = NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );

        response.cookies.set('session', session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return response;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json(
            { message },
            { status: 401 } // Return 401 for login failures usually, or 500 for actual errors
        );
    }
}
