'use client';

import { useState } from 'react';
import { Input, Button, Form, message } from 'antd';

export default function AdminWebhookSetup() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { webhook_url: string }) => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/register-webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: values.webhook_url }),
            });

            if (response.ok) {
                message.success('Webhook URL registered successfully');
            } else {
                message.error('Failed to register webhook URL');
            }
        } catch (_error) {
            message.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Webhook Configuration</h2>
            <p className="text-gray-600 mb-4">
                Configure a webhook URL to receive notifications for payment events.
            </p>

            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="webhook_url"
                    label="Webhook URL"
                    rules={[{ required: true, message: 'Webhook URL is required' }]}
                >
                    <Input placeholder="https://your-server.com/webhook" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-[#D62027] hover:bg-[#B91C22]"
                    >
                        Save Webhook URL
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
} 