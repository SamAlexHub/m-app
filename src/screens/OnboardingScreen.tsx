import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronRight, Sparkles, Shield, Heart, ArrowLeft, Globe } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Curated Genuine Matches',
      accentWord: 'Genuine',
      subtitle: 'VERIFIED GLOBAL ELITE',
      description: 'Connect with accomplished individuals across London, NYC, Paris, Dubai, and Mumbai.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      badge: 'Bespoke Matchmaking',
      icon: Heart
    },
    {
      id: 2,
      title: 'AI Soulmate Compatibility',
      accentWord: 'Compatibility',
      subtitle: '36-GUNA ASTRO & VALUES SYNC',
      description: 'Our proprietary algorithm harmonizes core life values, career ambitions, and Vedic charts.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      badge: '98% Match Precision',
      icon: Sparkles
    },
    {
      id: 3,
      title: 'Uncompromised Trust & Privacy',
      accentWord: 'Privacy',
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
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.cardModal}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          {currentSlide > 0 ? (
            <TouchableOpacity onPress={() => setCurrentSlide(currentSlide - 1)} style={styles.backBtn}>
              <ArrowLeft size={16} color={COLORS.white} strokeWidth={2} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backBtnEmpty} />
          )}

          <TouchableOpacity onPress={() => setScreen('login')}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Artwork */}
        <View style={styles.heroWrapper}>
          <Image source={{ uri: slide.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <View style={styles.badge}>
            <Icon size={12} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.badgeText}>{slide.badge}</Text>
          </View>
        </View>

        {/* Content Details */}
        <View style={styles.contentBody}>
          <Text style={styles.subtitleText}>{slide.subtitle}</Text>
          
          <Text style={styles.titleText}>
            {slide.title.replace(slide.accentWord, '')}
            <Text style={styles.titleAccent}>{slide.accentWord}</Text>
          </Text>

          <Text style={styles.descText}>{slide.description}</Text>

          {/* Dots Carousel Indicator */}
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

          {/* Action Row matching 2nd screenshot layout (Google + Apple + Primary Action) */}
          <View style={styles.actionRow}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setScreen('login')} style={styles.socialBtn}>
              <Text style={styles.socialIconText}>G</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => setScreen('login')} style={styles.socialBtn}>
              <Text style={styles.socialIconText}></Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} onPress={handleNext} style={styles.primaryCtaBtn}>
              <Text style={styles.primaryCtaText}>
                {currentSlide === slides.length - 1 ? 'Create Account' : 'Continue'}
              </Text>
              <ChevronRight size={16} color={COLORS.primary} strokeWidth={2.5} style={styles.btnIcon} />
            </TouchableOpacity>
          </View>

          {/* Bottom Direct Login Link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginSubtext}>Already have an account? </Text>
            <TouchableOpacity onPress={() => setScreen('login')}>
              <Text style={styles.loginLinkText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justify: 'center',
    padding: SPACING.md,
  },
  cardModal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.secondary,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    padding: SPACING.md,
    ...SHADOWS.soft,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: SPACING.xs,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(7, 47, 43, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justify: 'center',
  },
  backBtnEmpty: {
    width: 32,
  },
  skipText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  heroWrapper: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    marginBottom: SPACING.md,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.25)',
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
  contentBody: {
    alignItems: 'center',
  },
  subtitleText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  titleText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    marginTop: 4,
    textAlign: 'center',
  },
  titleAccent: {
    color: COLORS.accentGold,
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: SPACING.xs,
    maxWidth: 310,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: SPACING.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  socialBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justify: 'center',
  },
  socialIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  primaryCtaBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    paddingHorizontal: 16,
    ...SHADOWS.goldGlow,
  },
  primaryCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
  btnIcon: {
    marginLeft: 6,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    marginTop: SPACING.md,
  },
  loginSubtext: {
    fontSize: 11,
    color: COLORS.mutedGray,
  },
  loginLinkText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.white,
    textDecorationLine: 'underline',
  },
});
