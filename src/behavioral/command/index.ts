// Command Pattern Implementation

// Command interface
interface Command {
    execute(): void;
    undo(): void;
}

// Receiver
export class TextEditor {
    private content: string = '';

    getContent(): string {
        return this.content;
    }

    insertText(text: string): void {
        this.content += text;
    }

    deleteText(length: number): void {
        this.content = this.content.slice(0, -length);
    }
}

// Concrete Commands
export class InsertTextCommand implements Command {
    private text: string;
    private editor: TextEditor;
    
    constructor(editor: TextEditor, text: string) {
        this.editor = editor;
        this.text = text;
    }

    execute(): void {
        this.editor.insertText(this.text);
    }

    undo(): void {
        this.editor.deleteText(this.text.length);
    }
}

export class DeleteTextCommand implements Command {
    private editor: TextEditor;
    private deletedText: string = '';
    private length: number;

    constructor(editor: TextEditor, length: number) {
        this.editor = editor;
        this.length = length;
    }

    execute(): void {
        this.deletedText = this.editor.getContent().slice(-this.length);
        this.editor.deleteText(this.length);
    }

    undo(): void {
        this.editor.insertText(this.deletedText);
    }
}

// Invoker
export class TextEditorInvoker {
    private commands: Command[] = [];
    private undoneCommands: Command[] = [];

    executeCommand(command: Command): void {
        command.execute();
        this.commands.push(command);
        this.undoneCommands = []; // Clear redo stack
    }

    undo(): void {
        const command = this.commands.pop();
        if (command) {
            command.undo();
            this.undoneCommands.push(command);
        }
    }

    redo(): void {
        const command = this.undoneCommands.pop();
        if (command) {
            command.execute();
            this.commands.push(command);
        }
    }
}

// Usage example
export function commandExample(): void {
    const editor = new TextEditor();
    const invoker = new TextEditorInvoker();

    // Execute commands
    invoker.executeCommand(new InsertTextCommand(editor, 'Hello '));
    invoker.executeCommand(new InsertTextCommand(editor, 'World!'));
    console.log(editor.getContent()); // Output: Hello World!

    // Undo last command
    invoker.undo();
    console.log(editor.getContent()); // Output: Hello 

    // Redo last command
    invoker.redo();
    console.log(editor.getContent()); // Output: Hello World!
}
