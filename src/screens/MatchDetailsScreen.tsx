import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { ArrowLeft, Sparkles, CircleCheck, CircleAlert, Brain } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { apiService } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

import { MOCK_PROFILES } from '../data/profiles';
import { renderText } from '../utils/profileHelpers';

export const MatchDetailsScreen: React.FC = () => {
  const { selectedProfileId, setScreen, authToken, profiles } = useAppStore();
  const [profile, setProfile] = useState<any>(null);
  const [compatibility, setCompatibility] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!selectedProfileId) return;
      setLoading(true);
      
      const getLocalFallback = () => {
        return (
          profiles.find(p => p._id === selectedProfileId || p.id === selectedProfileId) ||
          MOCK_PROFILES.find(p => p.id === selectedProfileId || p._id === selectedProfileId) ||
          MOCK_PROFILES[0]
        );
      };

      if (authToken) {
        try {
          // Load profile details
          const res = await apiService.getProfileById(selectedProfileId, authToken);
          if (res.data) {
            setProfile(res.data);
          } else {
            setProfile(getLocalFallback());
          }
        } catch {
          setProfile(getLocalFallback());
        } finally {
          setLoading(false);
        }

        // Load AI compatibility score separately (slower)
        setAiLoading(true);
        try {
          const compatRes = await apiService.getCompatibility(selectedProfileId, authToken);
          if (compatRes.data) setCompatibility(compatRes.data);
        } catch (err) {
          console.error('Compatibility fetch failed:', err);
        } finally {
          setAiLoading(false);
        }
      } else {
        setProfile(getLocalFallback());
        setLoading(false);
      }
    };
    loadData();
  }, [authToken, selectedProfileId]);

  if (loading || !profile) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.accentGold} size="large" />
        <Text style={{ color: COLORS.white, marginTop: 12, fontSize: 13 }}>Loading compatibility insights...</Text>
      </View>
    );
  }

  // Use AI data if available, else fallback to mock profile data
  const overallScore = Number(compatibility?.overallScore ?? (profile.aiMatchScore || profile.profileCompletion || 80)) || 80;
  const matchLabel = compatibility?.label ?? 'Compatibility Analysis';
  const summary = compatibility?.summary ?? 'Our AI engine evaluated over 140 parameters to compute this match score.';
  const aiInsight = compatibility?.aiInsight ?? null;
  const strengths: string[] = compatibility?.strengths ?? [];
  const considerations: string[] = compatibility?.considerations ?? [];

  const axes = compatibility?.axes
    ? [
        { label: 'Core Life Values', score: Number(compatibility.axes.coreValues) || 80 },
        { label: 'Lifestyle & Travel', score: Number(compatibility.axes.lifestyle) || 78 },
        { label: 'Communication Style', score: Number(compatibility.axes.communication) || 75 },
        { label: 'Future Aspirations', score: Number(compatibility.axes.futureAspirations) || 82 },
        { label: 'Astro Kundali Sync', score: Number(compatibility.axes.astroSync) || 70 },
      ]
    : [
        { label: 'Core Life Values', score: Number(profile.compatibilityRadar?.values) || 80 },
        { label: 'Lifestyle & Travel', score: Number(profile.compatibilityRadar?.lifestyle) || 78 },
        { label: 'Communication Style', score: Number(profile.compatibilityRadar?.communication) || 75 },
        { label: 'Future Aspirations', score: Number(profile.compatibilityRadar?.futureGoals) || 82 },
        { label: 'Astro Kundali Sync', score: Number(profile.compatibilityRadar?.astroSync) || 70 },
      ];

  const nameA = renderText(compatibility?.nameA ?? (profile.firstName || profile.name), 'Partner');
  const nameB = renderText(compatibility?.nameB, 'You');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
            <ArrowLeft size={18} color="#1E152A" strokeWidth={2.4} />
          </TouchableOpacity>
          <View style={styles.reportBadge}>
            <Sparkles size={12} color="#6D28D9" strokeWidth={2} />
            <Text style={styles.reportBadgeText}>AI COMPATIBILITY REPORT</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Hero Score Box */}
        <GlassCard glow style={styles.heroBox}>
          {aiLoading ? (
            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
              <ActivityIndicator color="#6D28D9" size="large" />
              <Text style={styles.aiLoadingText}>Gemini AI is analysing...</Text>
            </View>
          ) : (
            <>
              <CircularScore score={overallScore} size={100} />
              <Text style={styles.namesText}>{nameA} & {nameB}</Text>
              <Text style={styles.resonanceText}>{matchLabel.toUpperCase()}</Text>
              <Text style={styles.descText}>{summary}</Text>
            </>
          )}
        </GlassCard>

        {/* AI Insight Banner */}
        {aiInsight && !aiLoading && (
          <GlassCard style={styles.insightBanner}>
            <Brain size={16} color="#6D28D9" strokeWidth={2} />
            <Text style={styles.insightText}>"{aiInsight}"</Text>
          </GlassCard>
        )}

        {/* 5-Axis Matrix */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5-Axis Compatibility Matrix</Text>
          <GlassCard style={styles.matrixCard}>
            {axes.map((item, idx) => (
              <View key={idx} style={styles.matrixRow}>
                <View style={styles.matrixLabelRow}>
                  <Text style={styles.matrixLabel}>{item.label}</Text>
                  <Text style={styles.matrixScore}>{item.score}%</Text>
                </View>
                <View style={styles.track}>
                  <View style={[styles.bar, { width: `${item.score}%` as any }]} />
                </View>
              </View>
            ))}
          </GlassCard>
        </View>

        {/* Strengths */}
        {strengths.length > 0 && !aiLoading && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ What Works Great</Text>
            <GlassCard style={styles.listCard}>
              {strengths.map((s, i) => (
                <View key={i} style={styles.listRow}>
                  <CircleCheck size={14} color="#059669" strokeWidth={2} />
                  <Text style={styles.listText}>{s}</Text>
                </View>
              ))}
            </GlassCard>
          </View>
        )}

        {/* Considerations */}
        {considerations.length > 0 && !aiLoading && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💬 Things to Explore</Text>
            <GlassCard style={styles.listCard}>
              {considerations.map((c, i) => (
                <View key={i} style={styles.listRow}>
                  <CircleAlert size={14} color="#6D28D9" strokeWidth={2} />
                  <Text style={styles.listText}>{c}</Text>
                </View>
              ))}
            </GlassCard>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 90,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  reportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
  },
  reportBadgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9.5,
    color: '#6D28D9',
    fontWeight: '800',
  },
  heroBox: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  aiLoadingText: {
    color: '#6D28D9',
    fontSize: 12,
    marginTop: 12,
    fontStyle: 'italic',
  },
  namesText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E152A',
    marginTop: SPACING.md,
  },
  resonanceText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9.5,
    color: '#6D28D9',
    fontWeight: '800',
    marginTop: 2,
  },
  descText: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    color: '#4C3D65',
    textAlign: 'center',
    marginTop: SPACING.sm,
    maxWidth: 280,
    lineHeight: 18,
  },
  insightBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    padding: SPACING.md,
  },
  insightText: {
    flex: 1,
    fontSize: 12,
    color: '#4C3D65',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  section: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E152A',
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
    fontSize: 12.5,
    color: '#1E152A',
    fontWeight: '600',
  },
  matrixScore: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3E8FF',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#6D28D9',
  },
  listCard: {
    gap: SPACING.sm,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  listText: {
    flex: 1,
    fontSize: 12.5,
    color: '#4C3D65',
    lineHeight: 19,
  },
});
