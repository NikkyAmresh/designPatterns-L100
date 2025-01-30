import { PaymentProcessor } from '../interfaces/PaymentProcessor';

/**
 * Handles cryptocurrency payment processing.
 * Implements standard payment operations for cryptocurrency transactions.
 */
export class CryptoProcessor implements PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing crypto payment of $${amount}`);
    }

    refundPayment(amount: number): void {
        console.log(`Refunding crypto payment of $${amount}`);
    }
} 