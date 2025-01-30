/**
 * Common interface for all payment processors.
 * Each payment method (credit card, PayPal, crypto) will implement this interface,
 * ensuring consistent payment processing behavior across different methods.
 */
export interface PaymentProcessor {
    /**
     * Process a payment for the specified amount
     * @param amount The payment amount to process
     */
    processPayment(amount: number): void;

    /**
     * Process a refund for the specified amount
     * @param amount The amount to refund
     */
    refundPayment(amount: number): void;
} 