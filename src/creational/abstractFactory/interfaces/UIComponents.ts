/**
 * Core UI component interfaces.
 * Each platform (Web, Mobile, Desktop) will implement these interfaces
 * with platform-specific implementations.
 */

export interface Button {
    render(): string;
    onClick(handler: () => void): void;
    setStyle(style: ButtonStyle): void;
}

export interface Form {
    render(): string;
    validate(): ValidationResult;
    submit(data: FormData): Promise<SubmitResult>;
}

export interface Dialog {
    show(): void;
    hide(): void;
    setContent(content: string): void;
    setTitle(title: string): void;
}

export interface Navigation {
    addRoute(path: string, component: any): void;
    navigate(path: string): void;
    getCurrentRoute(): string;
}

// Common types used across components
export type ButtonStyle = {
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    padding: string;
};

export type ValidationResult = {
    isValid: boolean;
    errors: { [field: string]: string[] };
};

export type FormData = {
    [field: string]: any;
};

export type SubmitResult = {
    success: boolean;
    message: string;
    data?: any;
}; 