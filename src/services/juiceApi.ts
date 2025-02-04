import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_JUICE_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_JUICE_API_KEY;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
    }
});

interface PaymentSession {
    customer: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        billing_address: {
            line1: string;
            line2?: string;
            city: string;
            state: string;
            country: string;
            zip_code: string;
        }
    };
    description: string;
    currency: string;
    amount: number;
    reference: string;
    isLive: boolean;
    payment_method: {
        type: string;
    };
    metadata?: Record<string, any>;
}

export const juicePaymentService = {
    createPaymentSession: async (sessionData: PaymentSession) => {
        const response = await api.post('/payment-sessions', sessionData);
        return response.data;
    },

    capturePayment: async (paymentId: string) => {
        const response = await api.post(`/payment-sessions/${paymentId}`);
        return response.data;
    }
}; 