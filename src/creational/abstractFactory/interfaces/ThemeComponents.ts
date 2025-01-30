/**
 * Core theme component interfaces for different platforms
 */

export interface ColorPalette {
    primary: string;
    secondary: string;
    background: string;
    text: string;
}

export interface Typography {
    fontFamily: string;
    fontSize: {
        small: string;
        medium: string;
        large: string;
    };
}

export interface Spacing {
    small: number;
    medium: number;
    large: number;
} 