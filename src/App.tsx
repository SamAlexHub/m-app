import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useAppStore } from './store/useAppStore';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { MatchDetailsScreen } from './screens/MatchDetailsScreen';
import { ChatScreen } from './screens/ChatScreen';
import { MembershipScreen } from './screens/MembershipScreen';
import { SuccessStoriesScreen } from './screens/SuccessStoriesScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { CompleteProfileScreen } from './screens/CompleteProfileScreen';

import { FloatingBottomBar } from './components/FloatingBottomBar';
import { DatePlannerModal } from './components/DatePlannerModal';
import { VideoCallModal } from './components/VideoCallModal';
import { FilterSheetModal } from './components/FilterSheetModal';
import { COLORS } from './theme/tokens';

export const App: React.FC = () => {
  const { currentScreen } = useAppStore();

  const showTabBar = ['home', 'discover', 'match-details', 'chat', 'profile'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'login':
        return <AuthScreen />;
      case 'home':
        return <HomeScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'match-details':
        return <MatchDetailsScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'membership':
        return <MembershipScreen />;
      case 'success-stories':
        return <SuccessStoriesScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'complete-profile':
        return <CompleteProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.mobileFrame}>
        <View style={styles.screenWrapper}>
          {renderScreen()}
        </View>
        {showTabBar && <FloatingBottomBar />}
        <DatePlannerModal />
        <VideoCallModal />
        <FilterSheetModal />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justify: 'center',
  },
  mobileFrame: {
    width: '100%',
    maxWidth: 480,
    flex: 1,
    backgroundColor: COLORS.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  screenWrapper: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export default App;
