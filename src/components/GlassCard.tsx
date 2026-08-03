import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme/tokens';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
  borderGold?: boolean;
  onClick?: () => void;
  padding?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  glow = false,
  borderGold = true,
  onClick,
  padding = SPACING.lg, // 24px default padding
}) => {
  const containerStyle: ViewStyle = {
    borderRadius: RADIUS.lg,
    padding: padding,
    backgroundColor: COLORS.darkGlass,
    borderWidth: 1,
    borderColor: glow
      ? COLORS.accentGold
      : borderGold
      ? COLORS.darkGlassBorder
      : 'rgba(255, 255, 255, 0.12)',
    ...(glow ? SHADOWS.goldGlow : SHADOWS.soft),
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  if (onClick) {
    return (
      <TouchableOpacity activeOpacity={0.88} onPress={onClick} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};
