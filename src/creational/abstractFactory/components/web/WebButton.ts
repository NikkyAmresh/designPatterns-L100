import { Button, ButtonStyle } from '../../interfaces/UIComponents';

export class WebButton implements Button {
    private label: string;
    private style: ButtonStyle;
    private clickHandler?: () => void;

    constructor(label: string) {
        this.label = label;
        this.style = {
            backgroundColor: '#007bff',
            textColor: '#ffffff',
            borderRadius: 4,
            padding: '8px 16px'
        };
    }

    render(): string {
        return `
            <button 
                style="
                    background-color: ${this.style.backgroundColor};
                    color: ${this.style.textColor};
                    border-radius: ${this.style.borderRadius}px;
                    padding: ${this.style.padding};
                "
                onclick="handleClick()"
            >
                ${this.label}
            </button>
        `;
    }

    onClick(handler: () => void): void {
        this.clickHandler = handler;
    }

    setStyle(style: ButtonStyle): void {
        this.style = { ...this.style, ...style };
    }
} 