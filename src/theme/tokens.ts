import { TextStyle, ViewStyle } from 'react-native';

export const COLORS = {
  primary: '#072F2B',        // Primary Deep Emerald
  secondary: '#0E453F',      // Secondary Emerald Container
  accentGold: '#D8A84B',     // Royal Gold Accent
  accentGoldDark: '#B88432', // Darker Gold for Gradients
  accentGoldLight: '#F8E8CD',// Light Gold Champagne
  white: '#FFFFFF',          // Pure White
  lightGray: '#E5E7EB',      // Soft Light Gray
  mutedGray: '#9CA3AF',      // Muted Secondary Text
  darkGlass: 'rgba(14, 69, 63, 0.75)',
  darkGlassBorder: 'rgba(216, 168, 75, 0.35)',
  goldGlow: 'rgba(216, 168, 75, 0.35)',
  cardBg: '#0E453F',
  redAccent: '#EF4444',
  greenSuccess: '#10B981',
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  } as ViewStyle,
  goldGlow: {
    shadowColor: '#D8A84B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  } as ViewStyle,
};

export const TYPOGRAPHY = {
  titleXL: {
    fontFamily: 'serif',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: -0.5,
  } as TextStyle,
  titleL: {
    fontFamily: 'serif',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: -0.3,
  } as TextStyle,
  titleM: {
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: COLORS.white,
  } as TextStyle,
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    letterSpacing: 1.5,
  } as TextStyle,
  body: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: COLORS.lightGray,
  } as TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: COLORS.mutedGray,
  } as TextStyle,
};
