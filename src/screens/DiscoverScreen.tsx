import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Compass, SlidersHorizontal } from 'lucide-react-native';
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
    '34+ Guna Sync',
    'London & Paris',
  ];

  const currentProfile = MOCK_PROFILES[swipeIndex % MOCK_PROFILES.length];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Compass size={22} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.titleText}>Discover Matches</Text>
        </View>

        <View style={styles.modePill}>
          <TouchableOpacity
            onPress={() => setDiscoverMode('swipe')}
            style={[styles.pillBtn, discoverMode === 'swipe' && styles.pillBtnActive]}
          >
            <Text style={[styles.pillText, discoverMode === 'swipe' && styles.pillTextActive]}>Swipe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDiscoverMode('grid')}
            style={[styles.pillBtn, discoverMode === 'grid' && styles.pillBtnActive]}
          >
            <Text style={[styles.pillText, discoverMode === 'grid' && styles.pillTextActive]}>Grid</Text>
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

      {/* Mode 1: Swipe Cards View */}
      {discoverMode === 'swipe' && (
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
      )}

      {/* Mode 2: Grid Gallery View */}
      {discoverMode === 'grid' && (
        <View style={styles.gridContainer}>
          {MOCK_PROFILES.map((p) => (
            <GlassCard
              key={p.id}
              onClick={() => {
                setSelectedProfileId(p.id);
                setScreen('profile');
              }}
              style={styles.gridCard}
            >
              <Text style={styles.gridName}>{p.name}, {p.age}</Text>
              <Text style={styles.gridSub}>{p.profession}</Text>
              <Text style={styles.gridLoc}>{p.location}</Text>
            </GlassCard>
          ))}
        </View>
      )}
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
    justify: 'space-between',
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  titleText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
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
