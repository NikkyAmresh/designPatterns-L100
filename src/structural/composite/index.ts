// Composite Pattern Implementation

// Component interface
interface FileSystemComponent {
    getName(): string;
    getSize(): number;
    getPath(): string;
    setPath(path: string): void;
    print(indent: string): void;
}

// Leaf class
export class File implements FileSystemComponent {
    private path: string;

    constructor(
        private name: string,
        private size: number
    ) {
        this.path = '';
    }

    public getName(): string {
        return this.name;
    }

    public getSize(): number {
        return this.size;
    }

    public getPath(): string {
        return this.path;
    }

    public setPath(path: string): void {
        this.path = path;
    }

    public print(indent: string): void {
        console.log(`${indent}📄 ${this.name} (${this.size} bytes)`);
    }
}

// Composite class
export class Directory implements FileSystemComponent {
    private children: FileSystemComponent[] = [];
    private path: string;

    constructor(private name: string) {
        this.path = '';
    }

    public getName(): string {
        return this.name;
    }

    public getSize(): number {
        return this.children.reduce((sum, child) => sum + child.getSize(), 0);
    }

    public getPath(): string {
        return this.path;
    }

    public setPath(path: string): void {
        this.path = path;
        // Update paths of children
        this.children.forEach(child => {
            child.setPath(`${path}/${child.getName()}`);
        });
    }

    public add(component: FileSystemComponent): void {
        this.children.push(component);
        component.setPath(`${this.path}/${component.getName()}`);
    }

    public remove(component: FileSystemComponent): void {
        const index = this.children.indexOf(component);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    public getChild(index: number): FileSystemComponent {
        return this.children[index];
    }

    public getChildren(): FileSystemComponent[] {
        return [...this.children];
    }

    public print(indent: string): void {
        console.log(`${indent}📁 ${this.name} (${this.getSize()} bytes)`);
        this.children.forEach(child => {
            child.print(indent + '  ');
        });
    }

    public find(name: string): FileSystemComponent | null {
        if (this.name === name) {
            return this;
        }

        for (const child of this.children) {
            if (child instanceof Directory) {
                const found = child.find(name);
                if (found) {
                    return found;
                }
            } else if (child.getName() === name) {
                return child;
            }
        }

        return null;
    }
}

// Usage example
export function compositeExample(): void {
    // Create root directory
    const root = new Directory('root');
    root.setPath('/root');

    // Create subdirectories
    const home = new Directory('home');
    const user = new Directory('user');
    const documents = new Directory('documents');
    const pictures = new Directory('pictures');

    // Create files
    const config = new File('.config', 1024);
    const readme = new File('readme.txt', 2048);
    const photo1 = new File('vacation.jpg', 5120);
    const photo2 = new File('family.jpg', 4096);
    const doc1 = new File('report.pdf', 3072);
    const doc2 = new File('notes.txt', 1536);

    // Build directory structure
    root.add(home);
    home.add(user);
    user.add(documents);
    user.add(pictures);
    user.add(config);

    documents.add(readme);
    documents.add(doc1);
    documents.add(doc2);

    pictures.add(photo1);
    pictures.add(photo2);

    // Print directory structure
    console.log('=== File System Structure ===');
    root.print('');

    // Find and print specific components
    console.log('\n=== Finding Components ===');
    const foundDoc = root.find('report.pdf');
    if (foundDoc) {
        console.log(`Found: ${foundDoc.getPath()} (${foundDoc.getSize()} bytes)`);
    }

    const foundDir = root.find('pictures');
    if (foundDir instanceof Directory) {
        console.log(`\nPictures directory content:`);
        foundDir.print('  ');
        console.log(`Total size: ${foundDir.getSize()} bytes`);
    }
}
