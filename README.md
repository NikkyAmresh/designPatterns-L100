# Design Patterns in TypeScript

This repository contains implementations of various design patterns in TypeScript, organized into three main categories. Each pattern is implemented with practical, real-world examples to demonstrate its usage and benefits.

## Categories

### Creational Patterns
- **Singleton**: Database connection management
- **Factory**: Notification system (Email, SMS, Push)
- **Abstract Factory**: UI theme components (Light/Dark themes)
- **Builder**: Computer assembly system
- **Prototype**: Shape cloning system

### Structural Patterns
- **Adapter**: Payment gateway integration
- **Bridge**: Device remote control system
- **Composite**: File system hierarchy
- **Decorator**: Text processing and formatting
- **Facade**: Video conversion system
- **Flyweight**: Text formatting optimization
- **Proxy**: Video streaming with caching and access control

### Behavioral Patterns
- **Chain of Responsibility**: Multi-level logging system
- **Command**: Text editor commands
- **Interpreter**: Simple arithmetic expression parser
- **Iterator**: Custom collection traversal
- **Mediator**: Chat room communication
- **Memento**: Text editor state management
- **Observer**: News updates
- **State**: Vending machine operation
- **Strategy**: Payment method selection
- **Template Method**: Data mining process
- **Visitor**: Document element processing

## Project Structure

The project follows a clean and organized structure:

```
src/
├── behavioral/
│   ├── chainOfResponsibility/
│   │   └── index.ts
│   ├── command/
│   │   └── index.ts
│   └── ...
├── creational/
│   ├── singleton/
│   │   └── index.ts
│   ├── factory/
│   │   └── index.ts
│   └── ...
└── structural/
    ├── adapter/
    │   └── index.ts
    ├── bridge/
    │   └── index.ts
    └── ...
```

Each pattern is implemented in its own directory with a single `index.ts` file that contains:
- Pattern implementation
- Concrete examples
- Usage demonstration

## Key Features

- Clean, maintainable TypeScript code
- Practical, real-world examples
- Comprehensive implementations
- Modern TypeScript features and best practices
- Clear separation of concerns
- Detailed comments and documentation

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd design-patterns-typescript
```

2. Install dependencies:
```bash
npm install
```

3. Explore the patterns:
Each pattern is self-contained in its respective directory under `src/`. Navigate to any pattern's `index.ts` file to see its implementation and example usage.

## Contributing

Feel free to contribute by:
- Adding new pattern implementations
- Improving existing implementations
- Suggesting better examples
- Fixing bugs or issues

Please ensure your contributions follow the existing code structure and maintain clean, well-documented code.