import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

const API_KEY = process.env.SICKW_API_KEY;
const API_BASE_URL = 'https://sickw.com/api.php';

export async function POST(request: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { imei, service } = await request.json();

        // Make API call to initiate unlock process
        const response = await fetch(
            `${API_BASE_URL}?format=JSON&key=${API_KEY}&imei=${imei}&service=${service}`,
            {
                method: 'GET', // or whatever method the API requires
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        );

        const apiResponse = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: apiResponse.message || 'API request failed' },
                { status: response.status }
            );
        }

        return NextResponse.json({
            message: 'Unlock request created successfully. Please check order history for updates.',
            orderId: apiResponse.id // or whatever reference ID the API returns
        });

    } catch (error) {
        console.error('Unlock Request Error:', error);
        return NextResponse.json(
            { error: 'Failed to create unlock request' },
            { status: 500 }
        );
    }
} 