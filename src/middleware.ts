import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Define auth pages (using exact path matching)
    const isAuthPage = request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/register' ||
        request.nextUrl.pathname === '/forgot-password';

    // Define protected pages
    const isProtectedPage = request.nextUrl.pathname.startsWith('/bulk') ||
        request.nextUrl.pathname.startsWith('/history');

    // If user has token and tries to access auth pages, redirect to home
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user tries to access protected pages without token, redirect to login
    if (isProtectedPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/bulk',
        '/history',
        '/login',
        '/register',
        '/forgot-password'
    ]
}; 