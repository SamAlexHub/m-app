import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Sparkles, Calendar, Video } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';

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
            <ArrowLeft size={18} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.reportBadge}>
            <Sparkles size={12} color="#D6A24A" />
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
        <TouchableOpacity activeOpacity={0.85} onPress={() => setDatePlannerOpen(true)} style={styles.inviteBtn}>
          <Calendar size={16} color="#062E2A" />
          <Text style={styles.inviteBtnText}>Invite to Date</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setVideoCallActive(true)} style={styles.videoBtn}>
          <Video size={16} color="#D6A24A" />
          <Text style={styles.videoBtnText}>HD Video Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
  },
  content: {
    padding: 16,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justify: 'center',
  },
  reportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  reportBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  heroBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  namesText: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  resonanceText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
    marginTop: 2,
  },
  descText: {
    fontSize: 11,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 260,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  matrixCard: {
    gap: 12,
  },
  matrixRow: {},
  matrixLabelRow: {
    flexDirection: 'row',
    justify: 'space-between',
    marginBottom: 4,
  },
  matrixLabel: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '600',
  },
  matrixScore: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#D6A24A',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  inviteBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D6A24A',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
  },
  inviteBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  videoBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
  },
  videoBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
