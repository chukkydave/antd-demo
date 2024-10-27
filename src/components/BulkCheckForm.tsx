'use client';

import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const BulkCheckForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="bulkCheck"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="imeiList"
                rules={[{ required: true, message: 'Please input IMEI numbers or upload a file!' }]}
            >
                <TextArea rows={4} placeholder="Enter IMEI numbers (one per line)" />
            </Form.Item>

            <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
            >
                <Upload name="file" accept=".txt,.csv">
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Check Bulk
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BulkCheckForm;
