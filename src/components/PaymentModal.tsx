'use client';

import { Modal, Button } from 'antd';
import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import InsufficientFundsModal from './InsufficientFundsModal';
import { message } from 'antd';
import { walletService } from '@/services/walletService';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    service: {
        id: string;
        name: string;
        price: {
            NGN: number;
            USD: number;
        };
    };
    onSuccess: () => void;
    imei: string;
}

const PaymentModal = ({ isOpen, onClose, service, onSuccess }: PaymentModalProps) => {
    const { balance, refetchBalance } = useWallet();
    const { currentCurrency } = useCurrency();
    const [showFundingModal, setShowFundingModal] = useState(false);

    // Get the amount in the current currency based on the selected currency
    const displayAmount = currentCurrency === 'USD'
        ? service.price.USD
        : service.price.NGN;

    const handlePayment = async () => {
        // Explicitly refresh balance before checking
        await refetchBalance();

        // Check if user has sufficient balance
        if (parseFloat(balance) < displayAmount) {
            setShowFundingModal(true);
            return;
        }

        // Process payment with existing balance
        try {
            await walletService.deductBalance(displayAmount, currentCurrency as 'NGN' | 'USD');
            onSuccess();
            onClose();
        } catch (error) {
            console.log(error);
            message.error('Payment failed');
        }
    };

    // Format the currency display
    const formatCurrency = (amount: number) => {
        const symbol = currentCurrency === 'NGN' ? '₦' : '$';
        return `${symbol}${amount.toFixed(2)}`;
    };

    return (
        <>
            <Modal
                open={isOpen}
                onCancel={onClose}
                footer={null}
                title="Confirm Payment"
            >
                <div className="py-4">
                    <p className="mb-4">
                        Pay {formatCurrency(displayAmount)} for {service.name}
                    </p>

                    <Button
                        type="primary"
                        onClick={handlePayment}
                        className="w-full bg-[#D62027] hover:bg-[#B91C22]"
                    >
                        Pay Now
                    </Button>
                </div>
            </Modal>

            <InsufficientFundsModal
                isOpen={showFundingModal}
                onClose={() => setShowFundingModal(false)}
                requiredAmount={displayAmount}
                currency={currentCurrency as 'NGN' | 'USD'}
                onSuccess={handlePayment}
            />
        </>
    );
};

export default PaymentModal; 