import axios from 'axios';
import crypto from 'crypto';

const MERCHANT_ID = process.env.NEXT_PUBLIC_CRYPTOMUS_MERCHANT_ID;
const PAYMENT_KEY = process.env.CRYPTOMUS_PAYMENT_KEY;

const generateSign = (payload: any) => {
    const sortedParams = Object.keys(payload)
        .sort()
        .reduce((acc, key) => ({ ...acc, [key]: payload[key] }), {});

    return crypto
        .createHash('md5')
        .update(Buffer.from(JSON.stringify(sortedParams)).toString('base64') + PAYMENT_KEY)
        .digest('hex');
};

export const cryptomusService = {
    createPayment: async (params: {
        amount: string;
        currency: string;
        network: string;
    }) => {
        const payload = {
            merchant_id: MERCHANT_ID,
            amount: params.amount,
            currency: params.currency,
            network: params.network,
            order_id: Date.now().toString(),
        };

        const response = await axios.post('https://api.cryptomus.com/v1/payment', payload, {
            headers: {
                'merchant': MERCHANT_ID,
                'sign': generateSign(payload),
            },
        });

        return response.data;
    }
}; 