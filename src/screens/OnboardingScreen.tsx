import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, Sparkles, Shield, Heart, ArrowLeft } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

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
      {/* Top Controls */}
      <View style={styles.headerRow}>
        {currentSlide > 0 ? (
          <TouchableOpacity onPress={() => setCurrentSlide(currentSlide - 1)} style={styles.backBtn}>
            <ArrowLeft size={18} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtnEmpty} />
        )}

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Card */}
      <View style={styles.contentContainer}>
        <View style={styles.imageCard}>
          <Image source={{ uri: slide.image }} style={styles.slideImage} resizeMode="cover" />
          <View style={styles.badge}>
            <Icon size={12} color="#D6A24A" />
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
          <ChevronRight size={18} color="#062E2A" />
        </TouchableOpacity>
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
  headerRow: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(14, 69, 63, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justify: 'center',
  },
  backBtnEmpty: {
    width: 36,
  },
  skipText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageCard: {
    width: 270,
    height: 270,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(214, 162, 74, 0.4)',
    backgroundColor: '#0E453F',
    position: 'relative',
    marginBottom: 24,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 46, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.5)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 2,
  },
  titleText: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
    textAlign: 'center',
  },
  descText: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    maxWidth: 280,
  },
  footerContainer: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: 28,
    backgroundColor: '#D6A24A',
  },
  nextBtn: {
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
  nextText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#062E2A',
  },
});
