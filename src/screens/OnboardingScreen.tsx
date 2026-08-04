import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
  PhoneOff,
  Bell,
  Cpu,
  Undo,
  CreditCard,
  Workflow,
  Gift
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

const slides = [
  {
    id: 1,
    eyebrow: 'CURATED MATRIMONY',
    title: 'Meet Families That Feel Aligned',
    description:
      'Discover verified profiles shaped around values, lifestyle, culture, and long-term intent.',
    image: '/assets/3d/onboarding_1_matches.png',
    badge: 'Verified introductions',
    icon: Heart,
  },
  {
    id: 2,
    eyebrow: 'AI COMPATIBILITY',
    title: 'Match With Deeper Confidence',
    description:
      'Blend family preferences, personality signals, and astro compatibility into one elegant shortlist.',
    image: '/assets/3d/onboarding_2_ai.png',
    badge: '98% refined matching',
    icon: Cpu,
  },
  {
    id: 3,
    eyebrow: 'PRIVATE BY DESIGN',
    title: 'A Safer Space For Serious Connections',
    description:
      'Control visibility, receive trusted invitations, and move forward only when you are ready.',
    image: '/assets/3d/onboarding_3_security.png',
    badge: 'Privacy verified',
    icon: ShieldCheck,
  },
  {
    id: 4,
    eyebrow: 'ETERNITE ADVANTAGES',
    title: 'Take a Look',
    description: '',
    image: '/assets/3d/onboarding_4_features.png',
    badge: 'System Guarantees',
    icon: ShieldCheck,
  },
];

const featureItems = [
  {
    icon: PhoneOff,
    title: 'No Unwanted Calls',
    description: 'We respect your privacy and never make unnecessary phone calls.',
  },
  {
    icon: Bell,
    title: 'Weekly Match Reminders',
    description: 'Receive a gentle reminder every week with your latest match updates.',
  },
  {
    icon: Cpu,
    title: 'Daily AI-Powered Matches',
    description: 'Discover a new AI-recommended profile every day based on your preferences.',
  },
  {
    icon: Undo,
    title: 'Cancel Anytime',
    description: 'You can pause or cancel your membership whenever you choose—no commitments.',
  },
  {
    icon: CreditCard,
    title: 'Affordable Monthly Plans',
    description: 'Choose from flexible monthly subscription plans designed to fit your budget.',
  },
  {
    icon: Workflow,
    title: '100% System-Driven Process',
    description: 'Our matchmaking process is fully automated, ensuring a fair, transparent, and unbiased experience.',
  },
  {
    icon: Gift,
    title: 'Earn Rewards by Referring Friends',
    description: 'Invite your friends and earn ₹200 for every successful referral.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
      return;
    }

    setScreen('login');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: slide.image }} style={styles.bgImage} resizeMode="cover" />
      <View style={styles.darkOverlay} />

      <View style={styles.headerRow}>
        {currentSlide > 0 ? (
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => setCurrentSlide(currentSlide - 1)}
            style={styles.iconButton}
          >
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2.2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButtonPlaceholder} />
        )}

        <View style={styles.brandPill}>
          <Heart size={12} color={COLORS.accentGold} fill={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.brandPillText}>ETERNITE</Text>
        </View>

        <TouchableOpacity activeOpacity={0.82} onPress={() => setScreen('login')} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.contentPanel}>
          <View style={styles.badge}>
            <Icon size={13} color={COLORS.accentGold} strokeWidth={2.1} />
            <Text style={styles.badgeText}>{slide.badge}</Text>
          </View>

          <Text style={styles.eyebrowText}>{slide.eyebrow}</Text>
          <Text style={styles.titleText}>{slide.title}</Text>
          
          {currentSlide === 3 ? (
            <View style={styles.singleColumnCard}>
              {featureItems.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.featureRow,
                      idx === featureItems.length - 1 && { borderBottomWidth: 0 }
                    ]}
                  >
                    <View style={styles.featureIconContainer}>
                      <ItemIcon size={12} color={COLORS.accentGold} strokeWidth={2.2} />
                    </View>
                    <Text style={styles.featureTextFlow}>
                      <Text style={styles.featureTitle}>{item.title} — </Text>
                      <Text style={styles.featureDesc}>{item.description}</Text>
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={styles.descText}>{slide.description}</Text>
          )}
        </View>
      </View>

      <View style={styles.bottomControls}>
        <View style={styles.dotsRow}>
          {slides.map((item, idx) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setCurrentSlide(idx)}
              style={[styles.dot, currentSlide === idx && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.88} onPress={handleNext} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{isLastSlide ? 'Begin Your Love Story' : 'Continue'}</Text>
          <ChevronRight size={18} color={COLORS.primary} strokeWidth={2.6} style={styles.buttonIcon} />
        </TouchableOpacity>

        <Text style={styles.footerNote}>PRIVACY VERIFIED BY INVITATION ONLY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 33, 29, 0.84)', // Premium semi-transparent emerald wash
  },
  headerRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  iconButtonPlaceholder: {
    width: 38,
    height: 38,
  },
  brandPill: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.86)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  brandPillText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    letterSpacing: 2,
  },
  skipButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentGoldLight,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING.sm,
  },

  contentPanel: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badge: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(216, 168, 75, 0.28)',
    marginBottom: SPACING.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accentGoldLight,
  },
  eyebrowText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    letterSpacing: 2.2,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  titleText: {
    ...TYPOGRAPHY.titleXL,
    width: '100%',
    maxWidth: 340,
    fontSize: 31,
    lineHeight: 37,
    letterSpacing: 0,
    textAlign: 'center',
  },
  descText: {
    ...TYPOGRAPHY.body,
    width: '100%',
    maxWidth: 330,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.lightGray,
    marginTop: SPACING.sm,
  },
  singleColumnCard: {
    width: '100%',
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(14, 69, 63, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(216, 168, 75, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  featureIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(216, 168, 75, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(216, 168, 75, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  featureTextFlow: {
    flex: 1,
    lineHeight: 19.5,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accentGoldLight,
  },
  featureDesc: {
    fontSize: 13,
    color: COLORS.lightGray,
  },
  dotsRow: {
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginBottom: SPACING.md,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  dotActive: {
    width: 30,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 340,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.goldGlow,
  },
  bottomControls: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: SPACING.xs,
  },
  primaryButtonText: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: SPACING.sm,
  },
  footerNote: {
    fontSize: 9,
    lineHeight: 13,
    color: COLORS.mutedGray,
    letterSpacing: 1.25,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
