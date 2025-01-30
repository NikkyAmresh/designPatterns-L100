# Factory Pattern 🏭

## What is it?
The Factory pattern is a creational pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate.

## Real-World Analogy
Think of a payment processing service like Stripe:
- You tell it "I want to process a credit card payment"
- You don't need to know how credit card processing works internally
- The service handles all the complexity and gives you back a working payment processor

## Folder Structure
```
factory/
├── interfaces/
│   └── PaymentProcessor.ts     # Interface definition
├── processors/
│   ├── CreditCardProcessor.ts  # Concrete implementations
│   ├── PayPalProcessor.ts
│   └── CryptoProcessor.ts
├── types/
│   └── PaymentMethod.ts        # Type definitions
├── PaymentProcessorFactory.ts  # Factory implementation
├── index.ts                    # Main exports
├── examples/
│   └── index.ts               # Usage examples
└── README.md                  # Documentation
```

## Our Example: Payment Processor

### The Problem
We need to handle multiple payment methods (credit card, PayPal, crypto) but:
- Each payment method works differently
- We want to keep the creation logic in one place
- We want to make it easy to add new payment methods later

### The Solution
```typescript
// Create any payment processor you need
const processor = PaymentProcessorFactory.createPaymentProcessor('credit-card');
processor.processPayment(100);
```

### Why It's Good
1. 🎯 **Single Responsibility**: Factory handles object creation, processors handle payments
2. 🔌 **Loose Coupling**: Your code doesn't need to know how payment processors are created
3. 🚀 **Easy to Extend**: Want to add Apple Pay? Just add a new processor class
4. 🛡️ **Type Safety**: TypeScript ensures you can only use valid payment methods

### When to Use It
- You don't know exactly what types of objects you need to create
- You want to delegate object creation to subclasses
- You want to work with objects through a common interface
