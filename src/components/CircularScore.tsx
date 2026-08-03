import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface CircularScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  size = 90,
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
            <Sparkles size={14} color="#D6A24A" />
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
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: '#0E453F',
    borderWidth: 4,
    borderColor: '#D6A24A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D6A24A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  scoreText: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  matchSubtext: {
    fontSize: 8,
    color: '#D6A24A',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 1,
  },
  labelText: {
    marginTop: 6,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
});
