interface Spacing {
  borderRadius: number;
  layoutPaddingH: number;
  containerPaddingV: number;
  cardMarginB: number;
}

interface TypeSizes {
  FONT_SIZE_SMALL: number;
  FONT_SIZE_MEDIUM: number;
  FONT_SIZE_LARGE: number;
  FONT_WEIGHT_LIGHT: number;
  FONT_WEIGHT_MEDIUM: number;
  FONT_WEIGHT_HEAVY: number;
}

export const colors = {
  primary: '#bb873e',
  secondary: '#f6e5d4',
  grey: '#acacac',
  gray: '#5f5f5f',
  darkGray: '#4d4d4d',
  lightGray: '#9b9b9b',
  white: '#ffffff',
  blue: '#5A81F7',
  bluish: '#F1F1F7',
  black: '#000000',
  green: '#6DD0A3',
  yellow: '#ffc247',
  error: '#B00020',
  accent: '#0071ff',
};

export interface ThemeTokens {
  name: 'light' | 'dark';
  color: string;
  primary: string;
  layoutBg: string;
  cardBg: string;
  cardBorderColor: string;
  accent: string;
  error: string;
}

interface Themes {
  light: ThemeTokens;
  dark: ThemeTokens;
}

export const spacing: Spacing = {
  borderRadius: 16,
  layoutPaddingH: 16,
  containerPaddingV: 22,
  cardMarginB: 16,
};

export const typeSizes: TypeSizes = {
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_SMALL: 12,
  FONT_WEIGHT_LIGHT: 200,
  FONT_WEIGHT_MEDIUM: 600,
  FONT_WEIGHT_HEAVY: 700,
};

export const typeVariants = {
  titleLarge: {
    fontFamily: 'Lato-Bold',
    fontSize: typeSizes.FONT_SIZE_LARGE,
  },
  titleSmall: {
    fontFamily: 'Lato-Bold',
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
  bodyMedium: {
    fontFamily: 'Lato-Regular',
    fontSize: typeSizes.FONT_SIZE_MEDIUM,
  },
  bodySmall: {
    fontFamily: 'Lato-Regular',
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
};

export const themes: Themes = {
  light: {
    name: 'light',
    color: '#695D5D',
    primary: colors.primary,
    layoutBg: '#e0eeec',
    cardBg: '#ffffff',
    cardBorderColor: '#EEECEC',
    accent: colors.accent,
    error: colors.error,
  },
  dark: {
    name: 'dark',
    color: '#ffffff',
    primary: colors.primary,
    layoutBg: '#121212',
    cardBg: '#1e1e1e',
    cardBorderColor: '#1A1A1A',
    accent: colors.accent,
    error: colors.error,
  },
};

/** @deprecated Use ThemeTokens */
export type themeType = ThemeTokens;
