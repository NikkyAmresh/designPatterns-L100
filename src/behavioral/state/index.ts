// State Pattern Implementation

// State interface
interface VendingMachineState {
    insertCoin(machine: VendingMachine): void;
    selectProduct(machine: VendingMachine): void;
    dispense(machine: VendingMachine): void;
}

// Concrete States
export class NoCoinState implements VendingMachineState {
    insertCoin(machine: VendingMachine): void {
        console.log('Coin inserted');
        machine.setState(new HasCoinState());
    }

    selectProduct(machine: VendingMachine): void {
        console.log('Please insert a coin first');
    }

    dispense(machine: VendingMachine): void {
        console.log('Please insert a coin first');
    }
}

export class HasCoinState implements VendingMachineState {
    insertCoin(machine: VendingMachine): void {
        console.log('Coin already inserted');
    }

    selectProduct(machine: VendingMachine): void {
        console.log('Product selected');
        machine.setState(new ProductSelectedState());
    }

    dispense(machine: VendingMachine): void {
        console.log('Please select a product first');
        machine.returnCoin();
        machine.setState(new NoCoinState());
    }
}

export class ProductSelectedState implements VendingMachineState {
    insertCoin(machine: VendingMachine): void {
        console.log('Please wait, dispensing product');
    }

    selectProduct(machine: VendingMachine): void {
        console.log('Please wait, dispensing product');
    }

    dispense(machine: VendingMachine): void {
        console.log('Product dispensed');
        machine.setState(new NoCoinState());
    }
}

// Context
export class VendingMachine {
    private state: VendingMachineState;
    private productCount: number;

    constructor(productCount: number) {
        this.state = new NoCoinState();
        this.productCount = productCount;
    }

    setState(state: VendingMachineState): void {
        this.state = state;
    }

    insertCoin(): void {
        this.state.insertCoin(this);
    }

    selectProduct(): void {
        if (this.productCount > 0) {
            this.state.selectProduct(this);
        } else {
            console.log('Sorry, out of products');
            this.returnCoin();
            this.setState(new NoCoinState());
        }
    }

    dispense(): void {
        if (this.productCount > 0) {
            this.productCount--;
            this.state.dispense(this);
        } else {
            console.log('Sorry, out of products');
        }
    }

    returnCoin(): void {
        console.log('Coin returned');
    }

    getProductCount(): number {
        return this.productCount;
    }
}

// Usage example
export function stateExample(): void {
    const vendingMachine = new VendingMachine(2);

    // First purchase
    console.log('--- First purchase ---');
    vendingMachine.insertCoin();
    vendingMachine.selectProduct();
    vendingMachine.dispense();

    // Second purchase
    console.log('--- Second purchase ---');
    vendingMachine.insertCoin();
    vendingMachine.selectProduct();
    vendingMachine.dispense();

    // Try to purchase when empty
    console.log('--- Third purchase (machine empty) ---');
    vendingMachine.insertCoin();
    vendingMachine.selectProduct();
}
