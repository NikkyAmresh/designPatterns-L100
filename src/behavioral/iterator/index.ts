// Iterator Pattern Implementation

// Iterator interface
interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
    current(): T;
}

// Aggregate interface
interface Aggregate<T> {
    createIterator(): Iterator<T>;
}

// Concrete Iterator
export class ArrayIterator<T> implements Iterator<T> {
    private collection: T[];
    private position: number = 0;

    constructor(collection: T[]) {
        this.collection = collection;
    }

    hasNext(): boolean {
        return this.position < this.collection.length;
    }

    next(): T {
        const item = this.collection[this.position];
        this.position++;
        return item;
    }

    current(): T {
        return this.collection[this.position];
    }
}

// Concrete Aggregate
export class NumberCollection implements Aggregate<number> {
    private items: number[] = [];

    constructor(items: number[]) {
        this.items = items;
    }

    createIterator(): Iterator<number> {
        return new ArrayIterator(this.items);
    }

    getItems(): number[] {
        return this.items;
    }

    addItem(item: number): void {
        this.items.push(item);
    }
}

// Specialized Iterator for even numbers
export class EvenNumberIterator implements Iterator<number> {
    private collection: number[];
    private position: number = 0;

    constructor(collection: number[]) {
        this.collection = collection.filter(num => num % 2 === 0);
    }

    hasNext(): boolean {
        return this.position < this.collection.length;
    }

    next(): number {
        const item = this.collection[this.position];
        this.position++;
        return item;
    }

    current(): number {
        return this.collection[this.position];
    }
}

// Usage example
export function iteratorExample(): void {
    const numbers = new NumberCollection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
    // Using regular iterator
    console.log('Regular iteration:');
    const iterator = numbers.createIterator();
    while (iterator.hasNext()) {
        console.log(iterator.next());
    }

    // Using even number iterator
    console.log('Even numbers iteration:');
    const evenIterator = new EvenNumberIterator(numbers.getItems());
    while (evenIterator.hasNext()) {
        console.log(evenIterator.next());
    }
}
