// Adapter Pattern Implementation

// Target interface that our application expects
interface ModernPaymentGateway {
    processPayment(amount: number, currency: string): Promise<PaymentResult>;
    verifyPayment(paymentId: string): Promise<boolean>;
    refundPayment(paymentId: string, amount: number): Promise<RefundResult>;
}

// Result types
interface PaymentResult {
    success: boolean;
    paymentId: string;
    message: string;
}

interface RefundResult {
    success: boolean;
    refundId: string;
    message: string;
}

// Legacy payment system (adaptee) with incompatible interface
class LegacyPaymentSystem {
    public async makePayment(sum: number, currencyCode: string): Promise<string> {
        console.log(`Legacy system processing payment: ${sum} ${currencyCode}`);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const transactionId = `LEG-${Math.random().toString(36).substr(2, 9)}`;
        return transactionId;
    }

    public async checkPaymentStatus(transactionId: string): Promise<number> {
        console.log(`Legacy system checking status for transaction: ${transactionId}`);
        // Simulate status check (0: pending, 1: success, 2: failed)
        return Math.random() > 0.1 ? 1 : 2;
    }

    public async returnPayment(transactionId: string, amount: number): Promise<boolean> {
        console.log(`Legacy system returning payment: ${transactionId}, Amount: ${amount}`);
        // Simulate refund process
        await new Promise(resolve => setTimeout(resolve, 1000));
        return Math.random() > 0.1;
    }
}

// Adapter class that makes the legacy system work with the modern interface
export class PaymentSystemAdapter implements ModernPaymentGateway {
    private legacySystem: LegacyPaymentSystem;

    constructor() {
        this.legacySystem = new LegacyPaymentSystem();
    }

    public async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        try {
            const transactionId = await this.legacySystem.makePayment(amount, currency);
            const status = await this.legacySystem.checkPaymentStatus(transactionId);

            return {
                success: status === 1,
                paymentId: transactionId,
                message: status === 1 ? 'Payment processed successfully' : 'Payment processing failed'
            };
        } catch (error) {
            return {
                success: false,
                paymentId: '',
                message: `Payment failed: ${(error as Error).message}`
            };
        }
    }

    public async verifyPayment(paymentId: string): Promise<boolean> {
        try {
            const status = await this.legacySystem.checkPaymentStatus(paymentId);
            return status === 1;
        } catch (error) {
            console.error('Verification failed:', error);
            return false;
        }
    }

    public async refundPayment(paymentId: string, amount: number): Promise<RefundResult> {
        try {
            const success = await this.legacySystem.returnPayment(paymentId, amount);
            return {
                success,
                refundId: success ? `REF-${Math.random().toString(36).substr(2, 9)}` : '',
                message: success ? 'Refund processed successfully' : 'Refund failed'
            };
        } catch (error) {
            return {
                success: false,
                refundId: '',
                message: `Refund failed: ${(error as Error).message}`
            };
        }
    }
}

// Modern payment processor using the modern interface directly
export class ModernPaymentProcessor implements ModernPaymentGateway {
    public async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        console.log(`Modern system processing payment: ${amount} ${currency}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const success = Math.random() > 0.1;
        return {
            success,
            paymentId: success ? `MOD-${Math.random().toString(36).substr(2, 9)}` : '',
            message: success ? 'Payment processed successfully' : 'Payment failed'
        };
    }

    public async verifyPayment(paymentId: string): Promise<boolean> {
        console.log(`Modern system verifying payment: ${paymentId}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        return Math.random() > 0.1;
    }

    public async refundPayment(paymentId: string, amount: number): Promise<RefundResult> {
        console.log(`Modern system refunding payment: ${paymentId}, Amount: ${amount}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const success = Math.random() > 0.1;
        return {
            success,
            refundId: success ? `MREF-${Math.random().toString(36).substr(2, 9)}` : '',
            message: success ? 'Refund processed successfully' : 'Refund failed'
        };
    }
}

// Usage example
export async function adapterExample(): Promise<void> {
    // Create instances of both payment systems
    const legacyAdapter = new PaymentSystemAdapter();
    const modernSystem = new ModernPaymentProcessor();

    // Process payments using both systems
    console.log('=== Processing Payments ===');
    
    // Using legacy system through adapter
    console.log('\nLegacy System (via Adapter):');
    const legacyPayment = await legacyAdapter.processPayment(100, 'USD');
    console.log('Payment result:', legacyPayment);

    if (legacyPayment.success) {
        const verification = await legacyAdapter.verifyPayment(legacyPayment.paymentId);
        console.log('Payment verification:', verification);

        const refund = await legacyAdapter.refundPayment(legacyPayment.paymentId, 50);
        console.log('Partial refund result:', refund);
    }

    // Using modern system directly
    console.log('\nModern System:');
    const modernPayment = await modernSystem.processPayment(150, 'EUR');
    console.log('Payment result:', modernPayment);

    if (modernPayment.success) {
        const verification = await modernSystem.verifyPayment(modernPayment.paymentId);
        console.log('Payment verification:', verification);

        const refund = await modernSystem.refundPayment(modernPayment.paymentId, 150);
        console.log('Full refund result:', refund);
    }
}
