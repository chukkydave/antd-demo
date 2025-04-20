'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Logo from '@/assets/Ogabassey-103.png';
import { adminService } from '@/services/adminService';
import Cookies from 'js-cookie';

interface AdminLoginForm {
    email: string;
    password: string;
}

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: AdminLoginForm) => {
        setLoading(true);
        try {
            const response = await adminService.login(values);

            // Store the admin token
            Cookies.set('admin_token', response.token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: 1 // 1 day
            });

            // Store admin user data
            Cookies.set('admin_user', JSON.stringify(response.user), {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: 1
            });

            message.success('Login successful');
            router.push('/admin/dashboard');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Image
                    src={Logo}
                    alt="Logo"
                    width={150}
                    height={50}
                    priority
                />
            </div>

            <Card className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to access the admin dashboard
                    </p>
                </div>

                <Form
                    name="admin_login"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full bg-[#D62027] hover:bg-[#B91C22]"
                            size="large"
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
} 