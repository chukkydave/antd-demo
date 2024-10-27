'use client';

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const ContactForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="contact"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input placeholder="Your Email" />
            </Form.Item>

            <Form.Item
                name="message"
                rules={[{ required: true, message: 'Please input your message!' }]}
            >
                <TextArea rows={4} placeholder="Your Message" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send Message
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ContactForm;
