import React from 'react';
import { ArrowLeft, Bell, Sparkles, Heart, Crown, ShieldCheck, CheckCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationAsRead, setScreen, setSelectedProfileId } = useAppStore();

  return (
    <div className="relative w-full min-h-screen bg-[#062E2A] text-white pb-28 pt-8 sm:pt-10 px-4 select-none overflow-x-hidden">
      
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between py-2 mb-4">
        <button
          onClick={() => setScreen('home')}
          className="w-10 h-10 rounded-full bg-[#0E453F] border border-white/15 flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E453F]/90 border border-[#D6A24A]/40 text-[#D6A24A] text-xs font-semibold uppercase tracking-wider">
          <Bell className="w-3.5 h-3.5" />
          <span>Activity Center</span>
        </div>

        <div className="w-10 h-10" />
      </div>

      <div className="relative z-10 text-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Notifications & Alerts</h1>
        <p className="text-xs text-[#D6A24A] mt-0.5 font-semibold">Your Private Match Updates</p>
      </div>

      {/* Notifications List */}
      <div className="relative z-10 space-y-3">
        {notifications.map((n) => (
          <GlassCard
            key={n.id}
            glow={!n.read}
            onClick={() => {
              markNotificationAsRead(n.id);
              setSelectedProfileId('p1');
              setScreen('match-details');
            }}
            className={`p-4 transition-all ${!n.read ? 'bg-[#0E453F]/90 border-[#D6A24A]' : 'bg-[#0E453F]/50 opacity-80'}`}
          >
            <div className="flex items-start gap-3">
              {n.avatar ? (
                <img src={n.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-[#D6A24A]" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D6A24A] to-[#F8E8CD] p-[1px] flex items-center justify-center text-[#062E2A]">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-sm font-bold text-white">{n.title}</h3>
                  <span className="text-[10px] text-gray-400">{n.time}</span>
                </div>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">{n.message}</p>
              </div>

              {!n.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#D6A24A] shadow-gold-glow flex-shrink-0 mt-1" />
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
