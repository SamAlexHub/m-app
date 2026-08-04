import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Sparkles, Calendar, Video } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const MatchDetailsScreen: React.FC = () => {
  const { selectedProfileId, setScreen, setDatePlannerOpen, setVideoCallActive } = useAppStore();

  const profile = MOCK_PROFILES.find((p) => p.id === selectedProfileId) || MOCK_PROFILES[0];
  const radar = profile.compatibilityRadar;

  const radarItems = [
    { label: 'Core Life Values', score: radar.values },
    { label: 'Lifestyle & Travel', score: radar.lifestyle },
    { label: 'Communication Style', score: radar.communication },
    { label: 'Future Aspirations', score: radar.futureGoals },
    { label: 'Astro Kundali Sync', score: radar.astroSync },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.reportBadge}>
            <Sparkles size={12} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.reportBadgeText}>AI COMPATIBILITY REPORT</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Hero Score Box */}
        <GlassCard glow style={styles.heroBox}>
          <CircularScore score={profile.aiMatchScore} size={100} />
          <Text style={styles.namesText}>{profile.name} & Devan</Text>
          <Text style={styles.resonanceText}>EXCEPTIONAL 98% SOULMATE RESONANCE</Text>
          <Text style={styles.descText}>
            Our AI engine evaluated over 140 parameters to compute this match score.
          </Text>
        </GlassCard>

        {/* 5-Axis Matrix */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5-Axis Compatibility Matrix</Text>
          <GlassCard style={styles.matrixCard}>
            {radarItems.map((item, idx) => (
              <View key={idx} style={styles.matrixRow}>
                <View style={styles.matrixLabelRow}>
                  <Text style={styles.matrixLabel}>{item.label}</Text>
                  <Text style={styles.matrixScore}>{item.score}%</Text>
                </View>
                <View style={styles.track}>
                  <View style={[styles.bar, { width: `${item.score}%` }]} />
                </View>
              </View>
            ))}
          </GlassCard>
        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.bottomBar}>
        <TouchableOpacity activeOpacity={0.88} onPress={() => setDatePlannerOpen(true)} style={styles.inviteBtn}>
          <Calendar size={16} color={COLORS.primary} strokeWidth={2} />
          <Text style={styles.inviteBtnText}>Invite to Date</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setVideoCallActive(true)} style={styles.videoBtn}>
          <Video size={16} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.videoBtnText}>HD Video Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingTop: SPACING.xs,
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
  },
  reportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  reportBadgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  heroBox: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  namesText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    marginTop: SPACING.md,
  },
  resonanceText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
    marginTop: 2,
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 11,
    textAlign: 'center',
    marginTop: SPACING.sm,
    maxWidth: 260,
  },
  section: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
  matrixCard: {
    gap: SPACING.md,
  },
  matrixRow: {},
  matrixLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  matrixLabel: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
  },
  matrixScore: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.accentGold,
  },
  bottomBar: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    gap: SPACING.md,
  },
  inviteBtn: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...SHADOWS.goldGlow,
  },
  inviteBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  videoBtn: {
    height: 52,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  videoBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
