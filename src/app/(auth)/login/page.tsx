import AuthLayout from '@/components/AuthLayout';
import LoginForm from '@/components/LoginForm';
import two from '@/assets/two.jpeg';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <AuthLayout>
            <div className="w-full flex flex-col md:flex-row overflow-hidden">
                {/* Left Column - Hidden on mobile */}
                <div className="hidden md:flex md:w-1/2 pr-12 py-20 flex-col justify-between">
                    <div>
                        <h1 className="text-6xl font-semibold mb-8">Instantly Confirm Your Device's <span className='text-[#D62027]'>Authenticity.</span></h1>
                        <p className="opacity-40 max-w-md text-xl mb-8">Use our IMEI checker to ensure your phone is legitimate and safe from blacklists.</p>
                    </div>
                    <Image
                        src={two}
                        alt="Device Authentication"
                        width={500}
                        height={300}
                        className="rounded-lg"
                    />
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 p-12 bg-white">
                    <h2 className="text-4xl font-medium mb-2">Welcome back</h2>
                    <p className="opacity-40 text-sm font-normal mb-8">Welcome back! Please enter your details.</p>
                    <LoginForm />
                    <p className="text-center mt-6 font-normal text-base">
                        <span className='opacity-40'>Don't have an account? </span><Link href="/register" className="underline hover:underline-offset-4 hover:text-[#D62027]">Register for free</Link>
                    </p>

                    {/* Image displayed on mobile, under the form */}
                    <div className="mt-8 md:hidden">
                        <Image
                            src={two}
                            alt="Device Authentication"
                            width={500}
                            height={300}
                            className="rounded-lg w-full"
                        />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
