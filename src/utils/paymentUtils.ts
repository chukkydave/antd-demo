import { v4 as uuidv4 } from 'uuid';

export const generatePaymentReference = (prefix: string = 'PAY') => {
    // Generate a UUID and remove hyphens
    const uuid = uuidv4().replace(/-/g, '');
    // Get current timestamp
    const timestamp = Date.now();
    // Combine prefix, timestamp, and first 8 characters of UUID
    return `${prefix}-${timestamp}-${uuid.substring(0, 8)}`;
}; 