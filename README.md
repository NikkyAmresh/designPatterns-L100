# Design Patterns in TypeScript

This repository contains implementations of various design patterns in TypeScript, organized into three main categories:

## Categories

### Creational Patterns
- Singleton
- Factory
- Abstract Factory
- Builder
- Prototype

### Structural Patterns
- Adapter
- Composite
- Proxy
- Flyweight
- Facade
- Bridge
- Decorator

### Behavioral Patterns
- Template Method
- Mediator
- Chain of Responsibility
- Observer
- Strategy
- Command
- State
- Visitor
- Interpreter
- Iterator
- Memento

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

3. Build the project:
```bash
npm run build
```

## Running Examples

Each pattern includes example implementations in its `examples` directory. You can run examples using:

```bash
# Run a specific example
npm run example src/creational/singleton/examples

# Run all examples in a category
npm run example:creational
npm run example:structural
npm run example:behavioral
```

## Project Structure

Each pattern has its own directory with:
- `README.md` explaining the pattern
- `index.ts` for pattern implementation
- `examples/` directory containing example usage
- Unit tests