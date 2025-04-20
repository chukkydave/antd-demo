import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

export async function POST() {
    try {
        // Verify admin authentication
        const session = await getServerSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Call the register webhook endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/register`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to register webhook');
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Admin Webhook Registration Error:', error);
        return NextResponse.json(
            { error: 'Failed to register webhook' },
            { status: 500 }
        );
    }
} 