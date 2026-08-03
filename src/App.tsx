import React from 'react';
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

import { FloatingBottomBar } from './components/FloatingBottomBar';
import { DatePlannerModal } from './components/DatePlannerModal';
import { VideoCallModal } from './components/VideoCallModal';
import { FilterSheetModal } from './components/FilterSheetModal';

export const App: React.FC = () => {
  const { currentScreen } = useAppStore();

  // Determine if main floating tab bar should be displayed
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
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#031E1B] flex items-center justify-center sm:py-6 font-sans">
      {/* Mobile Device Simulation Frame container */}
      <div className="relative w-full sm:w-[410px] h-screen sm:h-[860px] bg-[#062E2A] sm:rounded-[50px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] sm:border-[8px] sm:border-[#0E453F] flex flex-col">
        
        {/* Dynamic Island / Notch Mock for Mobile Aesthetic */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50 items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-emerald-950 border border-[#D6A24A]/40 mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#D6A24A]" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="flex-1 w-full h-full overflow-y-auto scrollbar-none relative">
          {renderScreen()}
        </div>

        {/* Floating Bottom Navigation Bar */}
        {showTabBar && <FloatingBottomBar />}

        {/* Global Overlays & Modals */}
        <DatePlannerModal />
        <VideoCallModal />
        <FilterSheetModal />
      </div>
    </div>
  );
};

export default App;
