import { TextStyle, ViewStyle } from 'react-native';

export const COLORS = {
  primary: '#FFFFFF',        // Pure White Primary Background
  secondary: '#F9FAFB',      // Light Slate Container / Surface
  accentGold: '#C57D3E',     // Warm Copper Gold Accent
  accentGoldDark: '#B87333', // Darker Copper Gold
  accentGoldLight: '#FAF5EF',// Soft Off-white / Cream
  bgLinen: '#FFFFFF',        // Pure White Background
  emeraldDark: '#1F2937',    // Dark Gray Text / Element replacing dark emerald
  copperGold: '#C57D3E',     // Copper Gold Accent
  textDark: '#111827',       // Dark High-Contrast Text
  textMuted: '#6B7280',      // Soft Muted Text
  white: '#FFFFFF',          // Pure White
  lightGray: '#F3F4F6',      // Light Border/Card Fill
  mutedGray: '#9CA3AF',      // Muted Secondary Text
  darkGlass: 'rgba(255, 255, 255, 0.95)',
  darkGlassBorder: 'rgba(229, 231, 235, 0.8)',
  goldGlow: 'rgba(197, 125, 62, 0.25)',
  cardBg: '#FFFFFF',
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
    color: COLORS.textDark,
    letterSpacing: -0.5,
  } as TextStyle,
  titleL: {
    fontFamily: 'serif',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  } as TextStyle,
  titleM: {
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: COLORS.textDark,
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
    color: COLORS.textMuted,
  } as TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: COLORS.mutedGray,
  } as TextStyle,
};
