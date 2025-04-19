'use client';

import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

interface ContactFormProps {
    onSubmit?: () => void;
}

interface FormValues {
    email: string;
    message: string;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: FormValues) => {
        setLoading(true);
        try {
            // Here you would send the contact form data to your API
            console.log('Contact form data:', values);
            message.success('Message sent successfully!');
            form.resetFields();
            onSubmit?.();
        } catch (error) {
            console.log(error);
            message.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="w-[400px]"
        >
            <Form.Item
                name="email"
                className='!mb-2 !mt-1'
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input
                    placeholder="Your email"
                    className="rounded-md"
                />
            </Form.Item>

            <Form.Item
                name="message"
                className='!mb-2'
                rules={[{ required: true, message: 'Please input your message!' }]}
            >
                <TextArea
                    rows={4}
                    placeholder="Your message"
                    className="rounded-md"
                />
            </Form.Item>

            <Form.Item className="!mb-0 flex justify-end">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-auto bg-[#D62027] hover:bg-[#D62027]/80"
                >
                    Send
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ContactForm;
