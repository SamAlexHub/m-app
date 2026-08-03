import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  G,
  Ellipse,
} from 'react-native-svg';
import { COLORS } from '../theme/tokens';

interface IllustrationProps {
  slideId: number;
}

// Helper to draw a 4-point luxury sparkle star
const Sparkle: React.FC<{ x: number; y: number; r: number; opacity?: number }> = ({
  x,
  y,
  r,
  opacity = 0.8,
}) => {
  // Path for 4-point star
  const path = `M ${x} ${y - r} Q ${x} ${y} ${x + r} ${y} Q ${x} ${y} ${x} ${y + r} Q ${x} ${y} ${x - r} ${y} Q ${x} ${y} ${x} ${y - r}`;
  return <Path d={path} fill="url(#goldGradient)" opacity={opacity} />;
};

export const OnboardingIllustration: React.FC<IllustrationProps> = ({ slideId }) => {
  const width = 320;
  const height = 280;

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          {/* Main Gold Gradient */}
          <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#F8E8CD" />
            <Stop offset="30%" stopColor="#E5B869" />
            <Stop offset="70%" stopColor="#B88432" />
            <Stop offset="100%" stopColor="#D8A84B" />
          </LinearGradient>

          {/* Glowing Radial Gold Gradient */}
          <RadialGradient id="goldRadial" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="rgba(216, 168, 75, 0.25)" />
            <Stop offset="60%" stopColor="rgba(216, 168, 75, 0.05)" />
            <Stop offset="100%" stopColor="rgba(216, 168, 75, 0)" />
          </RadialGradient>

          {/* Glow for connections */}
          <LinearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="rgba(216, 168, 75, 0.6)" />
            <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </LinearGradient>
        </Defs>

        {/* Global background glow */}
        <Circle cx={width / 2} cy={height / 2} r={110} fill="url(#goldRadial)" />

        {/* Slide 1: Curated Matrimony / Family Alignment (Intertwined Luxury Rings & Hearts) */}
        {slideId === 1 && (
          <G>
            {/* Background floating sparkles */}
            <Sparkle x={70} y={70} r={8} opacity={0.5} />
            <Sparkle x={250} y={80} r={12} opacity={0.6} />
            <Sparkle x={80} y={210} r={10} opacity={0.4} />
            <Sparkle x={240} y={200} r={7} opacity={0.5} />

            {/* Glowing rings path */}
            {/* Left Ring */}
            <Ellipse
              cx={130}
              cy={140}
              rx={55}
              ry={40}
              transform="rotate(-15, 130, 140)"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth={5}
              opacity={0.85}
            />

            {/* Right Ring */}
            <Ellipse
              cx={185}
              cy={145}
              rx={55}
              ry={40}
              transform="rotate(15, 185, 145)"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth={5}
              opacity={0.95}
            />

            {/* Interlacing Overlap Arc to make them look intertwined */}
            <Path
              d="M 148.5 125 A 55 40 0 0 1 180 151"
              transform="rotate(-15, 130, 140)"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth={5.1}
            />

            {/* Central Heart of Union floating above */}
            <Path
              d="M 160 95 C 160 95 145 78 135 88 C 125 98 145 120 160 132 C 175 120 195 98 185 88 C 175 78 160 95 160 95 Z"
              fill="url(#goldGradient)"
              opacity={0.9}
            />
            
            {/* Sparkles on the rings */}
            <Sparkle x={160} y={92} r={6} />
            <Sparkle x={110} y={120} r={5} />
            <Sparkle x={215} y={135} r={5} />
          </G>
        )}

        {/* Slide 2: AI Compatibility (Constellation Heart with Connection Nodes) */}
        {slideId === 2 && (
          <G>
            {/* Background star sparkles */}
            <Sparkle x={60} y={90} r={7} opacity={0.4} />
            <Sparkle x={260} y={100} r={8} opacity={0.4} />
            <Sparkle x={90} y={220} r={6} opacity={0.3} />
            <Sparkle x={230} y={220} r={7} opacity={0.4} />

            {/* Compatibility orbits / rings */}
            <Circle
              cx={160}
              cy={135}
              r={95}
              fill="none"
              stroke="url(#glowLine)"
              strokeWidth={1}
              strokeDasharray="4 6"
              opacity={0.3}
            />
            <Circle
              cx={160}
              cy={135}
              r={70}
              fill="none"
              stroke="url(#glowLine)"
              strokeWidth={1}
              strokeDasharray="5 4"
              opacity={0.4}
            />

            {/* Neural network lines */}
            {/* Center to outer nodes */}
            <Path d="M 160 135 L 85 95" stroke="url(#goldGradient)" strokeWidth={1.2} opacity={0.6} />
            <Path d="M 160 135 L 235 95" stroke="url(#goldGradient)" strokeWidth={1.2} opacity={0.6} />
            <Path d="M 160 135 L 105 185" stroke="url(#goldGradient)" strokeWidth={1.2} opacity={0.5} />
            <Path d="M 160 135 L 215 185" stroke="url(#goldGradient)" strokeWidth={1.2} opacity={0.5} />
            <Path d="M 160 135 L 160 65" stroke="url(#goldGradient)" strokeWidth={1.5} opacity={0.7} />

            {/* Constellation Nodes */}
            <Circle cx={85} cy={95} r={5} fill="url(#goldGradient)" />
            <Circle cx={235} cy={95} r={5} fill="url(#goldGradient)" />
            <Circle cx={105} cy={185} r={4} fill="url(#goldGradient)" />
            <Circle cx={215} cy={185} r={4} fill="url(#goldGradient)" />
            <Circle cx={160} cy={65} r={6} fill="url(#goldGradient)" />

            {/* Sub-node lines */}
            <Path d="M 85 95 L 60 120" stroke="url(#glowLine)" strokeWidth={1} opacity={0.4} />
            <Path d="M 235 95 L 260 120" stroke="url(#glowLine)" strokeWidth={1} opacity={0.4} />
            <Circle cx={60} cy={120} r={2.5} fill="#F8E8CD" opacity={0.7} />
            <Circle cx={260} cy={120} r={2.5} fill="#F8E8CD" opacity={0.7} />

            {/* Central Glowing AI Heart */}
            <Path
              d="M 160 150 C 160 150 135 120 120 133 C 105 147 135 180 160 200 C 185 180 215 147 200 133 C 185 120 160 150 160 150 Z"
              fill="url(#goldGradient)"
              opacity={0.95}
              transform="scale(0.8) translate(40, 20)"
            />

            {/* Center glowing orb */}
            <Circle cx={160} cy={135} r={12} fill="url(#goldGradient)" />
            <Circle cx={160} cy={135} r={6} fill={COLORS.primary} />
            
            {/* Sparkles for compatibility success */}
            <Sparkle x={160} y={135} r={8} />
            <Sparkle x={145} y={115} r={4} />
            <Sparkle x={175} y={155} r={4} />
          </G>
        )}

        {/* Slide 3: Private by Design (Luxury Key and Safe Lock Shield) */}
        {slideId === 3 && (
          <G>
            {/* Background sparkles */}
            <Sparkle x={80} y={80} r={6} opacity={0.4} />
            <Sparkle x={240} y={70} r={9} opacity={0.5} />
            <Sparkle x={70} y={190} r={8} opacity={0.4} />
            <Sparkle x={250} y={190} r={6} opacity={0.5} />

            {/* Glass-like Security Shield */}
            <Path
              d="M 115 105 C 115 105 160 90 160 90 C 160 90 205 105 205 105 C 205 105 205 160 160 195 C 115 160 115 105 115 105 Z"
              fill="rgba(14, 69, 63, 0.45)"
              stroke="url(#goldGradient)"
              strokeWidth={3}
              opacity={0.9}
            />

            {/* Inner Shield Line */}
            <Path
              d="M 125 117 C 125 117 160 105 160 105 C 160 105 195 117 195 117 C 195 117 195 155 160 183 C 125 155 125 117 125 117 Z"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth={1}
              strokeDasharray="3 3"
              opacity={0.6}
            />

            {/* Luxury Key (diagonally crossing shield) */}
            <G transform="rotate(-30, 160, 140)">
              {/* Key Bow (Heart shaped handle) */}
              <Path
                d="M 160 95 C 160 95 150 82 142 90 C 134 98 148 112 160 122 C 172 112 186 98 178 90 C 170 82 160 95 160 95 Z"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth={4.5}
              />
              <Circle cx={160} cy={102} r={4} fill="url(#goldGradient)" />

              {/* Key Shaft */}
              <Path
                d="M 160 120 L 160 180"
                stroke="url(#goldGradient)"
                strokeWidth={5}
                strokeLinecap="round"
              />

              {/* Key Bit (Teeth in heart outline or classic shape) */}
              <Path
                d="M 160 162 L 172 162 L 172 169 L 160 169 M 160 171 L 172 171 L 172 178 L 160 178"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth={3}
                strokeLinejoin="round"
              />
            </G>

            {/* Sparkles around key/lock */}
            <Sparkle x={132} y={115} r={7} />
            <Sparkle x={185} y={165} r={5} />
          </G>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
