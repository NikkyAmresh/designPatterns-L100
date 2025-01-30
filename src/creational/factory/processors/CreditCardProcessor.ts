import { PaymentProcessor } from '../interfaces/PaymentProcessor';

/**
 * Handles credit card payment processing.
 * Implements standard payment operations for credit card transactions.
 */
export class CreditCardProcessor implements PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }

    refundPayment(amount: number): void {
        console.log(`Refunding credit card payment of $${amount}`);
    }
} 