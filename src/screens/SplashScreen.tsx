import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Heart, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

import { apiService } from '../services/api';

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
        
        setTimeout(() => {
          setScreen('home');
        }, 800);
      } else {
        setTimeout(() => {
          // Stay on splash or user clicks continue
        }, 1500);
      }
    };
    
    initApp();
  }, [authToken, setScreen, updateCurrentUserProfile]);

  const handleContinue = () => {
    if (authToken) {
      setScreen('home');
    } else {
      setScreen('login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' }}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.darkOverlay} />

      <View style={styles.centerContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>THE APPLE OF LUXURY MATRIMONY</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
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

      <View style={styles.bottomActions}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>Begin Your Love Story</Text>
          <ChevronRight size={18} color={COLORS.primary} strokeWidth={2.5} style={styles.ctaIcon} />
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
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    position: 'relative',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.78)',
  },
  centerContent: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 128,
    zIndex: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    marginBottom: SPACING.lg,
  },
  badgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
    textAlign: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.goldGlow,
  },
  titleText: {
    ...TYPOGRAPHY.titleXL,
    fontSize: 44,
    lineHeight: 52,
    textAlign: 'center',
    letterSpacing: 3,
  },
  subtitleText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: SPACING.md,
    maxWidth: 300,
  },
  bottomActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SPACING.xl,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    zIndex: 10,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 320,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    ...SHADOWS.goldGlow,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
  ctaIcon: {
    marginLeft: 8,
  },
  footerNote: {
    fontSize: 9,
    color: COLORS.mutedGray,
    marginTop: SPACING.lg,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
