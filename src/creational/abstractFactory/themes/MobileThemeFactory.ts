import { ThemeFactory } from '../interfaces/ThemeFactory';
import { ColorPalette, Typography, Spacing } from '../interfaces/ThemeComponents';

export class MobileThemeFactory implements ThemeFactory {
    createColorPalette(): ColorPalette {
        return {
            primary: '#2196f3',
            secondary: '#f50057',
            background: '#fafafa',
            text: '#212121'
        };
    }

    createTypography(): Typography {
        return {
            fontFamily: 'System, -apple-system, sans-serif',
            fontSize: {
                small: '14px',
                medium: '18px',
                large: '28px'
            }
        };
    }

    createSpacing(): Spacing {
        return {
            small: 12,
            medium: 20,
            large: 32
        };
    }
} 