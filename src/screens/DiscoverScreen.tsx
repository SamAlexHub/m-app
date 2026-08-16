import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Compass, SlidersHorizontal, Settings, MessageCircle, Plus } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { getPhotoUrl, renderText } from '../utils/profileHelpers';

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
    currentUserProfile,
    profiles,
  } = useAppStore();

  const [activeChip, setActiveChip] = useState('Highest AI Match');

  const filterChips = [
    'Highest AI Match',
    'Verified Royalty',
    'Diamond Elite',
    'London & Paris',
  ];

  const profileSource = profiles && profiles.length > 0 ? profiles : MOCK_PROFILES;
  const currentUserId = currentUserProfile?._id || (currentUserProfile as any)?.id;
  const filteredProfiles = profileSource.filter((p) => (p._id || p.id) !== currentUserId);
  const currentProfile = filteredProfiles.length > 0 ? filteredProfiles[swipeIndex % filteredProfiles.length] : null;

  const handleOpenProfile = (p: any) => {
    const targetId = p?._id || p?.id;
    if (targetId) {
      setSelectedProfileId(targetId);
      setScreen('profile');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header (Screenshot-aligned: Title + Actions) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Evervow</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setScreen('chat')} style={styles.actionIconBtn}>
            <MessageCircle size={18} color="#1E152A" strokeWidth={2.2} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        <TouchableOpacity onPress={() => setFilterModalOpen(true)} style={styles.filterBtn}>
          <SlidersHorizontal size={12} color="#6D28D9" strokeWidth={2.2} />
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
      {discoverMode === 'swipe' && (
        <View style={styles.swipeContainer}>
          {currentProfile ? (
            <SwipeCard
              profile={currentProfile}
              onLike={() => { likeProfile(currentProfile._id || currentProfile.id); nextSwipe(); }}
              onPass={() => { passProfile(currentProfile._id || currentProfile.id); nextSwipe(); }}
              onSuperLike={() => { likeProfile(currentProfile._id || currentProfile.id); nextSwipe(); }}
              onStartChat={() => setScreen('chat')}
              onOpenDetails={() => handleOpenProfile(currentProfile)}
              onTap={() => handleOpenProfile(currentProfile)}
            />
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, height: 400 }}>
              <Text style={{ color: '#1E152A', fontSize: 14, fontWeight: '600' }}>No profiles available</Text>
            </View>
          )}
        </View>
      )}

      {/* Stories Reel (Moved to the bottom for thumb-zone ergonomics) */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContent}>
          {/* Other stories */}
          {filteredProfiles.map((p) => (
            <TouchableOpacity
              key={`story-${p._id || p.id}`}
              activeOpacity={0.82}
              onPress={() => handleOpenProfile(p)}
              style={styles.storyWrapper}
            >
              <View style={styles.storyCircleGold}>
                <Image source={{ uri: getPhotoUrl(p.mainPhoto?.url || (p.photos && p.photos[0])) }} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName} numberOfLines={1}>{renderText(p.firstName || p.name, 'user').split(' ')[0].toLowerCase()}</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E152A',
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionIconBtn: {
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
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#6D28D9',
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
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  storyName: {
    fontSize: 9.5,
    color: '#4C3D65',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
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
    backgroundColor: '#6D28D9',
    ...SHADOWS.goldGlow,
  },
  pillText: {
    fontSize: 10,
    color: COLORS.mutedGray,
    fontWeight: 'bold',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  chipsRow: {
    marginBottom: SPACING.md,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
    marginRight: 8,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
    marginRight: 8,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  chipActive: {
    backgroundColor: '#6D28D9',
    borderColor: '#6D28D9',
    shadowOpacity: 0.25,
  },
  chipText: {
    fontSize: 11,
    color: '#5C4E75',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  swipeContainer: {
    width: '100%',
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
    color: '#1E152A',
  },
  gridSub: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    marginTop: 2,
    color: '#4C3D65',
  },
  gridLoc: {
    fontSize: 9.5,
    color: '#6D28D9',
    fontWeight: 'bold',
    marginTop: 4,
  },
});
