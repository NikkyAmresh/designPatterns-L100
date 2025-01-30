import { PaymentProcessor } from './interfaces/PaymentProcessor';
import { PaymentMethod } from './types/PaymentMethod';
import { CreditCardProcessor } from './processors/CreditCardProcessor';
import { PayPalProcessor } from './processors/PayPalProcessor';
import { CryptoProcessor } from './processors/CryptoProcessor';

/**
 * Factory for creating payment processors.
 * Centralizes the creation of different payment processor instances,
 * making it easy to add new payment methods without changing client code.
 */
export class PaymentProcessorFactory {
    /**
     * Creates a payment processor for the specified payment method.
     * @param method The type of payment processor to create
     * @returns A payment processor instance for the specified method
     * @throws Error if the payment method is not supported
     */
    static createPaymentProcessor(method: PaymentMethod): PaymentProcessor {
        switch (method) {
            case 'credit-card':
                return new CreditCardProcessor();
            case 'paypal':
                return new PayPalProcessor();
            case 'crypto':
                return new CryptoProcessor();
            default:
                throw new Error(`Payment method ${method} not supported`);
        }
    }
} 