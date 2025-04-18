'use client';

import { Modal, Button, Tabs, type TabsProps } from 'antd';
import { usePaystackPayment } from 'react-paystack';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { walletService } from '@/services/walletService';
import { useWallet } from '@/contexts/WalletContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import QRCode from 'react-qr-code';
import { message } from 'antd';

interface InsufficientFundsModalProps {
    isOpen: boolean;
    onClose: () => void;
    requiredAmount: number;
    currency: 'NGN' | 'USD';
    onSuccess: () => void;
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

    // Calculate amounts in both currencies
    const ngnAmount = currency === 'NGN' ? requiredAmount : requiredAmount * rates.NGN;
    const usdAmount = currency === 'USD' ? requiredAmount : requiredAmount / rates.NGN;

    const config = {
        reference: new Date().getTime().toString(),
        email: user?.email || '',
        amount: ngnAmount * 100, // Convert to kobo
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
    };

    const initializePayment = usePaystackPayment(config);

    const handlePaystackSuccess = async (response: any) => {
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
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to fund wallet');
        } finally {
            setLoading(false);
        }
    };

    const handleCryptoPayment = async () => {
        setLoading(true);
        try {
            const response = await walletService.fundUSD(usdAmount);
            setWalletAddress(response.address);
            message.success('Please complete the payment using the provided address');
        } catch (error: any) {
            message.error('Failed to generate payment address');
        } finally {
            setLoading(false);
        }
    };

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
                                            <QRCode value={walletAddress} size={200} />
                                            <p className="mt-4 text-center text-sm">
                                                Send ${usdAmount.toFixed(2)} USDT to:
                                                <br />
                                                <code className="block mt-2 p-2 bg-gray-100 rounded">
                                                    {walletAddress}
                                                </code>
                                            </p>
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