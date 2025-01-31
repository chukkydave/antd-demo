import { useState } from 'react';
import { Button, message } from 'antd';

const AdminWebhookSetup = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegisterWebhook = async () => {
        setIsRegistering(true);
        try {
            const response = await fetch('/api/admin/register-webhook', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to register webhook');
            }

            const data = await response.json();
            if (data.success) {
                message.success('Webhook registered successfully');
            }
        } catch (error) {
            console.error('Webhook registration error:', error);
            message.error('Failed to register webhook');
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Webhook Configuration</h2>
            <div className="space-y-4">
                <p className="text-gray-600">
                    Register the webhook endpoint to receive payment notifications from Juice.
                </p>
                <Button
                    type="primary"
                    onClick={handleRegisterWebhook}
                    loading={isRegistering}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Register Webhook
                </Button>
            </div>
        </div>
    );
};

export default AdminWebhookSetup; 