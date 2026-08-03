import React, { useState } from 'react';
import { ChevronRight, Sparkles, Shield, Heart, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Curated Genuine Matches',
      subtitle: 'Verified Global Elite',
      description: 'Connect with accomplished individuals and distinguished families across London, NYC, Paris, Dubai, and Mumbai.',
      image: '/assets/3d/onboarding_1_matches.png',
      badge: 'Bespoke Matchmaking',
      icon: Heart
    },
    {
      id: 2,
      title: 'AI Soulmate Compatibility',
      subtitle: '36-Guna Astro & Values Sync',
      description: 'Our proprietary algorithm harmonizes core life values, career ambitions, lifestyle habits, and Vedic astrology charts.',
      image: '/assets/3d/onboarding_2_ai.png',
      badge: '98% Match Precision',
      icon: Sparkles
    },
    {
      id: 3,
      title: 'Uncompromised Trust & Privacy',
      subtitle: '256-Bit Encrypted Shield',
      description: 'Enjoy Incognito mode, family-verified access shields, and end-to-end confidential video invitations.',
      image: '/assets/3d/onboarding_3_security.png',
      badge: 'Unmatched Privacy',
      icon: Shield
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setScreen('login');
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="relative w-full h-full min-h-screen bg-[#062E2A] flex flex-col justify-between p-6 select-none overflow-hidden">
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between pt-6">
        {currentSlide > 0 ? (
          <button
            onClick={() => setCurrentSlide(currentSlide - 1)}
            className="w-10 h-10 rounded-full bg-[#0E453F]/80 border border-white/10 flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-10 h-10" />
        )}

        <button
          onClick={() => setScreen('login')}
          className="text-xs font-semibold text-[#D6A24A] hover:text-white transition-colors uppercase tracking-widest"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Illustration Display */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-[#D6A24A]/40 bg-[#0E453F]">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#062E2A]/80" />

          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062E2A]/80 backdrop-blur-md border border-[#D6A24A]/50 text-[#D6A24A] text-xs font-semibold">
            <Icon className="w-3.5 h-3.5" />
            <span>{slide.badge}</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-8 max-w-sm">
          <span className="text-xs font-semibold text-[#D6A24A] tracking-widest uppercase">
            {slide.subtitle}
          </span>
          <h2 className="font-serif text-3xl font-bold text-white mt-1 leading-tight">
            {slide.title}
          </h2>
          <p className="text-xs text-gray-300 mt-3 leading-relaxed font-sans font-light">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-20 pb-8 flex flex-col items-center">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mb-6">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-[#D6A24A] shadow-gold-glow' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full max-w-xs py-4 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-sm shadow-gold-halo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 group"
        >
          <span>{currentSlide === slides.length - 1 ? 'Enter Éternité' : 'Continue'}</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
