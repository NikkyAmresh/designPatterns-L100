import { PaymentProcessor } from '../interfaces/PaymentProcessor';

/**
 * Handles PayPal payment processing.
 * Implements standard payment operations for PayPal transactions.
 */
export class PayPalProcessor implements PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing PayPal payment of $${amount}`);
    }

    refundPayment(amount: number): void {
        console.log(`Refunding PayPal payment of $${amount}`);
    }
} 