import { ColorPalette, Typography, Spacing } from './ThemeComponents';

export interface ThemeFactory {
    createColorPalette(): ColorPalette;
    createTypography(): Typography;
    createSpacing(): Spacing;
} 