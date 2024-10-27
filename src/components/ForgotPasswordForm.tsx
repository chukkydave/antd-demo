'use client';

import { Form, Input, Button } from 'antd';

const ForgotPasswordForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="forgotPassword"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ForgotPasswordForm;
