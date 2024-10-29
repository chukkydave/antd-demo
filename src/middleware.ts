import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const isAuth = req.nextauth.token;
        const isAuthPage = req.nextUrl.pathname.startsWith('/login') ||
            req.nextUrl.pathname.startsWith('/register') ||
            req.nextUrl.pathname.startsWith('/forgot-password');

        if (isAuthPage && isAuth) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const isProtectedPage = req.nextUrl.pathname.startsWith('/bulk') ||
                    req.nextUrl.pathname.startsWith('/history');

                if (isProtectedPage) {
                    return !!token;
                }
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        '/bulk',
        '/history',
        '/login',
        '/register',
        '/forgot-password'
    ]
}; 