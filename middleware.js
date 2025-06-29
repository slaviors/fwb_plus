import { NextResponse } from 'next/server';
import { isAuthenticated } from './src/lib/auth.js';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/fwb-config')) {
        if (!isAuthenticated(request)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/fwb-config/:path*']
};