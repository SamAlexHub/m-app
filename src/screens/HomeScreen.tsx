import React from 'react';
import { Sparkles, Bell, ShieldCheck, Search, ChevronRight, Heart, MapPin, Crown, Star, ArrowRight, Award, Compass } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';
import { SUCCESS_STORIES } from '../data/successStories';

export const HomeScreen: React.FC = () => {
  const { setScreen, setSelectedProfileId, setFilterModalOpen, notifications } = useAppStore();

  const unreadCount = notifications.filter(n => !n.read).length;
  const topMatch = MOCK_PROFILES[0]; // Aria D'Souza

  return (
    <div className="relative w-full min-h-screen bg-[#062E2A] text-white pb-28 pt-8 sm:pt-10 px-4 select-none overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-radial-gold opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#0E453F]/60 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between py-2 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#D6A24A] font-semibold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Monaco • London • Dubai</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide mt-0.5">
            Bonjour, Devan
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('notifications')}
            className="relative w-10 h-10 rounded-full bg-[#0E453F] border border-[#D6A24A]/40 flex items-center justify-center text-[#D6A24A] hover:bg-[#D6A24A] hover:text-[#062E2A] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setScreen('profile')}
            className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-r from-[#D6A24A] to-[#F8E8CD] shadow-gold-glow"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Hero 3D Pixar Illustration Banner */}
      <div className="relative z-10 w-full h-48 rounded-[32px] overflow-hidden mb-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-[#D6A24A]/40 bg-[#0E453F]">
        <img
          src="/assets/3d/home_hero_garden.png"
          alt="Home Romantic Garden"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062E2A] via-[#062E2A]/70 to-transparent p-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E453F]/90 border border-[#D6A24A]/50 text-[#D6A24A] text-[10px] font-bold uppercase tracking-widest w-max mb-2">
            <Sparkles className="w-3 h-3 text-[#D6A24A]" />
            <span>Exclusive Matchmaking</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white max-w-xs leading-tight">
            Where Modern Romance Meets Timeless Values
          </h2>
          <p className="text-[11px] text-gray-300 mt-1 max-w-xs font-sans">
            Curated soulmate recommendations verified by our European Concierge.
          </p>
        </div>
      </div>

      {/* Today's AI Soulmate Match Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D6A24A]" />
            <h2 className="font-serif text-xl font-bold text-white">Today’s AI Soulmate</h2>
          </div>
          <span className="text-xs font-semibold text-[#D6A24A]">Refreshes at midnight</span>
        </div>

        <GlassCard
          glow
          onClick={() => {
            setSelectedProfileId(topMatch.id);
            setScreen('match-details');
          }}
          className="p-5"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-28 h-36 rounded-2xl overflow-hidden border border-[#D6A24A]/60 flex-shrink-0 shadow-lg">
              <img src={topMatch.photos[0]} alt={topMatch.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-950/90 text-[#D6A24A] text-[9px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-serif text-2xl font-bold text-white">{topMatch.name}, {topMatch.age}</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#D6A24A]/20 border border-[#D6A24A]/40 text-[#D6A24A] text-[10px] font-bold">
                  {topMatch.vipTier} VIP
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">{topMatch.profession} • {topMatch.location}</p>
              <p className="text-xs text-emerald-200/90 italic mt-2 line-clamp-2">
                "{topMatch.matchReason}"
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProfileId(topMatch.id);
                    setScreen('match-details');
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-xs shadow-gold-glow hover:opacity-95 transition-all"
                >
                  View Compatibility Insights
                </button>
              </div>
            </div>

            <div className="flex-shrink-0">
              <CircularScore score={topMatch.aiMatchScore} size={95} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Verified Profiles Horizontal Reel */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D6A24A]" />
            <h2 className="font-serif text-xl font-bold text-white">Verified Royal Profiles</h2>
          </div>
          <button onClick={() => setScreen('discover')} className="text-xs text-[#D6A24A] font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {MOCK_PROFILES.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProfileId(p.id);
                setScreen('profile');
              }}
              className="w-36 flex-shrink-0 cursor-pointer group"
            >
              <div className="relative w-36 h-48 rounded-2xl overflow-hidden border border-white/15 group-hover:border-[#D6A24A] transition-all shadow-md">
                <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{p.name}</h4>
                  <p className="text-[10px] text-gray-300 line-clamp-1">{p.profession}</p>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#062E2A]/80 text-[#D6A24A] text-[9px] font-bold">
                  {p.aiMatchScore}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP Membership Banner */}
      <div className="relative z-10 mb-6">
        <GlassCard
          glow
          onClick={() => setScreen('membership')}
          className="p-6 bg-gradient-to-r from-[#0E453F] via-[#062E2A] to-[#145A53]"
        >
          <div className="flex items-center justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-1.5 text-xs text-[#D6A24A] font-bold uppercase tracking-widest mb-1">
                <Crown className="w-4 h-4 text-[#D6A24A]" />
                <span>Diamond VIP Membership</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Unlock Private Matchmaker Concierge</h3>
              <p className="text-xs text-gray-300 mt-1">
                Personalized introduction by senior European wedding consultants, unlimited video calls & incognito mode.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D6A24A] to-[#F8E8CD] p-[1px] flex-shrink-0 flex items-center justify-center text-[#062E2A] font-bold shadow-gold-halo">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Success Stories Snapshot */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-red-400/20" />
            <h2 className="font-serif text-xl font-bold text-white">Royal Success Stories</h2>
          </div>
          <button onClick={() => setScreen('success-stories')} className="text-xs text-[#D6A24A] font-semibold hover:underline">
            Explore All
          </button>
        </div>

        <GlassCard onClick={() => setScreen('success-stories')} className="p-5">
          <div className="flex gap-4 items-center">
            <img
              src="/assets/3d/success_stories_couple.png"
              alt="Success Story"
              className="w-24 h-24 rounded-2xl object-cover border border-[#D6A24A]/40 flex-shrink-0"
            />
            <div>
              <span className="text-[10px] font-semibold text-[#D6A24A] tracking-wider uppercase">Villa d’Este, Lake Como</span>
              <h4 className="font-serif text-lg font-bold text-white">{SUCCESS_STORIES[0].coupleNames}</h4>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2 italic">
                "{SUCCESS_STORIES[0].quote}"
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
