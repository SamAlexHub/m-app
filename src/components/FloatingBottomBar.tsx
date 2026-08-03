import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Compass, Heart, MessageCircle, User, Search } from 'lucide-react-native';
import { useAppStore, ScreenType } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme/tokens';

export const FloatingBottomBar: React.FC = () => {
  const { currentScreen, setScreen, setFilterModalOpen } = useAppStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'search-trigger', label: '', icon: Search, isFloating: true },
    { id: 'match-details', label: 'Matches', icon: Heart },
    { id: 'chat', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.bar}>
        {navItems.map((item) => {
          if (item.isFloating) {
            return (
              <View key="floating-search" style={styles.floatingWrapper}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => {
                    setScreen('discover');
                    setFilterModalOpen(true);
                  }}
                  style={styles.floatingButton}
                >
                  <Search size={22} color={COLORS.accentGold} strokeWidth={2.2} />
                </TouchableOpacity>
              </View>
            );
          }

          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => setScreen(item.id as ScreenType)}
              style={styles.navItem}
            >
              <Icon size={20} color={isActive ? COLORS.accentGold : COLORS.mutedGray} strokeWidth={isActive ? 2.2 : 1.8} />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
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
    bottom: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    zIndex: 99,
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    height: 64,
    borderRadius: RADIUS.xl, // 32px
    backgroundColor: 'rgba(14, 69, 63, 0.92)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
    paddingHorizontal: SPACING.sm,
    ...SHADOWS.soft,
  },
  navItem: {
    alignItems: 'center',
    justify: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    color: COLORS.mutedGray,
    fontWeight: '500',
  },
  navLabelActive: {
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  floatingWrapper: {
    position: 'relative',
    top: -20,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
    ...SHADOWS.goldGlow,
  },
});
