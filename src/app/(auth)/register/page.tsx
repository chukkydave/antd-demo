import dynamic from 'next/dynamic';
import AuthLayout from '@/components/AuthLayout';

const RegisterForm = dynamic(() => import('@/components/RegisterForm'), {
    loading: () => <p>Loading...</p>
});

export default function RegisterPage() {
    return (
        <AuthLayout>
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-5 text-center">Register</h1>
                <RegisterForm />
            </div>
        </AuthLayout>
    );
}
