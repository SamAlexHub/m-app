import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
  borderGold?: boolean;
  onClick?: () => void;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  glow = false,
  borderGold = true,
  onClick,
}) => {
  const containerStyle: ViewStyle = {
    borderRadius: 24,
    padding: 20,
    backgroundColor: 'rgba(14, 69, 63, 0.75)',
    borderWidth: 1,
    borderColor: glow
      ? 'rgba(214, 162, 74, 0.8)'
      : borderGold
      ? 'rgba(214, 162, 74, 0.3)'
      : 'rgba(255, 255, 255, 0.1)',
    shadowColor: glow ? '#D6A24A' : '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: glow ? 0.4 : 0.3,
    shadowRadius: 15,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  if (onClick) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onClick} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};
