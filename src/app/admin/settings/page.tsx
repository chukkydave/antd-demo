import AdminWebhookSetup from '@/components/AdminWebhookSetup';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function AdminSettingsPage() {
    const session = await getServerSession();

    // Protect the admin route
    if (!session?.user) {
        redirect('/auth/signin');
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

            {/* Other admin settings components */}

            <div className="bg-white rounded-lg shadow">
                <AdminWebhookSetup />
            </div>
        </div>
    );
} 