import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Home, Search, Plus, Settings } from 'lucide-react-native';
import { useAppStore, ScreenType } from '../store/useAppStore';
import { COLORS, RADIUS } from '../theme/tokens';

export const FloatingBottomBar: React.FC = () => {
  const { currentScreen, setScreen, setSelectedProfileId, currentUserProfile } = useAppStore();

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'discover', icon: Search },
    { id: 'membership', icon: Plus, isAdd: true },
    { id: 'settings', icon: Settings },
    { id: 'profile', isProfile: true },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.bar}>
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;

          if (item.isProfile) {
            return (
              <TouchableOpacity
                key="profile-tab"
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedProfileId('p2');
                  setScreen('profile');
                }}
                style={styles.navItem}
              >
                <Image
                  source={{ uri: (currentUserProfile?.photos && currentUserProfile.photos.length > 0) ? currentUserProfile.photos[0] : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }}
                  style={[styles.avatarIcon, isActive && styles.avatarIconActive]}
                />
                <View style={styles.dotContainer}>
                  {isActive && <View style={styles.activeDot} />}
                </View>
              </TouchableOpacity>
            );
          }

          if (item.isAdd) {
            return (
              <TouchableOpacity
                key="add-tab"
                activeOpacity={0.8}
                onPress={() => setScreen('membership')}
                style={styles.navItem}
              >
                <View style={[styles.addButton, isActive && styles.addButtonActive]}>
                  <Plus size={20} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={styles.dotContainer}>
                  {isActive && <View style={styles.activeDot} />}
                </View>
              </TouchableOpacity>
            );
          }

          const Icon = item.icon!;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => setScreen(item.id as ScreenType)}
              style={styles.navItem}
            >
              <Icon
                size={22}
                color={isActive ? '#7C3AED' : COLORS.mutedGray}
                strokeWidth={isActive ? 2.3 : 1.8}
              />
              <View style={styles.dotContainer}>
                {isActive && <View style={styles.activeDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    zIndex: 99,
  },
  bar: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF', // Clean white glass bottom bar
    borderTopWidth: 1,
    borderTopColor: 'rgba(124, 58, 237, 0.15)', // Delicate violet border
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 4, // Spacing for mobile screen indicators
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 12,
  },
  dotContainer: {
    height: 4,
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accentGold,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonActive: {
    backgroundColor: '#6D28D9',
  },
  avatarIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: COLORS.mutedGray,
  },
  avatarIconActive: {
    borderColor: '#7C3AED',
    borderWidth: 1.8,
  },
});

