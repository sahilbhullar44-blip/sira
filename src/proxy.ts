import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/session';

export async function proxy(request: NextRequest) {
    // 1. Admin Route Protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // allow login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const session = request.cookies.get('session')?.value;
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // refresh session if valid
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
