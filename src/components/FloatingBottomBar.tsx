import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Home, Compass, Heart, MessageCircle, User, Search } from 'lucide-react-native';
import { useAppStore, ScreenType } from '../store/useAppStore';

const { width } = Dimensions.get('window');

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
                  activeOpacity={0.85}
                  onPress={() => {
                    setScreen('discover');
                    setFilterModalOpen(true);
                  }}
                  style={styles.floatingButton}
                >
                  <Search size={24} color="#D6A24A" />
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
              <Icon size={20} color={isActive ? '#D6A24A' : '#9CA3AF'} />
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
    bottom: 12,
    left: '4%',
    right: '4%',
    zIndex: 99,
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    height: 64,
    borderRadius: 36,
    backgroundColor: 'rgba(14, 69, 63, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
  },
  navItem: {
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  navLabel: {
    fontSize: 9,
    marginTop: 3,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#D6A24A',
    fontWeight: 'bold',
  },
  floatingWrapper: {
    position: 'relative',
    top: -18,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#062E2A',
    borderWidth: 2,
    borderColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
    shadowColor: '#D6A24A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
});
