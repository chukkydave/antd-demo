import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

const API_KEY = process.env.SICKW_API_KEY;
const API_BASE_URL = 'https://sickw.com/api.php';

export async function GET(request: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';

        // Make API call to fetch unlock history
        const response = await fetch(
            `${API_BASE_URL}?format=JSON&key=${API_KEY}&action=history&page=${page}&limit=${limit}`,
            {
                headers: {
                    'Accept': 'application/json'
                },
            }
        );

        const apiResponse = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: apiResponse.message || 'Failed to fetch history' },
                { status: response.status }
            );
        }

        return NextResponse.json(apiResponse);

    } catch (error) {
        console.error('History Fetch Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch unlock history' },
            { status: 500 }
        );
    }
} 