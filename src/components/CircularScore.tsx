import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

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
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <Sparkles size={14} color={COLORS.accentGold} />
            <Text style={styles.scoreText}>{score}%</Text>
          </View>
          <Text style={styles.matchSubtext}>MATCH</Text>
        </View>
      </View>
      {label ? <Text style={styles.labelText}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justify: 'center',
  },
  circle: {
    backgroundColor: COLORS.secondary,
    borderWidth: 3.5,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
    ...SHADOWS.goldGlow,
  },
  content: {
    alignItems: 'center',
    justify: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  matchSubtext: {
    fontSize: 9,
    color: COLORS.accentGold,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  labelText: {
    marginTop: SPACING.sm,
    fontSize: 11,
    color: COLORS.mutedGray,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
