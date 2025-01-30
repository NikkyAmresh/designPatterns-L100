import { ThemeFactory } from '../interfaces/ThemeFactory';
import { ColorPalette, Typography, Spacing } from '../interfaces/ThemeComponents';

export class WebThemeFactory implements ThemeFactory {
    createColorPalette(): ColorPalette {
        return {
            primary: '#1976d2',
            secondary: '#dc004e',
            background: '#ffffff',
            text: '#000000'
        };
    }

    createTypography(): Typography {
        return {
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: {
                small: '12px',
                medium: '16px',
                large: '24px'
            }
        };
    }

    createSpacing(): Spacing {
        return {
            small: 8,
            medium: 16,
            large: 24
        };
    }
} 