// Memento Pattern Implementation

// Memento class to store the state
export class EditorMemento {
    private content: string;
    private cursorPosition: number;

    constructor(content: string, cursorPosition: number) {
        this.content = content;
        this.cursorPosition = cursorPosition;
    }

    getContent(): string {
        return this.content;
    }

    getCursorPosition(): number {
        return this.cursorPosition;
    }
}

// Originator class
export class Editor {
    private content: string = '';
    private cursorPosition: number = 0;

    type(text: string): void {
        this.content = this.content.slice(0, this.cursorPosition) + 
                      text + 
                      this.content.slice(this.cursorPosition);
        this.cursorPosition += text.length;
    }

    delete(chars: number): void {
        if (this.cursorPosition >= chars) {
            this.content = this.content.slice(0, this.cursorPosition - chars) + 
                          this.content.slice(this.cursorPosition);
            this.cursorPosition -= chars;
        }
    }

    moveCursor(position: number): void {
        if (position >= 0 && position <= this.content.length) {
            this.cursorPosition = position;
        }
    }

    getContent(): string {
        return this.content;
    }

    getCursorPosition(): number {
        return this.cursorPosition;
    }

    save(): EditorMemento {
        return new EditorMemento(this.content, this.cursorPosition);
    }

    restore(memento: EditorMemento): void {
        this.content = memento.getContent();
        this.cursorPosition = memento.getCursorPosition();
    }
}

// Caretaker class
export class EditorHistory {
    private mementos: EditorMemento[] = [];
    private currentState: number = -1;

    push(memento: EditorMemento): void {
        // Remove any states after the current one when a new state is added
        this.mementos = this.mementos.slice(0, this.currentState + 1);
        this.mementos.push(memento);
        this.currentState++;
    }

    undo(): EditorMemento | null {
        if (this.currentState > 0) {
            this.currentState--;
            return this.mementos[this.currentState];
        }
        return null;
    }

    redo(): EditorMemento | null {
        if (this.currentState + 1 < this.mementos.length) {
            this.currentState++;
            return this.mementos[this.currentState];
        }
        return null;
    }
}

// Usage example
export function mementoExample(): void {
    const editor = new Editor();
    const history = new EditorHistory();

    // Initial state
    editor.type("Hello");
    history.push(editor.save());
    console.log("Initial:", editor.getContent()); // Hello

    // Add more text
    editor.type(" World");
    history.push(editor.save());
    console.log("After typing:", editor.getContent()); // Hello World

    // Undo
    const undoState = history.undo();
    if (undoState) {
        editor.restore(undoState);
        console.log("After undo:", editor.getContent()); // Hello
    }

    // Redo
    const redoState = history.redo();
    if (redoState) {
        editor.restore(redoState);
        console.log("After redo:", editor.getContent()); // Hello World
    }
}
