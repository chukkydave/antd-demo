'use client';

import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {

        setLoading(true);
        try {
            // API call here
            toast.success('Password reset instructions sent to your email');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to send reset instructions');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="forgotPassword"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label={<span className="text-lg">Email</span>}
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input placeholder="Enter your email" size="large" className='!p-3' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full !bg-[#D62027] hover:!bg-[#D62027]/80 !text-white !p-7 !text-lg">
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ForgotPasswordForm;
