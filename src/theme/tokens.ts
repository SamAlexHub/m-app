import { TextStyle, ViewStyle } from 'react-native';

export const COLORS = {
  primary: '#F3EEFA',        // Light Ethereal Lavender Backdrop
  secondary: '#FFFFFF',      // Pure White Glass Cards & Containers
  accentGold: '#6D28D9',     // Rich Royal Violet Primary Accent (#6D28D9)
  accentGoldDark: '#5B21B6', // Deep Velvet Violet for active buttons
  accentGoldLight: '#F3E8FF',// Soft Light Lavender Pill Highlight
  white: '#FFFFFF',          // Pure White
  darkText: '#1E152A',      // Crisp Dark Royal Plum (100% Legibility on light backdrops)
  lightGray: '#4C3D65',      // Rich Slate Violet Subtitle Text
  mutedGray: '#5C4E75',      // Visible Slate Label Text
  placeholderGray: '#8B7F9E',// Visible Placeholder Gray-Violet
  darkGlass: 'rgba(255, 255, 255, 0.94)',
  darkGlassBorder: 'rgba(109, 40, 217, 0.2)',
  goldGlow: 'rgba(109, 40, 217, 0.3)',
  cardBg: '#FFFFFF',
  redAccent: '#DC2626',
  greenSuccess: '#059669',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  gridUnit: 8,
};

export const RADIUS = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const SHADOWS = {
  soft: {
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  } as ViewStyle,
  goldGlow: {
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  } as ViewStyle,
};

export const TYPOGRAPHY = {
  titleXL: {
    fontFamily: 'serif',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#1E152A',
    letterSpacing: -0.5,
  } as TextStyle,
  titleL: {
    fontFamily: 'serif',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#1E152A',
    letterSpacing: -0.3,
  } as TextStyle,
  titleM: {
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: '#1E152A',
  } as TextStyle,
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
    color: '#6D28D9',
    letterSpacing: 1.2,
  } as TextStyle,
  body: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#4C3D65',
  } as TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#5C4E75',
  } as TextStyle,
};


