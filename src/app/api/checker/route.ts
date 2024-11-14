import { NextResponse } from 'next/server';

const API_KEY = process.env.SICKW_API_KEY;
const API_BASE_URL = 'https://sickw.com/api.php';

function isValidIMEI(imei: string): boolean {
    const cleanIMEI = imei.replace(/\D/g, '');

    if (cleanIMEI.length !== 15) {
        return false;
    }

    let sum = 0;
    let double = false;

    for (let i = cleanIMEI.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanIMEI.charAt(i));

        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        double = !double;
    }

    return (sum % 10) === 0;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const imei = searchParams.get('imei');
        const service = searchParams.get('service');

        // Validate inputs
        if (!imei || !service) {
            return NextResponse.json(
                { error: 'IMEI and service are required' },
                { status: 400 }
            );
        }

        // Validate IMEI format
        if (!isValidIMEI(imei)) {
            return NextResponse.json(
                { error: 'Invalid IMEI number' },
                { status: 400 }
            );
        }

        // Make request to SICKW API
        const response = await fetch(
            `${API_BASE_URL}?format=JSON&key=${API_KEY}&imei=${imei}&service=${service}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'API request failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Checker API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 