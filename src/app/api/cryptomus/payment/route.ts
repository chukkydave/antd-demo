import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_ID = process.env.NEXT_PUBLIC_CRYPTOMUS_MERCHANT_ID;
const PAYMENT_KEY = process.env.NEXT_CRYPTOMUS_PAYMENT_KEY;

const generateSign = (payload: any) => {
    // Convert payload to JSON string
    const jsonString = JSON.stringify(payload);
    // Encode to base64
    const base64String = Buffer.from(jsonString).toString('base64');
    // Create MD5 hash of base64 string + API key
    return crypto
        .createHash('md5')
        .update(base64String + PAYMENT_KEY)
        .digest('hex');
};

export async function POST(request: Request) {
    try {
        const { amount, currency, network } = await request.json();

        // Create payload matching Cryptomus documentation
        const payload = {
            amount: amount,
            currency: currency,
            order_id: Date.now().toString(),
            network: network // Optional parameter for specific network
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