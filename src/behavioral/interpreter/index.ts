// Interpreter Pattern Implementation

// Abstract Expression
interface Expression {
    interpret(context: number[]): number;
}

// Terminal Expression
export class NumberExpression implements Expression {
    private number: number;

    constructor(number: number) {
        this.number = number;
    }

    interpret(context: number[]): number {
        return this.number;
    }
}

// Non-terminal Expression for Addition
export class AddExpression implements Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    interpret(context: number[]): number {
        return this.left.interpret(context) + this.right.interpret(context);
    }
}

// Non-terminal Expression for Subtraction
export class SubtractExpression implements Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    interpret(context: number[]): number {
        return this.left.interpret(context) - this.right.interpret(context);
    }
}

// Context Variable Expression
export class VariableExpression implements Expression {
    private index: number;

    constructor(index: number) {
        this.index = index;
    }

    interpret(context: number[]): number {
        return context[this.index];
    }
}

// Usage example
export function interpreterExample(): void {
    // Creating expression: (5 + x) - (3 + y), where x and y are context variables
    const expression = new SubtractExpression(
        new AddExpression(
            new NumberExpression(5),
            new VariableExpression(0)  // x
        ),
        new AddExpression(
            new NumberExpression(3),
            new VariableExpression(1)  // y
        )
    );

    // Interpret with context [10, 5] (x = 10, y = 5)
    const context = [10, 5];
    const result = expression.interpret(context);
    console.log(`Result: ${result}`);  // Result: 7 (5 + 10) - (3 + 5)
}
