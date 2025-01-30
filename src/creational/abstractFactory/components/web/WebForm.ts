import { Form, ValidationResult, FormData, SubmitResult } from '../../interfaces/UIComponents';
import { FormField } from '../../interfaces/UIFactory';

export class WebForm implements Form {
    private fields: FormField[];
    private values: FormData = {};

    constructor(fields: FormField[]) {
        this.fields = fields;
    }

    render(): string {
        return `
            <form onsubmit="handleSubmit(event)">
                ${this.fields.map(field => `
                    <div class="form-group">
                        <label for="${field.name}">${field.label}</label>
                        <input
                            type="${field.type}"
                            id="${field.name}"
                            name="${field.name}"
                            ${field.required ? 'required' : ''}
                        />
                    </div>
                `).join('')}
                <button type="submit">Submit</button>
            </form>
        `;
    }

    validate(): ValidationResult {
        const errors: { [field: string]: string[] } = {};

        this.fields.forEach(field => {
            const value = this.values[field.name];
            const fieldErrors: string[] = [];

            if (field.required && !value) {
                fieldErrors.push(`${field.label} is required`);
            }

            if (field.validation && value && !field.validation.test(value)) {
                fieldErrors.push(`${field.label} is invalid`);
            }

            if (fieldErrors.length > 0) {
                errors[field.name] = fieldErrors;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    async submit(data: FormData): Promise<SubmitResult> {
        this.values = data;
        const validation = this.validate();

        if (!validation.isValid) {
            return {
                success: false,
                message: 'Validation failed',
                data: validation.errors
            };
        }

        // Simulate API call
        return {
            success: true,
            message: 'Form submitted successfully',
            data: this.values
        };
    }
} 