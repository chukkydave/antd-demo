import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const adminToken = request.cookies.get('admin_token')?.value;

    // Define auth pages
    const isAuthPage = request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/register' ||
        request.nextUrl.pathname === '/forgot-password';

    // Define protected pages
    const isProtectedPage = request.nextUrl.pathname.startsWith('/bulk') ||
        request.nextUrl.pathname.startsWith('/dashboard');

    // If user has token and tries to access auth pages, redirect to home
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user tries to access protected pages without token, redirect to login
    if (isProtectedPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if it's an admin route (excluding login)
    if (request.nextUrl.pathname.startsWith('/admin') &&
        request.nextUrl.pathname !== '/admin/login') {
        // If no admin token, redirect to admin login
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/bulk',
        '/dashboard',
        '/login',
        '/register',
        '/forgot-password',
        '/admin/:path*'
    ]
}; 