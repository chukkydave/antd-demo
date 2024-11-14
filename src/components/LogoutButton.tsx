'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full bg-[#D62027] text-white py-4 text-lg rounded-md hover:bg-[#D62027]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D62027]"
        >
            Logout
        </button>
    );
};

export default LogoutButton; 