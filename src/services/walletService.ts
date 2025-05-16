import { api } from './api';
import { cryptomusService } from './cryptomusService';

interface WalletBalance {
    id: number;
    user: number;
    balance: string;
    total_earned: string;
    total_sold: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface PaystackResponse {
    reference: string;
    amount: number;
}

interface DepositResponse {
    wallet: {
        id: number;
        user: number;
        balance: string;
        total_earned: string;
        status: string;
        updatedAt: string;
    };
    amount: number;
}

export const walletService = {
    getBalance: async (): Promise<WalletBalance> => {
        try {
            const response = await api.get('/api/v1/wallet');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
            throw error;
        }
    },

    fundNGN: async (paymentResponse: PaystackResponse): Promise<DepositResponse> => {
        try {
            const response = await api.post('/api/v1/wallet/deposit', {
                paymentResponse
            });
            return response.data.data;
        } catch (error) {
            console.error('Error funding wallet:', error);
            throw error;
        }
    },

    fundUSD: async (amount: number) => {
        // Create Cryptomus payment session
        const payment = await cryptomusService.createPayment({
            amount: amount.toString(),
            currency: 'USDT',
            network: 'ETH', // or other supported networks
        });
        return payment;
    },

    deductBalance: async (amount: number, currency: 'NGN' | 'USD') => {
        const response = await api.post('/wallet/deduct', { amount: amount.toString(), currency });
        return response.data;
    }
}; 