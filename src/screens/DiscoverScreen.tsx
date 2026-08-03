import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Compass, SlidersHorizontal, Settings, MessageCircle, Plus } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { SwipeCard } from '../components/SwipeCard';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const DiscoverScreen: React.FC = () => {
  const {
    discoverMode,
    setDiscoverMode,
    swipeIndex,
    nextSwipe,
    setSelectedProfileId,
    setScreen,
    setFilterModalOpen,
    likeProfile,
    passProfile,
  } = useAppStore();

  const [activeChip, setActiveChip] = useState('Highest AI Match');

  const filterChips = [
    'Highest AI Match',
    'Verified Royalty',
    'Diamond Elite',
    'London & Paris',
  ];

  const currentProfile = MOCK_PROFILES[swipeIndex % MOCK_PROFILES.length];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header (Screenshot-aligned: Title + Actions) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Éternité</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setScreen('chat')} style={styles.actionIconBtn}>
            <MessageCircle size={18} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen('settings')} style={styles.actionIconBtn}>
            <Settings size={18} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        <TouchableOpacity onPress={() => setFilterModalOpen(true)} style={styles.filterBtn}>
          <SlidersHorizontal size={12} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>

        {filterChips.map((chip) => (
          <TouchableOpacity
            key={chip}
            onPress={() => setActiveChip(chip)}
            style={[styles.chip, activeChip === chip && styles.chipActive]}
          >
            <Text style={[styles.chipText, activeChip === chip && styles.chipTextActive]}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Discover Swipe Cards Feed */}
      <SwipeCard
        profile={currentProfile}
        onLike={() => {
          likeProfile(currentProfile.id);
          nextSwipe();
        }}
        onPass={() => {
          passProfile(currentProfile.id);
          nextSwipe();
        }}
        onSuperLike={() => {
          likeProfile(currentProfile.id);
          nextSwipe();
        }}
        onOpenDetails={() => {
          setSelectedProfileId(currentProfile.id);
          setScreen('profile');
        }}
        onStartChat={() => {
          setSelectedProfileId(currentProfile.id);
          setScreen('chat');
        }}
      />

      {/* Stories Reel (Moved to the bottom for thumb-zone ergonomics) */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContent}>
          {/* Other stories */}
          {MOCK_PROFILES.map((p) => (
            <TouchableOpacity
              key={`story-${p.id}`}
              activeOpacity={0.82}
              onPress={() => { setSelectedProfileId(p.id); setScreen('profile'); }}
              style={styles.storyWrapper}
            >
              <View style={styles.storyCircleGold}>
                <Image source={{ uri: p.photos[0] }} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName} numberOfLines={1}>{p.name.split(' ')[0].toLowerCase()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
  },
  headerTitle: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesContainer: {
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  storiesContent: {
    gap: SPACING.md,
    paddingRight: SPACING.md,
  },
  storyWrapper: {
    alignItems: 'center',
    width: 60,
  },
  storyCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: COLORS.mutedGray,
    padding: 2,
    position: 'relative',
  },
  storyCircleGold: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.8,
    borderColor: COLORS.accentGold,
    padding: 2.2,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  storyPlusBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  storyName: {
    fontSize: 9,
    color: COLORS.lightGray,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  modePill: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.full,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  pillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  pillBtnActive: {
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  pillText: {
    fontSize: 10,
    color: COLORS.mutedGray,
    fontWeight: 'bold',
  },
  pillTextActive: {
    color: COLORS.primary,
  },
  chipsRow: {
    marginBottom: SPACING.md,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    marginRight: 8,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  chipText: {
    fontSize: 10,
    color: COLORS.lightGray,
  },
  chipTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  gridCard: {
    width: '48%',
  },
  gridName: {
    ...TYPOGRAPHY.titleM,
    fontSize: 14,
  },
  gridSub: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    marginTop: 2,
  },
  gridLoc: {
    fontSize: 9,
    color: COLORS.accentGold,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
