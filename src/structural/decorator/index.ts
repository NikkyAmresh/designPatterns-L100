// Decorator Pattern Implementation

// Component interface
interface TextProcessor {
    process(text: string): string;
    getDescription(): string;
}

// Concrete component
export class BasicTextProcessor implements TextProcessor {
    public process(text: string): string {
        return text.trim();
    }

    public getDescription(): string {
        return "Basic text processor";
    }
}

// Base decorator
abstract class TextProcessorDecorator implements TextProcessor {
    protected wrapped: TextProcessor;

    constructor(processor: TextProcessor) {
        this.wrapped = processor;
    }

    public process(text: string): string {
        return this.wrapped.process(text);
    }

    public getDescription(): string {
        return this.wrapped.getDescription();
    }
}

// Concrete decorators
export class CapitalizeDecorator extends TextProcessorDecorator {
    public process(text: string): string {
        const processed = super.process(text);
        return processed.charAt(0).toUpperCase() + processed.slice(1);
    }

    public getDescription(): string {
        return `${super.getDescription()}, with capitalization`;
    }
}

export class TrimSpacesDecorator extends TextProcessorDecorator {
    public process(text: string): string {
        const processed = super.process(text);
        return processed.replace(/\s+/g, ' ');
    }

    public getDescription(): string {
        return `${super.getDescription()}, with space trimming`;
    }
}

export class HTMLEscapeDecorator extends TextProcessorDecorator {
    public process(text: string): string {
        const processed = super.process(text);
        return processed
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    public getDescription(): string {
        return `${super.getDescription()}, with HTML escaping`;
    }
}

export class MarkdownToHTMLDecorator extends TextProcessorDecorator {
    public process(text: string): string {
        let processed = super.process(text);
        
        // Convert bold
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert italic
        processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Convert links
        processed = processed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        // Convert headers
        processed = processed.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        processed = processed.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        // Convert lists
        processed = processed.replace(/^- (.*$)/gm, '<li>$1</li>');

        return processed;
    }

    public getDescription(): string {
        return `${super.getDescription()}, with Markdown to HTML conversion`;
    }
}

// Usage example
export function decoratorExample(): void {
    // Create a basic processor
    const basicProcessor = new BasicTextProcessor();

    // Create decorated processors
    const capitalizedProcessor = new CapitalizeDecorator(basicProcessor);
    const trimmedAndCapitalizedProcessor = new TrimSpacesDecorator(capitalizedProcessor);
    const htmlEscapedProcessor = new HTMLEscapeDecorator(basicProcessor);
    const markdownProcessor = new MarkdownToHTMLDecorator(
        new TrimSpacesDecorator(
            new HTMLEscapeDecorator(basicProcessor)
        )
    );

    // Test text
    const text = "  this   is   a   test  ";
    const markdownText = `# Title
This is a **bold** and *italic* text with a [link](http://example.com).
- List item 1
- List item 2`;

    // Test different processors
    console.log('=== Basic Processing ===');
    console.log(`Original: "${text}"`);
    console.log(`Processed: "${basicProcessor.process(text)}"`);
    console.log(`Processor: ${basicProcessor.getDescription()}`);

    console.log('\n=== Capitalized Processing ===');
    console.log(`Processed: "${capitalizedProcessor.process(text)}"`);
    console.log(`Processor: ${capitalizedProcessor.getDescription()}`);

    console.log('\n=== Trimmed and Capitalized Processing ===');
    console.log(`Processed: "${trimmedAndCapitalizedProcessor.process(text)}"`);
    console.log(`Processor: ${trimmedAndCapitalizedProcessor.getDescription()}`);

    console.log('\n=== HTML Escaped Processing ===');
    console.log(`Original: "Hello <world> & "quotes"""`);
    console.log(`Processed: "${htmlEscapedProcessor.process('Hello <world> & "quotes"')}"`);
    console.log(`Processor: ${htmlEscapedProcessor.getDescription()}`);

    console.log('\n=== Markdown to HTML Processing ===');
    console.log('Original:\n', markdownText);
    console.log('\nProcessed:\n', markdownProcessor.process(markdownText));
    console.log('\nProcessor:', markdownProcessor.getDescription());
}
