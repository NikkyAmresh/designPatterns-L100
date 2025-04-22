// Visitor Pattern Implementation

// Visitor interface
interface DocumentVisitor {
    visitParagraph(paragraph: Paragraph): void;
    visitHeading(heading: Heading): void;
    visitLink(link: Link): void;
}

// Element interface
interface DocumentElement {
    accept(visitor: DocumentVisitor): void;
}

// Concrete Elements
export class Paragraph implements DocumentElement {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    accept(visitor: DocumentVisitor): void {
        visitor.visitParagraph(this);
    }
}

export class Heading implements DocumentElement {
    private text: string;
    private level: number;

    constructor(text: string, level: number) {
        this.text = text;
        this.level = level;
    }

    getText(): string {
        return this.text;
    }

    getLevel(): number {
        return this.level;
    }

    accept(visitor: DocumentVisitor): void {
        visitor.visitHeading(this);
    }
}

export class Link implements DocumentElement {
    private text: string;
    private url: string;

    constructor(text: string, url: string) {
        this.text = text;
        this.url = url;
    }

    getText(): string {
        return this.text;
    }

    getUrl(): string {
        return this.url;
    }

    accept(visitor: DocumentVisitor): void {
        visitor.visitLink(this);
    }
}

// Concrete Visitors
export class HTMLExportVisitor implements DocumentVisitor {
    private output: string = '';

    visitParagraph(paragraph: Paragraph): void {
        this.output += `<p>${paragraph.getText()}</p>\n`;
    }

    visitHeading(heading: Heading): void {
        const level = heading.getLevel();
        this.output += `<h${level}>${heading.getText()}</h${level}>\n`;
    }

    visitLink(link: Link): void {
        this.output += `<a href="${link.getUrl()}">${link.getText()}</a>\n`;
    }

    getOutput(): string {
        return this.output;
    }
}

export class MarkdownExportVisitor implements DocumentVisitor {
    private output: string = '';

    visitParagraph(paragraph: Paragraph): void {
        this.output += `${paragraph.getText()}\n\n`;
    }

    visitHeading(heading: Heading): void {
        const level = heading.getLevel();
        const prefix = '#'.repeat(level);
        this.output += `${prefix} ${heading.getText()}\n\n`;
    }

    visitLink(link: Link): void {
        this.output += `[${link.getText()}](${link.getUrl()})\n\n`;
    }

    getOutput(): string {
        return this.output;
    }
}

export class TextStatsVisitor implements DocumentVisitor {
    private wordCount: number = 0;
    private linkCount: number = 0;
    private headingCount: number = 0;

    visitParagraph(paragraph: Paragraph): void {
        this.wordCount += paragraph.getText().split(/\s+/).length;
    }

    visitHeading(heading: Heading): void {
        this.wordCount += heading.getText().split(/\s+/).length;
        this.headingCount++;
    }

    visitLink(link: Link): void {
        this.wordCount += link.getText().split(/\s+/).length;
        this.linkCount++;
    }

    getStatistics(): string {
        return `Document Statistics:
- Word count: ${this.wordCount}
- Link count: ${this.linkCount}
- Heading count: ${this.headingCount}`;
    }
}

// Usage example
export function visitorExample(): void {
    // Create document elements
    const elements: DocumentElement[] = [
        new Heading('Welcome to our Website', 1),
        new Paragraph('This is a sample paragraph with some text.'),
        new Link('Click here', 'https://example.com'),
        new Heading('About Us', 2),
        new Paragraph('We are a company dedicated to excellence.')
    ];

    // Export to HTML
    const htmlVisitor = new HTMLExportVisitor();
    console.log('=== HTML Export ===');
    elements.forEach(element => element.accept(htmlVisitor));
    console.log(htmlVisitor.getOutput());

    // Export to Markdown
    const markdownVisitor = new MarkdownExportVisitor();
    console.log('=== Markdown Export ===');
    elements.forEach(element => element.accept(markdownVisitor));
    console.log(markdownVisitor.getOutput());

    // Generate statistics
    const statsVisitor = new TextStatsVisitor();
    console.log('=== Document Statistics ===');
    elements.forEach(element => element.accept(statsVisitor));
    console.log(statsVisitor.getStatistics());
}
