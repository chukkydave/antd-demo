import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_ID = process.env.NEXT_PUBLIC_CRYPTOMUS_MERCHANT_ID;
const PAYMENT_KEY = process.env.NEXT_CRYPTOMUS_PAYMENT_KEY;

const generateSign = (payload: any) => {
    const sortedParams = Object.keys(payload)
        .sort()
        .reduce((acc, key) => ({ ...acc, [key]: payload[key] }), {});

    return crypto
        .createHash('md5')
        .update(Buffer.from(JSON.stringify(sortedParams)).toString('base64') + PAYMENT_KEY)
        .digest('hex');
};

export async function POST(request: Request) {
    try {
        const { amount, currency, network } = await request.json();

        const payload = {
            merchant_id: MERCHANT_ID,
            amount: amount,
            currency: currency,
            network: network,
            order_id: Date.now().toString(),
        };

        const response = await fetch('https://api.cryptomus.com/v1/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'merchant': MERCHANT_ID!,
                'sign': generateSign(payload),
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Failed to create payment' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Cryptomus Payment Error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment' },
            { status: 500 }
        );
    }
} 