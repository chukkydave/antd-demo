import { NextResponse } from 'next/server';

const API_KEY = process.env.SICKW_API_KEY;
const API_BASE_URL = 'https://sickw.com/api.php';

export async function GET() {
    try {
        // Make API call to fetch services
        const response = await fetch(
            `${API_BASE_URL}?action=services&key=${API_KEY}`,
            {
                headers: {
                    'Accept': 'application/json'
                },
            }
        );

        const data = await response.json();
        console.log('Services API Response:', data); // Log the response

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Failed to fetch services' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error('Services Fetch Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
} 