'use client';

import { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { usePaystackPayment } from 'react-paystack';
import { walletService } from '@/services/walletService';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface NGNFundingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NGNFundingModal({ isOpen, onClose }: NGNFundingModalProps) {
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { refetchBalance } = useWallet();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const config = {
        reference: new Date().getTime().toString(),
        email: user?.email || '', // Use user's email from auth context
        amount: parseFloat(amount) * 100, // Convert to kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    };

    const initializePayment = usePaystackPayment(config);

    const handlePaystackSuccess = async (response: any) => {
        if (!isAuthenticated) {
            message.error('Please login to continue');
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            await walletService.fundNGN({
                reference: response.reference,
                amount: parseFloat(amount)
            });

            message.success('Wallet funded successfully');
            await refetchBalance();
            onClose();
        } catch (error: any) {
            if (error.response?.status === 401) {
                message.error('Session expired. Please login again');
                router.push('/login');
            } else {
                message.error(error.response?.data?.message || 'Failed to fund wallet');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!amount || parseFloat(amount) <= 0) {
            message.error('Please enter a valid amount');
            return;
        }

        initializePayment({
            onSuccess: handlePaystackSuccess,
            onClose: () => message.info('Payment cancelled')
        });
    };

    return (
        <Modal
            title="Fund NGN Wallet"
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (NGN)
                    </label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        size="large"
                        prefix="₦"
                    />
                </div>

                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    className="w-full bg-[#D62027] hover:bg-[#B91C22]"
                    size="large"
                >
                    Fund Wallet
                </Button>
            </div>
        </Modal>
    );
} 