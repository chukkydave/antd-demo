import AuthLayout from '@/components/AuthLayout';
import LoginForm from '@/components/LoginForm';
// import two from '@/assets/two.jpeg';
import two from '@/assets/community.png';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <AuthLayout>
            <div className="w-full flex flex-col md:flex-row overflow-hidden">
                {/* Left Column - Hidden on mobile */}
                <div className="hidden md:flex md:w-1/2 pr-6 lg:pr-12 py-10 lg:py-20 flex-col justify-between">
                    <div>
                        <h1 className="text-4xl lg:text-6xl font-semibold text-black mb-8">Instantly Confirm Your Device's <span className='text-[#D62027]'>Authenticity.</span></h1>
                        <p className="text-gray-500 max-w-md text-base lg:text-xl mb-8">Use our IMEI checker to ensure your phone is legitimate and safe from blacklists.</p>
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
                <div className="w-full md:w-1/2 p-8 lg:p-12 bg-white">
                    <h2 className="text-2xl lg:text-4xl font-medium text-black mb-2">Welcome back</h2>
                    <p className="opacity-40 text-xs lg:text-sm font-normal mb-8 text-black">Welcome back! Please enter your details.</p>
                    <LoginForm />
                    <p className="text-center mt-6 font-normal text-sm lg:text-base">
                        <span className='text-black opacity-40'>Don't have an account? </span><Link href="/register" className="underline hover:underline-offset-4 hover:text-[#D62027] text-gray-700">Register for free</Link>
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
