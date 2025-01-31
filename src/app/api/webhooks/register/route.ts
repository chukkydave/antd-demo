import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_JUICE_API_KEY;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL + '/api/webhooks/juice';

export async function POST() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_JUICE_API_URL}/accounts/settings`, {
            method: 'PATCH',
            headers: {
                'Authorization': API_KEY!,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                webhook_urls: [WEBHOOK_URL]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to register webhook');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook Registration Error:', error);
        return NextResponse.json({ error: 'Failed to register webhook' }, { status: 500 });
    }
} 