import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_ID = process.env.JUICE_MERCHANT_ID;
const ALLOWED_IPS = [
    '68.183.219.141',
    '167.71.50.238',
    '167.71.57.22',
    '164.92.131.158',
    '167.172.191.189',
    '134.209.237.227'
];

interface WebhookPayload {
    checksum: string;
    event: string;
    data: any;
}

function validateChecksum(payload: WebhookPayload): boolean {
    const { checksum, event, data } = payload;

    // Sort data keys alphabetically
    const sortedData = Object.keys(data)
        .sort()
        .reduce((obj: any, key) => {
            obj[key] = data[key];
            return obj;
        }, {});

    const payloadString = `${event}|${JSON.stringify(sortedData)}`;
    const calculatedChecksum = crypto
        .createHmac('sha256', MERCHANT_ID!)
        .update(payloadString)
        .digest('hex')
        .toUpperCase();

    return calculatedChecksum === checksum;
}

export async function POST(request: Request) {
    try {
        // Verify IP address
        const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
        if (!clientIp || !ALLOWED_IPS.includes(clientIp)) {
            return NextResponse.json({ error: 'Unauthorized IP' }, { status: 403 });
        }

        const payload = await request.json() as WebhookPayload;

        // Validate checksum
        if (!validateChecksum(payload)) {
            return NextResponse.json({ error: 'Invalid checksum' }, { status: 400 });
        }

        // Return 200 OK immediately to acknowledge receipt
        const response = NextResponse.json({ received: true });

        // Process the event asynchronously
        processWebhookEvent(payload).catch(console.error);

        return response;

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

async function processWebhookEvent(payload: WebhookPayload) {
    const { event, data } = payload;

    switch (event) {
        case 'payment.session.created':
            await handlePaymentSessionCreated(data);
            break;
        case 'payment.session.succeeded':
            await handlePaymentSessionSucceeded(data);
            break;
        case 'payment.session.failed':
            await handlePaymentSessionFailed(data);
            break;
        case 'deposit.received':
            await handleDepositReceived(data);
            break;
        default:
            console.log('Unhandled webhook event:', event);
    }
}

// Implement these functions based on your business logic
async function handlePaymentSessionCreated(data: any) {
    // TODO: Implement payment session created logic
}

async function handlePaymentSessionSucceeded(data: any) {
    try {
        const { serviceType, imei } = data.metadata;

        if (serviceType === 'unlock') {
            // Create unlock request
            const unlockResponse = await fetch('/api/unlock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_TOKEN}`
                },
                body: JSON.stringify({
                    imei,
                    service: data.description
                })
            });

            if (unlockResponse.ok) {
                // Save the unlock request
                await fetch('/api/v1/checkers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.API_TOKEN}`
                    },
                    body: JSON.stringify({
                        type: 'unlock',
                        imei,
                        service: data.description,
                        status: 'pending',
                        paymentId: data.id
                    })
                });
            }
        }

        // Send success notification email
        // await sendEmail({
        //     to: data.customer.email,
        //     subject: 'Payment Successful',
        //     template: serviceType === 'unlock' ? 'unlock-payment-success' : 'checker-payment-success',
        //     data: {
        //         amount: data.amount,
        //         service: data.description,
        //         instructions: serviceType === 'unlock'
        //             ? 'Please check your dashboard in 2-3 days for updates on your unlock status.'
        //             : 'Your checker service is ready to use.'
        //     }
        // });

    } catch (error) {
        console.error('Payment Success Handler Error:', error);
    }
}

async function handlePaymentSessionFailed(data: any) {
    // TODO: Implement payment failure logic
}

async function handleDepositReceived(data: any) {
    // TODO: Implement deposit received logic
} 