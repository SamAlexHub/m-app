import React from 'react';
import { Home, Compass, Heart, MessageCircle, User, Search } from 'lucide-react';
import { useAppStore, ScreenType } from '../store/useAppStore';

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
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40">
      <div className="relative rounded-full backdrop-blur-2xl bg-[#0E453F]/85 border border-[#D6A24A]/40 px-3 py-2 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          if (item.isFloating) {
            return (
              <div key="floating-search" className="relative -top-5 flex items-center justify-center">
                <button
                  onClick={() => {
                    setScreen('discover');
                    setFilterModalOpen(true);
                  }}
                  className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#B88432] via-[#D6A24A] to-[#F8E8CD] p-[2px] shadow-[0_0_25px_rgba(214,162,74,0.6)] transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                  <div className="w-full h-full rounded-full bg-[#062E2A] flex items-center justify-center text-[#D6A24A] group-hover:bg-[#0E453F] transition-colors">
                    <Search className="w-6 h-6 text-[#D6A24A]" />
                  </div>
                  {/* Outer pulse animation ring */}
                  <div className="absolute -inset-1 rounded-full bg-[#D6A24A]/30 blur-sm animate-ping pointer-events-none" />
                </button>
              </div>
            );
          }

          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as ScreenType)}
              className={`flex flex-col items-center justify-center px-2 py-1 transition-all duration-200 ${
                isActive ? 'text-[#D6A24A] scale-105' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D6A24A] shadow-[0_0_8px_#D6A24A]" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
