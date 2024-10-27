import Image from "next/image";
import Logo from "@/assets/Ogabassey-103.png";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col px-6 py-4 sm:px-10 sm:py-6 md:px-16 md:py-8 lg:px-20 lg:py-10">
            <div className="mb-8">
                <Link href="/"> <Image src={Logo} alt="Logo" className="h-10 w-auto" /></Link>
            </div>
            <main className="flex-grow flex items-center justify-center">
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;
