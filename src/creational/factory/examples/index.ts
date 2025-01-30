import { PaymentProcessorFactory, PaymentMethod } from '../index';

console.log('Payment Processor Factory Example\n');

// Define a list of payments to process
const payments: { method: PaymentMethod; amount: number }[] = [
    { method: 'credit-card', amount: 100 },
    { method: 'paypal', amount: 50 },
    { method: 'crypto', amount: 75 }
];

// Process each payment using the appropriate processor
console.log('Processing payments...\n');
payments.forEach(({ method, amount }) => {
    // Create a processor for this payment method
    const processor = PaymentProcessorFactory.createPaymentProcessor(method);
    
    // Process the payment
    processor.processPayment(amount);
    
    // Demonstrate refund capability
    processor.refundPayment(amount);
    console.log(); // Add a blank line between payments
});

// Demonstrate error handling with invalid payment method
try {
    console.log('Attempting to use an invalid payment method...');
    const processor = PaymentProcessorFactory.createPaymentProcessor('cash' as PaymentMethod);
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}
