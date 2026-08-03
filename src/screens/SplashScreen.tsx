import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Sparkles, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' }}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.darkOverlay} />

      {/* Top Tagline */}
      <View style={styles.topContainer}>
        <View style={styles.badge}>
          <Sparkles size={12} color="#D6A24A" />
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
          <Heart size={44} color="#D6A24A" fill="rgba(214, 162, 74, 0.2)" />
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
          <ChevronRight size={18} color="#062E2A" />
        </TouchableOpacity>

        <Text style={styles.footerNote}>PRIVACY & TRUST VERIFIED • BY INVITATION ONLY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
    justify: 'space-between',
    padding: 24,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 46, 42, 0.75)',
  },
  topContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  centerContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#062E2A',
    borderWidth: 2,
    borderColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
    shadowColor: '#D6A24A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  titleText: {
    fontFamily: 'serif',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    letterSpacing: 2,
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 3,
    marginTop: 4,
  },
  descText: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
    maxWidth: 280,
  },
  bottomContainer: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D6A24A',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    elevation: 6,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  footerNote: {
    fontSize: 9,
    color: '#9CA3AF',
    marginTop: 12,
    letterSpacing: 1,
  },
});
