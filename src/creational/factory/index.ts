// Factory Pattern Implementation

// Product interface
interface Notification {
    send(message: string): void;
    getChannel(): string;
}

// Concrete Products
export class EmailNotification implements Notification {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    send(message: string): void {
        console.log(`Sending email to ${this.email}: ${message}`);
    }

    getChannel(): string {
        return 'Email';
    }
}

export class SMSNotification implements Notification {
    private phoneNumber: string;

    constructor(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    send(message: string): void {
        console.log(`Sending SMS to ${this.phoneNumber}: ${message}`);
    }

    getChannel(): string {
        return 'SMS';
    }
}

export class PushNotification implements Notification {
    private deviceToken: string;

    constructor(deviceToken: string) {
        this.deviceToken = deviceToken;
    }

    send(message: string): void {
        console.log(`Sending push notification to device ${this.deviceToken}: ${message}`);
    }

    getChannel(): string {
        return 'Push';
    }
}

// Factory class
export class NotificationFactory {
    public createNotification(type: string, recipient: string): Notification {
        switch (type.toLowerCase()) {
            case 'email':
                return new EmailNotification(recipient);
            case 'sms':
                return new SMSNotification(recipient);
            case 'push':
                return new PushNotification(recipient);
            default:
                throw new Error(`Notification type ${type} not supported`);
        }
    }
}

// Usage example
export function factoryExample(): void {
    const factory = new NotificationFactory();

    // Create different types of notifications
    const emailNotification = factory.createNotification('email', 'user@example.com');
    const smsNotification = factory.createNotification('sms', '+1234567890');
    const pushNotification = factory.createNotification('push', 'DEVICE_TOKEN_123');

    // Send notifications
    emailNotification.send('Welcome to our service!');
    smsNotification.send('Your verification code is 123456');
    pushNotification.send('New message received');

    // Get channels
    console.log(`Notification sent via ${emailNotification.getChannel()}`);
    console.log(`Notification sent via ${smsNotification.getChannel()}`);
    console.log(`Notification sent via ${pushNotification.getChannel()}`);

    try {
        // Try to create an unsupported notification type
        factory.createNotification('invalid', 'recipient');
    } catch (error) {
        console.log('Error:', (error as Error).message);
    }
}
