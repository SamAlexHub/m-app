import React, { useEffect } from 'react';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  return (
    <div className="relative w-full h-full min-h-screen bg-[#062E2A] flex flex-col justify-between p-6 overflow-hidden select-none">
      {/* Background Pixar Illustration with soft vignetting */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/3d/splash_hero_3d.png"
          alt="Éternité Splash"
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062E2A]/70 via-[#062E2A]/40 to-[#062E2A]" />
      </div>

      {/* Floating Ambient Glowing Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-radial-gold opacity-60 pointer-events-none blur-2xl" />

      {/* Top Brand Tagline */}
      <div className="relative z-10 pt-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E453F]/80 backdrop-blur-md border border-[#D6A24A]/40 text-[#D6A24A] text-xs font-semibold tracking-widest uppercase shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Apple of Luxury Matrimony</span>
        </div>
      </div>

      {/* Center Logo Emblem */}
      <div className="relative z-10 text-center my-auto flex flex-col items-center">
        <div className="relative group cursor-pointer" onClick={() => setScreen('onboarding')}>
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#B88432] via-[#D6A24A] to-[#F8E8CD] p-[3px] shadow-[0_0_50px_rgba(214,162,74,0.6)] animate-pulse">
            <div className="w-full h-full rounded-full bg-[#062E2A] flex items-center justify-center">
              <Heart className="w-14 h-14 text-[#D6A24A] fill-[#D6A24A]/20" />
            </div>
          </div>
          {/* Subtle surrounding ring */}
          <div className="absolute -inset-3 rounded-full border border-[#D6A24A]/30 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <h1 className="font-serif text-5xl font-bold text-white tracking-wider mt-6">ÉTERNITÉ</h1>
        <p className="font-sans text-xs text-[#D6A24A] tracking-[0.3em] uppercase mt-2 font-medium">
          Haute Matrimonie • International
        </p>

        <p className="text-sm text-gray-300 max-w-xs mt-4 font-sans leading-relaxed font-light">
          Where love, family values, and timeless elegance unite across global horizons.
        </p>
      </div>

      {/* Bottom Start Action Button */}
      <div className="relative z-10 pb-8 flex flex-col items-center">
        <button
          onClick={() => setScreen('onboarding')}
          className="w-full max-w-xs py-4 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-sm shadow-gold-halo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Begin Your Love Story</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-[10px] text-gray-400 mt-4 tracking-wider">
          PRIVACY & TRUST VERIFIED • BY INVITATION ONLY
        </span>
      </div>
    </div>
  );
};
