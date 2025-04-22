// Strategy Pattern Implementation

// Strategy interface
interface PaymentStrategy {
    pay(amount: number): void;
    validate(): boolean;
}

// Concrete Strategies
export class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;
    private cvv: string;
    private dateOfExpiry: string;

    constructor(cardNumber: string, cvv: string, dateOfExpiry: string) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.dateOfExpiry = dateOfExpiry;
    }

    validate(): boolean {
        // Basic validation
        return this.cardNumber.length === 16 && 
               this.cvv.length === 3 &&
               this.dateOfExpiry.length === 5;
    }

    pay(amount: number): void {
        if (this.validate()) {
            console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
        } else {
            console.log('Invalid credit card details');
        }
    }
}

export class PayPalPayment implements PaymentStrategy {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    validate(): boolean {
        // Basic validation
        return this.email.includes('@') && this.password.length >= 8;
    }

    pay(amount: number): void {
        if (this.validate()) {
            console.log(`Paid ${amount} using PayPal account: ${this.email}`);
        } else {
            console.log('Invalid PayPal credentials');
        }
    }
}

export class BankTransferPayment implements PaymentStrategy {
    private accountNumber: string;
    private bankCode: string;

    constructor(accountNumber: string, bankCode: string) {
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
    }

    validate(): boolean {
        // Basic validation
        return this.accountNumber.length === 10 && this.bankCode.length === 6;
    }

    pay(amount: number): void {
        if (this.validate()) {
            console.log(`Paid ${amount} using Bank Transfer from account: ${this.accountNumber}`);
        } else {
            console.log('Invalid bank account details');
        }
    }
}

// Context
export class PaymentProcessor {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    processPayment(amount: number): void {
        this.strategy.pay(amount);
    }
}

// Usage example
export function strategyExample(): void {
    // Create payment processor with initial strategy
    const processor = new PaymentProcessor(
        new CreditCardPayment('1234567890123456', '123', '12/25')
    );

    // Process payment with credit card
    console.log('--- Credit Card Payment ---');
    processor.processPayment(100);

    // Change strategy to PayPal
    console.log('--- PayPal Payment ---');
    processor.setStrategy(new PayPalPayment('user@example.com', 'password123'));
    processor.processPayment(50);

    // Change strategy to Bank Transfer
    console.log('--- Bank Transfer Payment ---');
    processor.setStrategy(new BankTransferPayment('1234567890', 'BANKCD'));
    processor.processPayment(75);

    // Try with invalid credit card
    console.log('--- Invalid Credit Card Payment ---');
    processor.setStrategy(new CreditCardPayment('123', '12', '1/2'));
    processor.processPayment(200);
}
