import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, Heart, MapPin } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { SUCCESS_STORIES } from '../data/successStories';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const SuccessStoriesScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
          <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Heart size={12} color={COLORS.accentGold} fill={COLORS.accentGold} />
          <Text style={styles.badgeText}>ROYAL NUPTIALS</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scrollFeed} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Couples United by Evervow</Text>
      <Text style={styles.sub}>Real Love Stories • Real European Weddings</Text>

      <View style={styles.list}>
        {SUCCESS_STORIES.map((story) => (
          <GlassCard key={story.id} glow style={styles.storyCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' }} style={styles.coverImage} />

            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>{story.matchScore}% Match</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.coupleNames}>{story.coupleNames}</Text>
              <Text style={styles.weddingDate}>{story.weddingDate}</Text>
            </View>

            <View style={styles.locRow}>
              <MapPin size={12} color={COLORS.accentGold} strokeWidth={2} />
              <Text style={styles.locText}>{story.location}</Text>
            </View>

            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>"{story.quote}"</Text>
            </View>
          </GlassCard>
        ))}
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
    paddingBottom: 90,
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
  },
  badge: {
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
  badgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  title: {
    ...TYPOGRAPHY.titleL,
    fontSize: 24,
    textAlign: 'center',
  },
  sub: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  list: {
    gap: SPACING.md,
  },
  storyCard: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 160,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  matchBadge: {
    position: 'absolute',
    top: 28,
    left: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  matchBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  coupleNames: {
    ...TYPOGRAPHY.titleM,
    fontSize: 20,
  },
  weddingDate: {
    fontSize: 11,
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
  },
  quoteBox: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  quoteText: {
    ...TYPOGRAPHY.body,
    fontSize: 11,
    fontStyle: 'italic',
  },
});
