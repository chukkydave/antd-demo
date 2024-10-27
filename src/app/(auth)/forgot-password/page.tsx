import dynamic from 'next/dynamic';
import AuthLayout from '@/components/AuthLayout';

const ForgotPasswordForm = dynamic(() => import('@/components/ForgotPasswordForm'), {
    loading: () => <p>Loading...</p>
});

export default function ForgotPasswordPage() {
    return (
        <AuthLayout>
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-5 text-center">Forgot Password</h1>
                <ForgotPasswordForm />
            </div>
        </AuthLayout>
    );
}
