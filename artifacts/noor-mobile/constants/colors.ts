/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#143A37',
    tint: '#1F6B61',
    background: '#F5F3EE',
    foreground: '#143A37',
    card: '#FFFCF7',
    cardForeground: '#143A37',
    primary: '#1F6B61',
    primaryForeground: '#FFFDF8',
    secondary: '#E7EEE8',
    secondaryForeground: '#1F5149',
    muted: '#EDEAE3',
    mutedForeground: '#6E7C76',
    accent: '#D6B779',
    accentForeground: '#4C3A1F',
    destructive: '#B85B52',
    destructiveForeground: '#FFFDF8',
    border: '#DEDCD3',
    input: '#D8D8CD',
    success: '#477A61',
    sand: '#EFE4D1',
  },
  dark: {
    text: '#F3F1E9',
    tint: '#9AC9B7',
    background: '#102522',
    foreground: '#F3F1E9',
    card: '#18332F',
    cardForeground: '#F3F1E9',
    primary: '#9AC9B7',
    primaryForeground: '#102522',
    secondary: '#21413A',
    secondaryForeground: '#D9EEE2',
    muted: '#1E3934',
    mutedForeground: '#A7BDB2',
    accent: '#D6B779',
    accentForeground: '#332815',
    destructive: '#E58B80',
    destructiveForeground: '#24110F',
    border: '#2D4A43',
    input: '#35534A',
    success: '#8CC8A6',
    sand: '#3E3728',
  },
  radius: 18,
};

export default colors;
