import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
  PhoneOff,
  Bell,
  Cpu,
  Sparkles,
  Award,
  Lock,
  UserCheck,
  Stars
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

// Bundled Expo Assets for 3D Pixar AI Couples
import onboarding1Img from '../../assets/3d/onboarding_1_matches.png';
import onboarding2Img from '../../assets/3d/onboarding_2_ai.png';
import onboarding3Img from '../../assets/3d/onboarding_3_security.png';

const slides = [
  {
    id: 1,
    stepLabel: '1 of 3',
    eyebrow: 'CURATED MATRIMONY',
    title: 'Meet Someone Who Shares Your Values',
    subtitle: 'Verified Introductions & Cultural Alignment',
    description:
      'Discover hand-selected profiles shaped around family values, culture, education, lifestyle, and genuine long-term intent.',
    image: onboarding1Img,
    badge: 'Verified Introductions',
    icon: Heart,
    buttonText: 'Continue',
    theme: {
      bg: '#0B0818',
      cardBg: '#15122B',
      cardBorder: 'rgba(235, 174, 107, 0.35)',
      accent: '#EBAE6B',
      accentLight: '#FDF1E2',
      badgeBg: 'rgba(235, 174, 107, 0.18)',
    },
    highlights: [
      { text: '98% Family Alignment', icon: Sparkles },
      { text: 'Background Verified', icon: UserCheck },
      { text: 'Global & NRI Elite', icon: Award },
    ]
  },
  {
    id: 2,
    stepLabel: '2 of 3',
    eyebrow: 'SMART AI COMPATIBILITY',
    title: 'Match With AI Precision & Astro Insight',
    subtitle: 'Horoscope Synastry & AI Matchmaking',
    description:
      'Blend family preferences, personality signals, career goals, and horoscope synastry into your refined daily shortlist.',
    image: onboarding2Img,
    badge: 'AI Synastry Engine',
    icon: Cpu,
    buttonText: 'Continue',
    theme: {
      bg: '#100A1A',
      cardBg: '#1B132B',
      cardBorder: 'rgba(248, 195, 96, 0.38)',
      accent: '#F8C360',
      accentLight: '#FFF6E5',
      badgeBg: 'rgba(248, 195, 96, 0.2)',
    },
    highlights: [
      { text: '36/36 Horoscope Score', icon: Stars },
      { text: 'AI Personality Match', icon: Cpu },
      { text: 'Personalized Cards', icon: Heart },
    ]
  },
  {
    id: 3,
    stepLabel: '3 of 3',
    eyebrow: 'PRIVACY BY DESIGN',
    title: '100% Private, Safe & Dignified Space',
    subtitle: 'Zero Unwanted Calls & System Guarantees',
    description:
      'Maintain full control of your visibility, receive trusted invitations, and connect with complete security and peace of mind.',
    image: onboarding3Img,
    badge: 'Privacy Shield Verified',
    icon: ShieldCheck,
    buttonText: 'Get Started',
    theme: {
      bg: '#140C12',
      cardBg: '#20141D',
      cardBorder: 'rgba(245, 203, 114, 0.35)',
      accent: '#F5CB72',
      accentLight: '#FFF8E7',
      badgeBg: 'rgba(245, 203, 114, 0.18)',
    },
    highlights: [
      { text: 'Zero Unwanted Calls', icon: PhoneOff },
      { text: 'Weekly Digest & Updates', icon: Bell },
      { text: 'Full Photo Privacy', icon: Lock },
    ]
  },
];

const guarantees = [
  { icon: PhoneOff, title: 'No Unwanted Calls', desc: 'Strict privacy control—we never share your number without permission.' },
  { icon: Bell, title: 'Weekly Match Digest', desc: 'Receive curated match notifications delivered straight to you.' },
  { icon: Cpu, title: 'Daily AI Recommendations', desc: 'Fresh AI-scored profiles tailored specifically to your family criteria.' },
  { icon: Lock, title: 'Full Photo Privacy', desc: 'You decide who can view your photo gallery and contact details.' },
];

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const theme = slide.theme;
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
      return;
    }
    setScreen('login');
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setScreen('splash');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Upper 3D Couple Image Artwork Section */}
      <View style={[styles.artworkContainer, { backgroundColor: theme.bg }]}>
        <Image
          source={slide.image}
          style={styles.artworkImage}
          resizeMode="cover"
        />
        {/* Transparent overlay */}
        <View style={styles.artworkOverlay} />

        {/* Floating Top Navigation Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={handleBack}
            style={styles.iconButton}
          >
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2.2} />
          </TouchableOpacity>

          <View style={[styles.brandPill, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
            <Heart size={12} color={theme.accent} fill={theme.accent} />
            <Text style={[styles.brandPillText, { color: theme.accent }]}>EVERVOW • {slide.stepLabel}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.82} onPress={() => setScreen('login')} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: theme.accentLight }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lower Card Content Section (Matching Modern Reference Layout) */}
      <View style={[styles.bottomCardContainer, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
        <ScrollView
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Pill Progress Bar */}
          <View style={styles.progressBarRow}>
            {slides.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => setCurrentSlide(idx)}
                style={styles.barTouchable}
              >
                <View
                  style={[
                    styles.barSegment,
                    currentSlide === idx && [styles.barSegmentActive, { backgroundColor: theme.accent }],
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Badge & Category Pill */}
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: theme.badgeBg, borderColor: theme.cardBorder }]}>
              <Icon size={13} color={theme.accent} strokeWidth={2.2} />
              <Text style={[styles.badgeText, { color: theme.accentLight }]}>{slide.badge}</Text>
            </View>
          </View>

          {/* Headline Title & Description */}
          <Text style={styles.titleText}>{slide.title}</Text>
          <Text style={styles.descText}>{slide.description}</Text>

          {/* Micro Highlight Pills */}
          <View style={styles.highlightsContainer}>
            {slide.highlights.map((h, idx) => {
              const HIcon = h.icon;
              return (
                <View key={idx} style={[styles.highlightPill, { borderColor: theme.cardBorder }]}>
                  <HIcon size={12} color={theme.accent} />
                  <Text style={[styles.highlightText, { color: theme.accentLight }]}>{h.text}</Text>
                </View>
              );
            })}
          </View>

          {/* Extra Guarantees list on 3rd Screen */}
          {isLastSlide && (
            <View style={[styles.guaranteesCard, { borderColor: theme.cardBorder }]}>
              <Text style={[styles.guaranteeHeading, { color: theme.accent }]}>EVERVOW SYSTEM GUARANTEES</Text>
              <View style={styles.guaranteesGrid}>
                {guarantees.map((item, idx) => {
                  const GIcon = item.icon;
                  return (
                    <View key={idx} style={styles.guaranteeRow}>
                      <View style={[styles.guaranteeIconCircle, { backgroundColor: theme.badgeBg }]}>
                        <GIcon size={12} color={theme.accent} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.guaranteeTitle, { color: theme.accentLight }]}>{item.title}</Text>
                        <Text style={styles.guaranteeDesc}>{item.desc}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Spacer */}
          <View style={{ height: 16 }} />
        </ScrollView>

        {/* Bottom CTA Action Bar */}
        <View style={styles.bottomCtaBar}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleNext}
            style={[styles.primaryButton, { backgroundColor: theme.accent }]}
          >
            <Text style={styles.primaryButtonText}>{slide.buttonText}</Text>
            <ChevronRight size={18} color="#0B0818" strokeWidth={2.8} style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => setScreen('login')} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              Already registered? <Text style={[styles.loginLinkBold, { color: theme.accent }]}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artworkContainer: {
    height: '52%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  artworkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerRow: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  brandPill: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  brandPillText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9.5,
    letterSpacing: 1.8,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  skipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomCardContainer: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    marginTop: -24,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    ...SHADOWS.soft,
    justifyContent: 'space-between',
  },
  scrollInner: {
    flexGrow: 1,
  },
  progressBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  barTouchable: {
    paddingVertical: 4,
  },
  barSegment: {
    width: 14,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  barSegmentActive: {
    width: 38,
    ...SHADOWS.goldGlow,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  titleText: {
    ...TYPOGRAPHY.titleXL,
    fontSize: 25,
    lineHeight: 32,
    color: COLORS.white,
    marginTop: 4,
    marginBottom: 6,
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    lineHeight: 19.5,
    color: '#D4CEE3',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: SPACING.md,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '600',
  },
  guaranteesCard: {
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    padding: SPACING.sm,
    marginTop: SPACING.md,
  },
  guaranteeHeading: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  guaranteesGrid: {
    gap: 6,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  guaranteeIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  guaranteeTitle: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  guaranteeDesc: {
    fontSize: 10.5,
    color: '#B5AECA',
    lineHeight: 14,
  },
  bottomCtaBar: {
    width: '100%',
    alignItems: 'center',
    paddingTop: SPACING.xs,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    shadowColor: '#F8C360',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0E0C1A',
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: 6,
  },
  loginLink: {
    marginTop: 8,
    paddingVertical: 4,
  },
  loginLinkText: {
    fontSize: 12,
    color: '#D4CEE3',
  },
  loginLinkBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});



