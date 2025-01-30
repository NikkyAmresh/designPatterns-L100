import { ThemeFactory } from '../interfaces/ThemeFactory';
import { WebThemeFactory } from '../themes/WebThemeFactory';
import { MobileThemeFactory } from '../themes/MobileThemeFactory';

// Function to create a themed component using any theme factory
function createThemedButton(factory: ThemeFactory, label: string) {
    const colors = factory.createColorPalette();
    const typography = factory.createTypography();
    const spacing = factory.createSpacing();

    console.log(`\nCreating ${label}:`);
    console.log('Colors:', colors);
    console.log('Typography:', typography);
    console.log('Spacing:', spacing);
}

// Create components using different factories
console.log('Theme Factory Example\n');

const webFactory = new WebThemeFactory();
const mobileFactory = new MobileThemeFactory();

createThemedButton(webFactory, 'Web Button');
createThemedButton(mobileFactory, 'Mobile Button');
