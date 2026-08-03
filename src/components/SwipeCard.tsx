import React from 'react';
import { Heart, X, Sparkles, ShieldCheck, MapPin, Briefcase, GraduationCap, Award, MessageCircle } from 'lucide-react';
import { Profile } from '../data/profiles';
import { GlassCard } from './GlassCard';

interface SwipeCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onOpenDetails: () => void;
  onStartChat: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onLike,
  onPass,
  onSuperLike,
  onOpenDetails,
  onStartChat,
}) => {
  return (
    <div className="relative w-full max-w-sm h-[540px] mx-auto select-none rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-[#D6A24A]/40 bg-[#0E453F]">
      {/* Background Main Image with overlay gradient */}
      <img
        src={profile.photos[0]}
        alt={profile.name}
        className="w-full h-full object-cover"
      />

      {/* Dark gradient overlay at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#062E2A] opacity-90" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          {profile.verified && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-[#D6A24A]/50 text-[#D6A24A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wide">Verified Royal</span>
            </div>
          )}
          <div className="px-3 py-1 rounded-full bg-[#0E453F]/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
            {profile.vipTier} VIP
          </div>
        </div>

        {/* AI Score Badge */}
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#D6A24A] to-[#B88432] text-[#062E2A] font-bold text-xs shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5 fill-[#062E2A]" />
          <span>{profile.aiMatchScore}% Match</span>
        </div>
      </div>

      {/* Profile Details Content at Bottom */}
      <div className="absolute bottom-20 left-4 right-4 z-20">
        <div onClick={onOpenDetails} className="cursor-pointer group">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-bold text-white group-hover:text-[#D6A24A] transition-colors flex items-center gap-2">
              {profile.name}, {profile.age}
            </h2>
            <span className="text-xs font-serif text-[#D6A24A] italic">{profile.horoscope.gunaScore} Guna Sync</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D6A24A]" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#D6A24A]" />
              <span>{profile.profession}</span>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-300 line-clamp-2 leading-relaxed font-sans">
            "{profile.bio}"
          </p>

          {/* Key Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-white border border-white/15">
              {profile.religion} • {profile.community}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-white border border-white/15">
              {profile.education.split(',')[0]}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D6A24A]/20 text-[#D6A24A] border border-[#D6A24A]/30 text-[11px]">
              {profile.horoscope.zodiac}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons Row */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-evenly z-30">
        <button
          onClick={onPass}
          className="w-12 h-12 rounded-full bg-[#062E2A]/90 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all transform active:scale-90 shadow-lg"
          title="Pass"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          onClick={onSuperLike}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D6A24A] to-[#F8E8CD] p-[1px] shadow-gold-glow transform active:scale-90"
          title="Super Like"
        >
          <div className="w-full h-full rounded-full bg-[#0E453F] flex items-center justify-center text-[#D6A24A] hover:bg-[#D6A24A] hover:text-[#062E2A] transition-colors">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
        </button>

        <button
          onClick={onLike}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-[#D6A24A] flex items-center justify-center text-white shadow-gold-halo transform active:scale-95 hover:scale-105 transition-all"
          title="Connect Interest"
        >
          <Heart className="w-7 h-7 fill-white" />
        </button>

        <button
          onClick={onStartChat}
          className="w-12 h-12 rounded-full bg-[#062E2A]/90 border border-[#D6A24A]/50 flex items-center justify-center text-[#D6A24A] hover:bg-[#D6A24A] hover:text-[#062E2A] transition-all transform active:scale-90 shadow-lg"
          title="Direct Message"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
