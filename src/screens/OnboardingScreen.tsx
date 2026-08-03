import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, Sparkles, Shield, Heart, ArrowLeft } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Curated Genuine Matches',
      subtitle: 'VERIFIED GLOBAL ELITE',
      description: 'Connect with accomplished individuals across London, NYC, Paris, Dubai, and Mumbai.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      badge: 'Bespoke Matchmaking',
      icon: Heart
    },
    {
      id: 2,
      title: 'AI Soulmate Compatibility',
      subtitle: '36-GUNA ASTRO & VALUES SYNC',
      description: 'Our proprietary algorithm harmonizes core life values, career ambitions, and Vedic charts.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      badge: '98% Match Precision',
      icon: Sparkles
    },
    {
      id: 3,
      title: 'Uncompromised Trust & Privacy',
      subtitle: '256-BIT ENCRYPTED SHIELD',
      description: 'Enjoy Incognito mode, family-verified access shields, and confidential video invitations.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      badge: 'Unmatched Privacy',
      icon: Shield
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setScreen('login');
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <View style={styles.container}>
      {/* Top Header Controls */}
      <View style={styles.headerRow}>
        {currentSlide > 0 ? (
          <TouchableOpacity onPress={() => setCurrentSlide(currentSlide - 1)} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtnEmpty} />
        )}

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      {/* Centered Slide Content */}
      <View style={styles.centerContent}>
        <View style={styles.imageCard}>
          <Image source={{ uri: slide.image }} style={styles.slideImage} resizeMode="cover" />
          <View style={styles.badge}>
            <Icon size={12} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.badgeText}>{slide.badge}</Text>
          </View>
        </View>

        <Text style={styles.subtitleText}>{slide.subtitle}</Text>
        <Text style={styles.titleText}>{slide.title}</Text>
        <Text style={styles.descText}>{slide.description}</Text>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footerContainer}>
        <View style={styles.dotsRow}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentSlide === idx && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={handleNext} style={styles.nextBtn}>
          <Text style={styles.nextText}>
            {currentSlide === slides.length - 1 ? 'Enter Éternité' : 'Continue'}
          </Text>
          <ChevronRight size={18} color={COLORS.primary} strokeWidth={2.5} style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justify: 'space-between',
    padding: SPACING.lg,
  },
  headerRow: {
    width: '100%',
    paddingTop: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    zIndex: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(14, 69, 63, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justify: 'center',
  },
  backBtnEmpty: {
    width: 36,
  },
  skipText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 11,
  },
  centerContent: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    justify: 'center',
  },
  imageCard: {
    width: 250,
    height: 250,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.darkGlassBorder,
    backgroundColor: COLORS.secondary,
    position: 'relative',
    marginBottom: SPACING.md,
    ...SHADOWS.soft,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(7, 47, 43, 0.85)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  subtitleText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    textAlign: 'center',
  },
  titleText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    marginTop: 4,
    textAlign: 'center',
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: SPACING.xs,
    maxWidth: 290,
  },
  footerContainer: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: SPACING.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: 28,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  nextBtn: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    paddingHorizontal: 24,
    ...SHADOWS.goldGlow,
  },
  nextText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
  btnIcon: {
    marginLeft: 8,
  },
});
