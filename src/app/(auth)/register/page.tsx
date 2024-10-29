import AuthLayout from '@/components/AuthLayout';
import RegisterForm from '@/components/RegisterForm';
import one from '@/assets/one.jpeg';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <AuthLayout>
            <div className="w-full flex flex-col md:flex-row overflow-hidden">
                {/* Left Column - Hidden on mobile */}
                <div className="hidden md:flex md:w-1/2 pr-6 lg:pr-12 py-10 lg:py-20 flex-col justify-between">
                    <div>
                        <h1 className="text-4xl lg:text-6xl font-semibold max-w-lg mb-8">Ensure Your Phone is <span className='text-[#D62027]'>Genuine </span>in a Few Clicks </h1>
                        <p className="opacity-40 max-w-md text-base lg:text-xl mb-8">Use our IMEI checker to ensure your phone is legitimate and safe from blacklists.</p>
                    </div>
                    <Image
                        src={one}
                        alt="Device Registration"
                        width={500}
                        height={300}
                        className="rounded-lg"
                    />
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 p-8 lg:p-12 bg-white">
                    <h2 className="text-2xl lg:text-4xl font-medium mb-2">Create an account</h2>
                    <p className="opacity-40 text-xs lg:text-sm font-normal mb-8">Please enter your details to register.</p>
                    <RegisterForm />
                    <p className="text-center mt-6 font-normal text-sm lg:text-base">
                        <span className='opacity-40'>Already have an account? </span><Link href="/login" className="underline hover:underline-offset-4 hover:text-[#D62027]">Login here</Link>
                    </p>

                    {/* Image displayed on mobile, under the form */}
                    <div className="mt-8 md:hidden">
                        <Image
                            src={one}
                            alt="Device Registration"
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
