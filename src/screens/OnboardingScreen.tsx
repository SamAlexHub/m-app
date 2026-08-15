import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Heart, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    eyebrow: 'CURATED MATRIMONY',
    title: 'Find Your\nTrue Soulmate',
    description: 'Discover verified profiles curated around shared family values and deep compatibility.',
    image: require('../../assets/3d/onboarding_1.png'),
    btnBg: '#5B50F6',
    btnText: '#FFFFFF',
  },
  {
    id: 2,
    eyebrow: 'SMART MATCHMAKING',
    title: 'AI & Astro\nCompatibility',
    description: 'Smart matchmaking powered by lifestyle preferences and birth chart alignment.',
    image: require('../../assets/3d/onboarding_2.png'),
    btnBg: '#5B50F6',
    btnText: '#FFFFFF',
  },
  {
    id: 3,
    eyebrow: 'FAMILY PRIVACY',
    title: 'Private &\nTrusted Space',
    description: 'Total control over your profile visibility with verified family privacy protection.',
    image: require('../../assets/3d/onboarding_3.png'),
    btnBg: '#5B50F6',
    btnText: '#FFFFFF',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const safeIndex = Math.min(Math.max(currentSlide, 0), slides.length - 1);
  const slide = slides[safeIndex];
  const isLastSlide = safeIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(safeIndex + 1);
      return;
    }
    setScreen('login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* 3D Couple Image as Full-Screen Background */}
      <Image
        key={slide.id}
        source={slide.image}
        style={styles.bgImage}
        resizeMode="cover"
      />

      {/* Aesthetic Seamless Overlay for High Image Clarity */}
      <View style={styles.fullOverlay} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header Bar */}
        <View style={styles.header}>
          <View style={styles.brandPill}>
            <Heart size={13} color="#5B50F6" fill="#5B50F6" />
            <Text style={styles.brandText}>EVERVOW</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setScreen('login')}
            style={styles.skipBtn}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Floating Glass Card with Onboarding Information */}
        <View style={styles.bottomCardContainer}>
          <View style={styles.glassCard}>
            {/* Eyebrow Category Tag */}
            <View style={styles.eyebrowBadge}>
              <Text style={styles.eyebrowText}>{slide.eyebrow}</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>{slide.title}</Text>

            {/* Description */}
            <Text style={styles.description}>{slide.description}</Text>

            {/* Indicator Dots */}
            <View style={styles.dotsRow}>
              {slides.map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => setCurrentSlide(idx)}
                  style={[
                    styles.dot,
                    safeIndex === idx ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleNext}
              style={[styles.button, { backgroundColor: slide.btnBg }]}
            >
              <Text style={[styles.buttonText, { color: slide.btnText }]}>
                {isLastSlide ? 'Get Started' : 'Continue'}
              </Text>
              <ChevronRight size={18} color={slide.btnText} strokeWidth={2.4} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  fullOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.22)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#0F172A',
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Bottom Floating Glass Card */
  bottomCardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  glassCard: {
    width: '100%',
    borderRadius: 32,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  eyebrowBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(91, 80, 246, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(91, 80, 246, 0.5)',
    marginBottom: 10,
  },
  eyebrowText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: '#A5B4FC',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    fontWeight: '400',
  },

  /* Indicators */
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 22,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#5B50F6',
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  /* Button */
  button: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#5B50F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
