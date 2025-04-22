// Flyweight Pattern Implementation

// Flyweight interface
interface TextFormat {
    render(text: string): string;
}

// Concrete Flyweight
export class CharacterFormat implements TextFormat {
    constructor(
        private fontFamily: string,
        private fontSize: number,
        private color: string,
        private isBold: boolean,
        private isItalic: boolean
    ) {}

    public render(text: string): string {
        let style = `font: ${this.fontSize}px ${this.fontFamily}`;
        if (this.isBold) style += ' bold';
        if (this.isItalic) style += ' italic';
        return `[${style}, color: ${this.color}] ${text}`;
    }
}

// Flyweight Factory
export class TextFormatFactory {
    private formats: Map<string, TextFormat> = new Map();

    public getFormat(
        fontFamily: string,
        fontSize: number,
        color: string,
        isBold: boolean = false,
        isItalic: boolean = false
    ): TextFormat {
        // Create a key from the format properties
        const key = `${fontFamily}-${fontSize}-${color}-${isBold}-${isItalic}`;

        // Return existing format if it exists
        if (this.formats.has(key)) {
            console.log(`Reusing existing format: ${key}`);
            return this.formats.get(key)!;
        }

        // Create new format if it doesn't exist
        console.log(`Creating new format: ${key}`);
        const format = new CharacterFormat(fontFamily, fontSize, color, isBold, isItalic);
        this.formats.set(key, format);
        return format;
    }

    public getFormatsCount(): number {
        return this.formats.size;
    }
}

// Context class that uses the flyweight
export class FormattedText {
    private text: string;
    private format: TextFormat;

    constructor(text: string, format: TextFormat) {
        this.text = text;
        this.format = format;
    }

    public render(): string {
        return this.format.render(this.text);
    }
}

// Document class that demonstrates the usage
export class Document {
    private factory: TextFormatFactory;
    private formattedTexts: FormattedText[] = [];

    constructor() {
        this.factory = new TextFormatFactory();
    }

    public addText(text: string, fontFamily: string, fontSize: number, color: string, isBold: boolean = false, isItalic: boolean = false): void {
        const format = this.factory.getFormat(fontFamily, fontSize, color, isBold, isItalic);
        this.formattedTexts.push(new FormattedText(text, format));
    }

    public render(): void {
        console.log('\nDocument content:');
        this.formattedTexts.forEach(formattedText => {
            console.log(formattedText.render());
        });
        console.log(`\nTotal format objects created: ${this.factory.getFormatsCount()}`);
    }
}

// Usage example
export function flyweightExample(): void {
    console.log('=== Text Formatting Flyweight Example ===\n');

    const document = new Document();

    // Add text with various formats
    console.log('Adding text with different formats:');
    
    // Regular text
    document.addText(
        'Welcome to our document!',
        'Arial',
        16,
        'black',
        true
    );

    // Reusing same format
    document.addText(
        'This uses the same format as above.',
        'Arial',
        16,
        'black',
        true
    );

    // Different format
    document.addText(
        'This is a subtitle',
        'Times New Roman',
        14,
        'gray',
        false,
        true
    );

    // Another different format
    document.addText(
        'This is body text.',
        'Helvetica',
        12,
        'black'
    );

    // Reusing body text format
    document.addText(
        'More body text with same formatting.',
        'Helvetica',
        12,
        'black'
    );

    // Render the document
    document.render();
}
