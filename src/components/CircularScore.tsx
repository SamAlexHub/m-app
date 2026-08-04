import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../theme/tokens';

interface CircularScoreProps {
  score: number;
  size?: number;
  label?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  size = 96,
  label = 'AI Soulmate Match',
}) => {
  const isSmall = size < 75;
  
  // Calculate dynamic font sizing to keep text enclosed in small circles
  const scoreFontSize = isSmall ? Math.round(size * 0.25) : 22; // For size 64: 16px
  const matchFontSize = isSmall ? Math.round(size * 0.12) : 9;   // For size 64: 8px
  const borderWidth = isSmall ? 2.5 : 3.5;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: borderWidth,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={[styles.scoreText, { fontSize: scoreFontSize }]}>{score}%</Text>
          </View>
          <Text style={[styles.matchSubtext, { fontSize: matchFontSize, marginTop: isSmall ? 1 : 2 }]}>MATCH</Text>
        </View>
      </View>
      {label ? <Text style={styles.labelText}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.goldGlow,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  matchSubtext: {
    color: COLORS.accentGold,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  labelText: {
    marginTop: SPACING.sm,
    fontSize: 11,
    color: COLORS.mutedGray,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
