'use client';

import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Navigation = () => {
    const { data: session, status } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
        router.refresh();
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#D62027]"
            >
                <FaUser className="w-5 h-5" />
                <span>{session ? (session.user?.username || session.user?.email) : 'Account'}</span>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {session ? (
                        // Logged in state
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button >
                    ) : (
                        // Logged out state
                        <>
                            <Link
                                href="/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div >
            )}
        </div >
    );
};

export default Navigation;