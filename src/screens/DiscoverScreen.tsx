import React, { useState } from 'react';
import { Compass, LayoutGrid, MapPin, SlidersHorizontal, Sparkles, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { useAppStore, DiscoverViewMode } from '../store/useAppStore';
import { MOCK_PROFILES, Profile } from '../data/profiles';
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
    shortlistedIds,
    toggleShortlist,
    likeProfile,
    passProfile,
    setDatePlannerOpen
  } = useAppStore();

  const [activeChip, setActiveChip] = useState('Highest AI Match');

  const filterChips = [
    'Highest AI Match',
    'Verified Royalty',
    '34+ Guna Sync',
    'London & Paris',
    'Architects & VCs',
  ];

  const currentProfile = MOCK_PROFILES[swipeIndex % MOCK_PROFILES.length];

  return (
    <div className="relative w-full min-h-screen bg-[#062E2A] text-white pb-28 pt-8 sm:pt-10 px-4 select-none overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-radial-gold opacity-20 blur-3xl pointer-events-none" />

      {/* Top Controls Header */}
      <div className="relative z-10 flex items-center justify-between py-2 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#D6A24A]" />
          <h1 className="font-serif text-2xl font-bold text-white">Discover Matches</h1>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center rounded-full bg-[#0E453F]/90 border border-[#D6A24A]/40 p-1">
          <button
            onClick={() => setDiscoverMode('swipe')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              discoverMode === 'swipe' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
            }`}
          >
            Swipe
          </button>
          <button
            onClick={() => setDiscoverMode('grid')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              discoverMode === 'grid' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setDiscoverMode('map')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              discoverMode === 'map' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {/* Filter Chips Reel & Filter Modal Button */}
      <div className="relative z-10 flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E453F] border border-[#D6A24A]/60 text-[#D6A24A] text-xs font-bold flex-shrink-0 hover:bg-[#D6A24A] hover:text-[#062E2A] transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>

        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border flex-shrink-0 transition-all ${
              activeChip === chip
                ? 'bg-gradient-to-r from-[#B88432] to-[#D6A24A] text-[#062E2A] font-bold border-[#D6A24A] shadow-gold-glow'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Mode 1: Swipe Cards View */}
      {discoverMode === 'swipe' && (
        <div className="relative z-10 flex flex-col items-center">
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
        </div>
      )}

      {/* Mode 2: Grid Gallery View */}
      {discoverMode === 'grid' && (
        <div className="relative z-10 grid grid-cols-2 gap-4">
          {MOCK_PROFILES.map((p) => (
            <GlassCard
              key={p.id}
              onClick={() => {
                setSelectedProfileId(p.id);
                setScreen('profile');
              }}
              className="p-3 group"
            >
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-2">
                <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#062E2A]/90 text-[#D6A24A] text-[10px] font-bold">
                  {p.aiMatchScore}%
                </div>
              </div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-[#D6A24A] transition-colors">{p.name}, {p.age}</h3>
              <p className="text-[11px] text-gray-300 line-clamp-1">{p.profession}</p>
              <p className="text-[10px] text-[#D6A24A] mt-1 font-semibold">{p.location}</p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Mode 3: Map Mode View */}
      {discoverMode === 'map' && (
        <div className="relative z-10 w-full h-[540px] rounded-[32px] overflow-hidden border border-[#D6A24A]/40 bg-[#0E453F] shadow-2xl relative">
          {/* Simulated Pixar Map Graphic Background */}
          <img
            src="/assets/3d/discover_magical_match.png"
            alt="Map Search"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062E2A]/50 via-transparent to-[#062E2A]/90" />

          {/* Map Pins for Matches */}
          <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDuration: '3s' }}>
            <div
              onClick={() => { setSelectedProfileId('p1'); setScreen('profile'); }}
              className="px-3 py-1.5 rounded-full bg-[#062E2A] border-2 border-[#D6A24A] text-white text-xs font-bold shadow-gold-halo cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D6A24A]" />
              <span>Aria (London) • 98%</span>
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDuration: '4s' }}>
            <div
              onClick={() => { setSelectedProfileId('p2'); setScreen('profile'); }}
              className="px-3 py-1.5 rounded-full bg-[#062E2A] border-2 border-[#D6A24A] text-white text-xs font-bold shadow-gold-halo cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D6A24A]" />
              <span>Devan (NYC) • 96%</span>
            </div>
          </div>

          <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{ animationDuration: '3.5s' }}>
            <div
              onClick={() => { setSelectedProfileId('p3'); setScreen('profile'); }}
              className="px-3 py-1.5 rounded-full bg-[#062E2A] border-2 border-[#D6A24A] text-white text-xs font-bold shadow-gold-halo cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D6A24A]" />
              <span>Natasha (Geneva) • 94%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
