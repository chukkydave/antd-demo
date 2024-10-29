import AuthLayout from '@/components/AuthLayout';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import two from '@/assets/two.jpeg';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    return (
        <AuthLayout>
            <div className="w-full flex flex-col md:flex-row overflow-hidden">
                {/* Left Column - Hidden on mobile */}
                <div className="hidden md:flex md:w-1/2 pr-6 lg:pr-12 py-10 lg:py-20 flex-col justify-between">
                    <div>
                        <h1 className="text-4xl lg:text-6xl font-semibold mb-8">Forgot Your <span className='text-[#D62027]'>Password?</span></h1>
                        <p className="opacity-40 max-w-md text-base lg:text-xl mb-8">Don't worry, we'll help you reset it and get back to checking your device's authenticity.</p>
                    </div>
                    <Image
                        src={two}
                        alt="Forgot Password"
                        width={500}
                        height={300}
                        className="rounded-lg"
                    />
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 p-8 lg:p-12 bg-white">
                    <h2 className="text-2xl lg:text-4xl font-medium mb-2">Reset your password</h2>
                    <p className="opacity-40 text-xs lg:text-sm font-normal mb-8">Enter your email address and we'll send you instructions to reset your password.</p>
                    <ForgotPasswordForm />
                    <p className="text-center mt-6 font-normal text-sm lg:text-base">
                        <span className='opacity-40'>Remember your password? </span><Link href="/login" className="underline hover:underline-offset-4 hover:text-[#D62027]">Login here</Link>
                    </p>

                    {/* Image displayed on mobile, under the form */}
                    <div className="mt-8 md:hidden">
                        <Image
                            src={two}
                            alt="Forgot Password"
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
