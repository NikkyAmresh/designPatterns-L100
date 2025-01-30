import { Button, Form, Dialog, Navigation } from './UIComponents';

/**
 * Abstract Factory interface for creating UI component families.
 * Each platform (Web, Mobile, Desktop) will provide its own factory implementation.
 */
export interface UIFactory {
    /**
     * Creates a platform-specific button component
     * @param label The button's label text
     */
    createButton(label: string): Button;

    /**
     * Creates a platform-specific form component
     * @param fields Array of form field configurations
     */
    createForm(fields: FormField[]): Form;

    /**
     * Creates a platform-specific dialog component
     * @param title The dialog's title
     */
    createDialog(title: string): Dialog;

    /**
     * Creates a platform-specific navigation component
     */
    createNavigation(): Navigation;
}

// Types for factory configuration
export type FormField = {
    name: string;
    type: 'text' | 'number' | 'email' | 'password';
    label: string;
    required?: boolean;
    validation?: RegExp;
}; 