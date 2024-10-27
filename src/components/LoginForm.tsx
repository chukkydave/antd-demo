'use client';

import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Link from 'next/link';

const LoginForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        console.log('Success:', values);
        // Here you would typically send a request to your authentication API
        setLoading(false);
    };

    return (
        <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label={<span className="text-lg">Email</span>}
                name="email"
                className='!text-xl'
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input placeholder="Enter your email" size="large" className='!p-3' />
            </Form.Item>

            <Form.Item
                label={<span className="text-lg">Password</span>}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    placeholder="Enter your password"
                    size="large"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className='!p-3'
                />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-between items-center text-sm font-normal">
                    <Checkbox className='!accent-red-500'>Remember me for 30 days</Checkbox>
                    <Link href="/forgot-password" className="text-[#D62027] hover:underline hover:text-[#D62027]/80">
                        Forgot password?
                    </Link>
                </div>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full !bg-[#D62027] hover:!bg-[#D62027]/80 !text-white !p-7 !text-lg">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
