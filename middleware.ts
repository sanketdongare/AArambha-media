import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies
    const token = request.cookies.get('auth-token');

    // Public routes - no authentication needed
    const publicRoutes = ['/login', '/signup', '/'];
    if (publicRoutes.includes(pathname)) {
        // If user is logged in and trying to access login, redirect to appropriate dashboard
        if (token) {
            const payload = await verifyToken(token.value);
            if (payload) {
                const redirectUrl = payload.role === 'admin' ? '/admin' : '/dashboard';
                return NextResponse.redirect(new URL(redirectUrl, request.url));
            }
        }
        return NextResponse.next();
    }

    // Protected routes - authentication required
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const payload = await verifyToken(token.value);

        if (!payload) {
            // Invalid token - clear it and redirect to login
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('auth-token');
            return response;
        }

        // Admin-only routes
        if (pathname.startsWith('/admin')) {
            if (payload.role !== 'admin') {
                // Non-admin trying to access admin routes
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/dashboard/:path*',
        '/admin/:path*',
    ],
};
