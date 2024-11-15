'use client';

import { useState } from 'react';
import { Modal, Tabs, Button } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import QRCode from 'react-qr-code';
import { usePaystackPayment } from 'react-paystack';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    service: string;
    onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, service, onSuccess }: PaymentModalProps) => {
    const [activeTab, setActiveTab] = useState('1');
    const [copied, setCopied] = useState(false);
    const walletAddress = "YOUR_CRYPTO_WALLET_ADDRESS";

    // Paystack configuration
    const config = {
        reference: new Date().getTime().toString(),
        email: "user@example.com", // This should come from user context
        amount: amount * 100, // Convert to kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    };

    const initializePayment = usePaystackPayment(config);

    const handlePaystackSuccess = () => {
        onSuccess();
        onClose();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            title="Choose Payment Method"
            width={500}
        >
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                    {
                        key: '1',
                        label: 'Card Payment',
                        children: (
                            <div className="py-4">
                                <p className="mb-4">Pay ${amount} via Paystack</p>
                                <Button
                                    type="primary"
                                    className="w-full bg-[#0BA4DB] hover:bg-[#0993C5] border-none h-12 text-lg font-medium"
                                    onClick={() => initializePayment({
                                        onSuccess: handlePaystackSuccess,
                                        onClose: onClose
                                    })}
                                >
                                    Pay with Paystack
                                </Button>
                            </div>
                        ),
                    },
                    {
                        key: '2',
                        label: 'Crypto Payment',
                        children: (
                            <div className="py-4 flex flex-col items-center">
                                <QRCode value={walletAddress} size={200} />
                                <div className="mt-4 w-full">
                                    <div className="flex items-center gap-2 p-2 border rounded">
                                        <input
                                            type="text"
                                            value={walletAddress}
                                            readOnly
                                            className="flex-1 outline-none"
                                        />
                                        <Button
                                            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                            onClick={copyToClipboard}
                                            className={copied ? 'text-green-500' : ''}
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        - After transfer contact us by clicking on the whatsapp icon to confirm payment.
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </Modal>
    );
};

export default PaymentModal; 