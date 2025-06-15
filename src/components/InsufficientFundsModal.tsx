'use client';

import { Modal, Button, Tabs } from 'antd';
import { usePaystackPayment } from 'react-paystack';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { walletService } from '@/services/walletService';
import { useWallet } from '@/contexts/WalletContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import QRCode from 'react-qr-code';
import { message } from 'antd';
import { generatePaymentReference } from '@/utils/paymentUtils';

interface InsufficientFundsModalProps {
    isOpen: boolean;
    onClose: () => void;
    requiredAmount: number;
    currency: 'NGN' | 'USD';
    onSuccess: () => void;
}

interface PaystackResponse {
    reference: string;
    [key: string]: unknown;
}

export default function InsufficientFundsModal({
    isOpen,
    onClose,
    requiredAmount,
    currency,
    onSuccess
}: InsufficientFundsModalProps) {
    const [activeTab, setActiveTab] = useState(currency === 'NGN' ? 'paystack' : 'crypto');
    const { user } = useAuth();
    const { refetchBalance } = useWallet();
    const { rates } = useCurrency();
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [paymentUrl, setPaymentUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [orderId, setOrderId] = useState('');
    const [polling, setPolling] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    // Calculate amounts in both currencies
    const ngnAmount = currency === 'NGN' ? requiredAmount : requiredAmount * rates.NGN;
    const usdAmount = currency === 'USD' ? requiredAmount : requiredAmount / rates.NGN;

    const config = {
        reference: generatePaymentReference('PAYSTACK'),
        email: user?.email || '',
        amount: ngnAmount * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
    };

    const initializePayment = usePaystackPayment(config);

    const handlePaystackSuccess = async (response: PaystackResponse) => {
        setLoading(true);
        try {
            await walletService.fundNGN({
                reference: response.reference,
                amount: ngnAmount
            });
            message.success('Wallet funded successfully');
            await refetchBalance();
            onSuccess();
            onClose();
        } catch (error) {
            console.log(error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fund wallet';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCryptoPayment = async () => {
        setLoading(true);
        try {
            const response = await walletService.fundUSD(usdAmount);
            setWalletAddress(response.result.address);
            setPaymentUrl(response.result.url);
            setQrCode(response.result.address_qr_code);
            setOrderId(response.result.order_id);
            setPolling(true);
            message.success('Please complete the payment using the provided address');
        } catch (error) {
            console.log(error);
            message.error('Failed to generate payment address');
        } finally {
            setLoading(false);
        }
    };

    // Polling for payment status
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (polling && orderId && !paymentConfirmed) {
            interval = setInterval(async () => {
                try {
                    // Replace with your actual payment status endpoint
                    const res = await fetch(`/api/payment-status?order_id=${orderId}`);
                    const data = await res.json();
                    if (data.status === 'paid' || data.status === 'completed') {
                        setPaymentConfirmed(true);
                        setPolling(false);
                        message.success('Payment confirmed!');
                        await refetchBalance();
                        onSuccess();
                        onClose();
                    }
                } catch (err) {
                    // Optionally handle polling errors
                }
            }, 5000); // Poll every 5 seconds
        }
        return () => clearInterval(interval);
    }, [polling, orderId, paymentConfirmed, refetchBalance, onSuccess, onClose]);

    return (
        <Modal
            title={`Insufficient ${currency} Balance`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <div className="py-4">
                <p className="mb-4">
                    Your current balance is insufficient. You need {currency === 'NGN' ? '₦' : '$'}
                    {requiredAmount.toFixed(2)} to complete this transaction.
                </p>

                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'paystack',
                            label: 'Fund NGN Wallet',
                            children: (
                                <div className="py-4">
                                    <Button
                                        type="primary"
                                        onClick={() => initializePayment({
                                            onSuccess: handlePaystackSuccess,
                                            onClose: () => { }
                                        })}
                                        loading={loading}
                                        className="w-full bg-[#D62027] hover:bg-[#B91C22]"
                                    >
                                        Pay ₦{ngnAmount.toFixed(2)}
                                    </Button>
                                </div>
                            ),
                        },
                        {
                            key: 'crypto',
                            label: 'Fund USD Wallet',
                            children: (
                                <div className="py-4">
                                    {walletAddress ? (
                                        <div className="flex flex-col items-center">
                                            {qrCode && (
                                                <img src={qrCode} alt="QR Code" style={{ width: 200, height: 200 }} />
                                            )}
                                            <p className="mt-4 text-center text-sm">
                                                Send ${usdAmount.toFixed(2)} USDT to:
                                                <br />
                                                <code className="block mt-2 p-2 bg-gray-100 rounded">
                                                    {walletAddress}
                                                </code>
                                            </p>
                                            {paymentUrl && (
                                                <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-600 underline">
                                                    Open Payment Page
                                                </a>
                                            )}
                                            {paymentConfirmed && (
                                                <div className="mt-4 text-green-600 font-bold">Payment Confirmed!</div>
                                            )}
                                        </div>
                                    ) : (
                                        <Button
                                            type="primary"
                                            onClick={handleCryptoPayment}
                                            loading={loading}
                                            className="w-full bg-[#D62027] hover:bg-[#B91C22]"
                                        >
                                            Generate Payment Address
                                        </Button>
                                    )}
                                </div>
                            ),
                        }
                    ]}
                />
            </div>
        </Modal>
    );
} 