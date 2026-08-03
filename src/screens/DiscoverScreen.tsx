import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Compass, SlidersHorizontal } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { SwipeCard } from '../components/SwipeCard';
import { GlassCard } from '../components/GlassCard';

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
          <Compass size={22} color="#D6A24A" />
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
          <SlidersHorizontal size={12} color="#D6A24A" />
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
    backgroundColor: '#062E2A',
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modePill: {
    flexDirection: 'row',
    backgroundColor: '#0E453F',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  pillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  pillBtnActive: {
    backgroundColor: '#D6A24A',
  },
  pillText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  pillTextActive: {
    color: '#062E2A',
  },
  chipsRow: {
    marginBottom: 16,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.6)',
    marginRight: 8,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#D6A24A',
    borderColor: '#D6A24A',
  },
  chipText: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  chipTextActive: {
    color: '#062E2A',
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
  },
  gridName: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gridSub: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
  },
  gridLoc: {
    fontSize: 9,
    color: '#D6A24A',
    fontWeight: 'bold',
    marginTop: 4,
  },
});
