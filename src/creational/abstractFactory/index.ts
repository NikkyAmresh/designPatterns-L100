
// Abstract Factory Pattern Implementation

// Abstract Products
interface Button {
    render(): void;
    onClick(): void;
}

interface Checkbox {
    render(): void;
    toggle(): void;
}

interface TextInput {
    render(): void;
    getValue(): string;
    setValue(value: string): void;
}

// Concrete Products for Light Theme
export class LightButton implements Button {
    render(): void {
        console.log('Rendering light theme button');
    }

    onClick(): void {
        console.log('Light button clicked');
    }
}

export class LightCheckbox implements Checkbox {
    private checked: boolean = false;

    render(): void {
        console.log(`Rendering light theme checkbox (${this.checked ? 'checked' : 'unchecked'})`);
    }

    toggle(): void {
        this.checked = !this.checked;
        console.log(`Light checkbox ${this.checked ? 'checked' : 'unchecked'}`);
    }
}

export class LightTextInput implements TextInput {
    private value: string = '';

    render(): void {
        console.log(`Rendering light theme text input with value: ${this.value}`);
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
        console.log(`Light text input value set to: ${value}`);
    }
}

// Concrete Products for Dark Theme
export class DarkButton implements Button {
    render(): void {
        console.log('Rendering dark theme button');
    }

    onClick(): void {
        console.log('Dark button clicked');
    }
}

export class DarkCheckbox implements Checkbox {
    private checked: boolean = false;

    render(): void {
        console.log(`Rendering dark theme checkbox (${this.checked ? 'checked' : 'unchecked'})`);
    }

    toggle(): void {
        this.checked = !this.checked;
        console.log(`Dark checkbox ${this.checked ? 'checked' : 'unchecked'}`);
    }
}

export class DarkTextInput implements TextInput {
    private value: string = '';

    render(): void {
        console.log(`Rendering dark theme text input with value: ${this.value}`);
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
        console.log(`Dark text input value set to: ${value}`);
    }
}

// Abstract Factory
interface UIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
    createTextInput(): TextInput;
}

// Concrete Factories
export class LightThemeFactory implements UIFactory {
    createButton(): Button {
        return new LightButton();
    }

    createCheckbox(): Checkbox {
        return new LightCheckbox();
    }

    createTextInput(): TextInput {
        return new LightTextInput();
    }
}

export class DarkThemeFactory implements UIFactory {
    createButton(): Button {
        return new DarkButton();
    }

    createCheckbox(): Checkbox {
        return new DarkCheckbox();
    }

    createTextInput(): TextInput {
        return new DarkTextInput();
    }
}

// Application
export class Application {
    private factory: UIFactory;
    private button: Button;
    private checkbox: Checkbox;
    private input: TextInput;

    constructor(factory: UIFactory) {
        this.factory = factory;
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
        this.input = factory.createTextInput();
    }

    createUI(): void {
        this.button.render();
        this.checkbox.render();
        this.input.render();
    }

    simulateUserInteraction(): void {
        this.button.onClick();
        this.checkbox.toggle();
        this.input.setValue('Hello, World!');
        this.checkbox.toggle();
    }
}

// Usage example
export function abstractFactoryExample(): void {
    console.log('=== Light Theme ===');
    const lightApp = new Application(new LightThemeFactory());
    lightApp.createUI();
    lightApp.simulateUserInteraction();

    console.log('\n=== Dark Theme ===');
    const darkApp = new Application(new DarkThemeFactory());
    darkApp.createUI();
    darkApp.simulateUserInteraction();
}
