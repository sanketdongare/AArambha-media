import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static assets, API routes, and internal Next.js files
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // Get token from cookies
    const token = request.cookies.get('auth-token');

    // Home page is public but has special logic
    if (pathname === '/') {
        if (token) {
            const payload = await verifyToken(token.value);
            if (payload) {
                const redirectUrl = payload.role === 'admin' ? '/admin' : '/dashboard';
                return NextResponse.redirect(new URL(redirectUrl, request.url));
            }
        }
        return NextResponse.next();
    }

    // Auth routes - redirect if already logged in
    const authRoutes = ['/login', '/signup'];
    if (authRoutes.includes(pathname)) {
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
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('auth-token');
            return response;
        }

        if (pathname.startsWith('/admin') && payload.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
