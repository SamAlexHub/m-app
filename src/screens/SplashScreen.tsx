import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Sparkles, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' }}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.darkOverlay} />

      {/* Top Tagline */}
      <View style={styles.topContainer}>
        <View style={styles.badge}>
          <Sparkles size={12} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.badgeText}>THE APPLE OF LUXURY MATRIMONY</Text>
        </View>
      </View>

      {/* Center Logo & Title */}
      <View style={styles.centerContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setScreen('onboarding')}
          style={styles.logoCircle}
        >
          <Heart size={44} color={COLORS.accentGold} fill="rgba(216, 168, 75, 0.2)" strokeWidth={1.8} />
        </TouchableOpacity>

        <Text style={styles.titleText}>ÉTERNITÉ</Text>
        <Text style={styles.subtitleText}>HAUTE MATRIMONIE • INTERNATIONAL</Text>

        <Text style={styles.descText}>
          Where love, family values, and timeless elegance unite across global horizons.
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setScreen('onboarding')}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>Begin Your Love Story</Text>
          <ChevronRight size={18} color={COLORS.primary} strokeWidth={2.2} />
        </TouchableOpacity>

        <Text style={styles.footerNote}>PRIVACY & TRUST VERIFIED • BY INVITATION ONLY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justify: 'space-between',
    padding: SPACING.lg,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.75)',
  },
  topContainer: {
    paddingTop: SPACING.md,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  badgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  centerContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
    ...SHADOWS.goldGlow,
  },
  titleText: {
    ...TYPOGRAPHY.titleXL,
    fontSize: 42,
    lineHeight: 48,
    marginTop: SPACING.lg,
    letterSpacing: 2,
  },
  subtitleText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 3,
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    textAlign: 'center',
    marginTop: SPACING.md,
    maxWidth: 280,
  },
  bottomContainer: {
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: SPACING.sm,
    ...SHADOWS.goldGlow,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footerNote: {
    fontSize: 9,
    color: COLORS.mutedGray,
    marginTop: SPACING.md,
    letterSpacing: 1,
  },
});
