// Prototype Pattern Implementation

// Prototype interface
interface Cloneable<T> {
    clone(): T;
    deepClone(): T;
}

// Document class representing a document with metadata and content
export class Document implements Cloneable<Document> {
    constructor(
        public title: string,
        public metadata: Map<string, string>,
        public content: DocumentContent
    ) {}

    // Shallow clone - metadata and content references are shared
    clone(): Document {
        return new Document(
            this.title,
            this.metadata,
            this.content
        );
    }

    // Deep clone - creates new instances of metadata and content
    deepClone(): Document {
        // Clone metadata
        const newMetadata = new Map<string, string>();
        this.metadata.forEach((value, key) => {
            newMetadata.set(key, value);
        });

        // Clone content
        const newContent = this.content.deepClone();

        return new Document(
            this.title,
            newMetadata,
            newContent
        );
    }
}

// Document content class with sections and formatting
export class DocumentContent implements Cloneable<DocumentContent> {
    constructor(
        public sections: Section[],
        public formatting: DocumentFormatting
    ) {}

    // Shallow clone
    clone(): DocumentContent {
        return new DocumentContent(
            this.sections,
            this.formatting
        );
    }

    // Deep clone
    deepClone(): DocumentContent {
        return new DocumentContent(
            this.sections.map(section => section.deepClone()),
            this.formatting.deepClone()
        );
    }
}

// Section class representing a document section
export class Section implements Cloneable<Section> {
    constructor(
        public heading: string,
        public paragraphs: string[]
    ) {}

    // Shallow clone
    clone(): Section {
        return new Section(
            this.heading,
            this.paragraphs
        );
    }

    // Deep clone
    deepClone(): Section {
        return new Section(
            this.heading,
            [...this.paragraphs]
        );
    }
}

// Document formatting class
export class DocumentFormatting implements Cloneable<DocumentFormatting> {
    constructor(
        public fontFamily: string,
        public fontSize: number,
        public styles: Map<string, string>
    ) {}

    // Shallow clone
    clone(): DocumentFormatting {
        return new DocumentFormatting(
            this.fontFamily,
            this.fontSize,
            this.styles
        );
    }

    // Deep clone
    deepClone(): DocumentFormatting {
        const newStyles = new Map<string, string>();
        this.styles.forEach((value, key) => {
            newStyles.set(key, value);
        });

        return new DocumentFormatting(
            this.fontFamily,
            this.fontSize,
            newStyles
        );
    }
}

// Document registry to store and manage prototypes
export class DocumentRegistry {
    private templates: Map<string, Document> = new Map();

    // Register a document template
    registerTemplate(name: string, template: Document): void {
        this.templates.set(name, template);
    }

    // Create a shallow clone from a template
    createFromTemplate(name: string): Document {
        const template = this.templates.get(name);
        if (!template) {
            throw new Error(`Template '${name}' not found`);
        }
        return template.clone();
    }

    // Create a deep clone from a template
    createDeepFromTemplate(name: string): Document {
        const template = this.templates.get(name);
        if (!template) {
            throw new Error(`Template '${name}' not found`);
        }
        return template.deepClone();
    }
}

// Usage example
export function prototypeExample(): void {
    // Create initial document template
    const templateFormatting = new DocumentFormatting(
        'Arial',
        12,
        new Map([
            ['header', 'bold'],
            ['body', 'normal']
        ])
    );

    const templateContent = new DocumentContent(
        [
            new Section('Introduction', ['Welcome to our document']),
            new Section('Content', ['This is the main content'])
        ],
        templateFormatting
    );

    const templateMetadata = new Map([
        ['author', 'John Doe'],
        ['created', new Date().toISOString()]
    ]);

    const templateDocument = new Document(
        'Template Document',
        templateMetadata,
        templateContent
    );

    // Create document registry and register template
    const registry = new DocumentRegistry();
    registry.registerTemplate('standard', templateDocument);

    // Create shallow clone
    console.log('=== Shallow Clone Example ===');
    const shallowCopy = registry.createFromTemplate('standard');
    shallowCopy.title = 'Shallow Copy';
    shallowCopy.content.sections[0].heading = 'Modified Introduction';
    
    console.log('Original template heading:', templateDocument.content.sections[0].heading);
    console.log('Shallow copy heading:', shallowCopy.content.sections[0].heading);
    console.log('Shared reference:', templateDocument.content === shallowCopy.content);

    // Create deep clone
    console.log('\n=== Deep Clone Example ===');
    const deepCopy = registry.createDeepFromTemplate('standard');
    deepCopy.title = 'Deep Copy';
    deepCopy.content.sections[0].heading = 'New Introduction';
    
    console.log('Original template heading:', templateDocument.content.sections[0].heading);
    console.log('Deep copy heading:', deepCopy.content.sections[0].heading);
    console.log('Independent reference:', templateDocument.content !== deepCopy.content);

    // Demonstrate metadata cloning
    console.log('\n=== Metadata Cloning ===');
    deepCopy.metadata.set('author', 'Jane Smith');
    console.log('Original template author:', templateDocument.metadata.get('author'));
    console.log('Deep copy author:', deepCopy.metadata.get('author'));
}
