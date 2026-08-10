import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ShieldCheck, HeartHandshake, MapPin, KeyRound, Crown } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const OurSpecialityScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  const specialties = [
    {
      icon: ShieldCheck,
      title: 'European Concierge Verification',
      desc: 'Every single profile undergoes rigorous multi-layer ID checks (government passport and professional status verification). We ensure a 100% scam-free environment of genuine, high-caliber individuals.',
    },
    {
      icon: HeartHandshake,
      title: '5-Axis Compatibility Match',
      desc: 'Diverging from casual swipe widgets, our system matches candidates based on five core dimensions: life values, lifestyle aesthetics, communication style, future goals, and vedic astro synchronicity.',
    },
    {
      icon: MapPin,
      title: 'Vetted Escrow Date Coordination',
      desc: 'Our private concierge matchmakers personally coordinate first-date meetings at vetted partner restaurants, golf clubs, and high-end venues. Matches connect in ultimate comfort and privacy.',
    },
    {
      icon: KeyRound,
      title: 'Incognito Biometric Photo Shields',
      desc: 'Your photos remain private and copy-protected by default. Choose to reveal them only to approved interests, backed by screenshot block screens and security watermarks.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('settings')} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Speciality</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollFeed} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
        <View style={styles.heroSection}>
          <Crown size={32} color={COLORS.accentGold} strokeWidth={1.5} style={styles.heroIcon} />
          <Text style={styles.heroTitle}>The Evervow Standard</Text>
          <Text style={styles.heroSub}>
            Redefining luxury matrimonial matches for royalty, global leaders, and high-net-worth families.
          </Text>
        </View>

        {/* List of specialties */}
        <View style={styles.list}>
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassCard key={index} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconCircle}>
                    <Icon size={18} color={COLORS.accentGold} strokeWidth={2} style={{ alignSelf: 'center' }} />
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </GlassCard>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollFeed: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  headerTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  heroIcon: {
    marginBottom: SPACING.sm,
  },
  heroTitle: {
    ...TYPOGRAPHY.titleL,
    fontSize: 24,
    color: COLORS.white,
    textAlign: 'center',
  },
  heroSub: {
    ...TYPOGRAPHY.body,
    fontSize: 11,
    color: COLORS.mutedGray,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  list: {
    gap: SPACING.md,
  },
  card: {
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(216, 168, 75, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(216, 168, 75, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
  },
  cardDesc: {
    ...TYPOGRAPHY.body,
    fontSize: 11,
    lineHeight: 18,
    color: COLORS.lightGray,
  },
});
