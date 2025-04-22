// Mediator Pattern Implementation

// Mediator interface
interface ChatMediator {
    sendMessage(message: string, sender: User): void;
    addUser(user: User): void;
}

// Concrete Mediator
export class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    sendMessage(message: string, sender: User): void {
        // Send message to all users except the sender
        this.users.forEach(user => {
            if (user !== sender) {
                user.receive(message, sender.getName());
            }
        });
    }
}

// Colleague class
export abstract class User {
    protected mediator: ChatMediator;
    protected name: string;

    constructor(mediator: ChatMediator, name: string) {
        this.mediator = mediator;
        this.name = name;
    }

    abstract send(message: string): void;
    abstract receive(message: string, sender: string): void;

    getName(): string {
        return this.name;
    }
}

// Concrete Colleague
export class ChatUser extends User {
    constructor(mediator: ChatMediator, name: string) {
        super(mediator, name);
    }

    send(message: string): void {
        console.log(`${this.name} sending message: ${message}`);
        this.mediator.sendMessage(message, this);
    }

    receive(message: string, sender: string): void {
        console.log(`${this.name} received message from ${sender}: ${message}`);
    }
}

// Usage example
export function mediatorExample(): void {
    const chatRoom = new ChatRoom();

    const john = new ChatUser(chatRoom, "John");
    const jane = new ChatUser(chatRoom, "Jane");
    const bob = new ChatUser(chatRoom, "Bob");

    chatRoom.addUser(john);
    chatRoom.addUser(jane);
    chatRoom.addUser(bob);

    john.send("Hello everyone!");
    console.log('---');
    jane.send("Hey John!");
    console.log('---');
    bob.send("Hi all!");
}
