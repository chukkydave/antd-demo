export const triggerPaymentConfirmation = () => {
    const event = new CustomEvent('payment-confirmed');
    window.dispatchEvent(event);
};

// Add this to your webhook handler when payment succeeds
export const notifyPaymentSuccess = () => {
    if (typeof window !== 'undefined') {
        triggerPaymentConfirmation();
    }
}; 