import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, ChevronRight, Sparkles, ShieldCheck, Stars, UserCheck } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { apiService } from '../services/api';

// Bundled Expo Asset for 3D Pixar Couple Splash Hero
import splashHeroImg from '../../assets/3d/splash_hero_3d.png';

export const SplashScreen: React.FC = () => {
  const { setScreen, authToken, updateCurrentUserProfile } = useAppStore();

  useEffect(() => {
    // Check if user is logged in and sync profile
    const initApp = async () => {
      if (authToken) {
        try {
          const res = await apiService.getMyProfile(authToken);
          if (res.data) {
            updateCurrentUserProfile({
              name: `${res.data.firstName || ''} ${res.data.lastName || ''}`.trim(),
              height: res.data.height || '',
              religion: res.data.religion?._id || res.data.religion || '',
              community: res.data.caste || '',
              motherTongue: res.data.motherTongue || '',
              profession: res.data.occupation || '',
              company: res.data.company || '',
              education: res.data.education || '',
              connectIntro: res.data.personalizedIntro || '',
              familyDetails: {
                father: res.data.fatherProfession || '',
                mother: res.data.motherProfession || '',
                background: res.data.familyBackground || '',
                familyValues: res.data.familyValues || '',
                location: res.data.ancestralOrigin || ''
              },
              horoscope: {
                zodiac: res.data.zodiacSign || '',
                rashi: res.data.moonSign || '',
                nakshatra: res.data.nakshatra || '',
                manglik: res.data.isManglik || false,
                gunaScore: "33 / 36"
              },
              vipVerificationDoc: res.data.vipVerificationDoc || { documentType: 'Aadhar', documentNumber: '', status: 'pending' },
              photos: res.data.photos && res.data.photos.length > 0 
                ? [...res.data.photos, ...Array(5 - res.data.photos.length).fill('')].slice(0, 5) 
                : Array(5).fill(''),
            });
          }
        } catch (error) {
          console.error("Failed to sync profile on startup:", error);
        }
      }
    };
    
    initApp();
  }, [authToken, updateCurrentUserProfile]);

  const handleStartOnboarding = () => {
    setScreen('onboarding');
  };

  const handleLogin = () => {
    if (authToken) {
      setScreen('home');
    } else {
      setScreen('login');
    }
  };

  return (
    <View style={styles.container}>
      {/* 3D AI Pixar Couple Hero Image Background */}
      <Image
        source={splashHeroImg}
        style={styles.bgImage}
        resizeMode="cover"
      />
      
      {/* Luxurious Emerald Dark Gradient Overlay */}
      <View style={styles.darkOverlay} />
      <View style={styles.bottomGradient} />

      {/* Top Header Branding */}
      <View style={styles.topHeader}>
        <View style={styles.badge}>
          <Sparkles size={13} color={COLORS.accentGold} />
          <Text style={styles.badgeText}>AI SOULMATE MATRIMONY</Text>
        </View>
      </View>

      {/* Main Center Branding & Value Proposition */}
      <View style={styles.centerContent}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleStartOnboarding}
          style={styles.logoContainer}
        >
          <View style={styles.logoGlowRing} />
          <View style={styles.logoCircle}>
            <Heart size={44} color={COLORS.accentGold} fill="rgba(216, 168, 75, 0.25)" strokeWidth={1.8} />
          </View>
        </TouchableOpacity>

        <Text style={styles.titleText}>EVERVOW</Text>
        <Text style={styles.subtitleText}>HAUTE MATRIMONIE • INTERNATIONAL</Text>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Stars size={14} color={COLORS.accentGold} />
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.descText}>
          Where true love, family values, and timeless elegance unite across global horizons.
        </Text>

        {/* Feature Pills */}
        <View style={styles.pillsRow}>
          <View style={styles.pillItem}>
            <UserCheck size={12} color={COLORS.accentGold} />
            <Text style={styles.pillText}>100% Verified</Text>
          </View>
          <View style={styles.pillItem}>
            <Sparkles size={12} color={COLORS.accentGold} />
            <Text style={styles.pillText}>AI Matching</Text>
          </View>
          <View style={styles.pillItem}>
            <ShieldCheck size={12} color={COLORS.accentGold} />
            <Text style={styles.pillText}>Strict Privacy</Text>
          </View>
        </View>
      </View>

      {/* Bottom CTA Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleStartOnboarding}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>Begin Your Love Story</Text>
          <ChevronRight size={20} color={COLORS.primary} strokeWidth={2.8} style={styles.ctaIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogin}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Already Have an Account? <Text style={styles.secondaryTextBold}>Sign In</Text></Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>PRIVACY & TRUST VERIFIED • BY INVITATION ONLY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0B0818',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    position: 'relative',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '62%',
    backgroundColor: 'rgba(17, 13, 34, 0.72)',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  topHeader: {
    paddingTop: SPACING.md,
    alignItems: 'center',
    zIndex: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(23, 18, 44, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(244, 197, 99, 0.45)',
    ...SHADOWS.soft,
  },
  badgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9.5,
    textAlign: 'center',
    letterSpacing: 2,
    color: '#F4C563',
  },
  centerContent: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    marginVertical: 'auto',
    backgroundColor: 'rgba(21, 16, 42, 0.65)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(244, 197, 99, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  logoGlowRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(244, 197, 99, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(244, 197, 99, 0.4)',
  },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#16112C',
    borderWidth: 2,
    borderColor: '#F4C563',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F4C563',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  titleText: {
    ...TYPOGRAPHY.titleXL,
    fontSize: 38,
    lineHeight: 44,
    textAlign: 'center',
    letterSpacing: 4,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitleText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 2.5,
    textAlign: 'center',
    color: '#F4C563',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: SPACING.sm,
    width: 160,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(244, 197, 99, 0.4)',
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    color: '#E0D9F0',
    maxWidth: 310,
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: SPACING.md,
    flexWrap: 'wrap',
  },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 197, 99, 0.35)',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FDF1D6',
  },
  bottomActions: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: SPACING.md,
    zIndex: 10,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 340,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  ctaIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    marginTop: SPACING.sm,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  secondaryText: {
    fontSize: 13,
    color: '#E0D9F0',
    textAlign: 'center',
  },
  secondaryTextBold: {
    fontWeight: '700',
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  footerNote: {
    fontSize: 9,
    color: '#A89EC2',
    marginTop: SPACING.xs,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
});

