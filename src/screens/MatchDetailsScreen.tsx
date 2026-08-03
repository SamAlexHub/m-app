import React from 'react';
import { ArrowLeft, Sparkles, Heart, ShieldCheck, Calendar, Video, MessageCircle, CheckCircle2, Star, Zap } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';

export const MatchDetailsScreen: React.FC = () => {
  const { selectedProfileId, setScreen, setDatePlannerOpen, setVideoCallActive } = useAppStore();

  const profile = MOCK_PROFILES.find((p) => p.id === selectedProfileId) || MOCK_PROFILES[0];
  const radar = profile.compatibilityRadar;

  const radarItems = [
    { label: 'Core Life Values', score: radar.values, desc: 'Shared family tradition & integrity' },
    { label: 'Lifestyle & Travel', score: radar.lifestyle, desc: 'European luxury & equestrian interests' },
    { label: 'Communication Style', score: radar.communication, desc: 'High emotional intelligence & empathy' },
    { label: 'Future Aspirations', score: radar.futureGoals, desc: 'Aligned international career & home goals' },
    { label: 'Astro Kundali Sync', score: radar.astroSync, desc: `${profile.horoscope.gunaScore} Guna Match` },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#062E2A] text-white pb-32 pt-8 sm:pt-10 px-4 select-none overflow-x-hidden">
      
      {/* Top Navigation */}
      <div className="relative z-10 flex items-center justify-between py-2 mb-4">
        <button
          onClick={() => setScreen('home')}
          className="w-10 h-10 rounded-full bg-[#0E453F] border border-white/15 flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E453F]/90 border border-[#D6A24A]/40 text-[#D6A24A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Compatibility Report</span>
        </div>

        <div className="w-10 h-10" />
      </div>

      {/* Hero Circular Compatibility Header */}
      <GlassCard glow className="p-6 text-center mb-6">
        <div className="flex flex-col items-center justify-center">
          <CircularScore score={profile.aiMatchScore} size={120} strokeWidth={9} />
          <h2 className="font-serif text-2xl font-bold text-white mt-4">
            {profile.name} & Devan
          </h2>
          <p className="text-xs text-[#D6A24A] font-semibold tracking-wider uppercase mt-0.5">
            Exceptional 98% Soulmate Resonance
          </p>

          <p className="text-xs text-gray-300 mt-3 max-w-xs leading-relaxed font-sans font-light">
            Our AI engine evaluated over 140 psychological, astrological, and lifestyle parameters to compute this match score.
          </p>
        </div>
      </GlassCard>

      {/* 5-Axis Compatibility Breakdown */}
      <div className="mb-6">
        <h3 className="font-serif text-lg font-bold text-white mb-3">5-Axis Compatibility Matrix</h3>
        <GlassCard className="p-5 space-y-4">
          {radarItems.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-white">{item.label}</span>
                <span className="font-serif font-bold text-[#D6A24A]">{item.score}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] transition-all duration-1000"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">{item.desc}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Deep AI Relationship Insights */}
      <div className="mb-6">
        <h3 className="font-serif text-lg font-bold text-white mb-3">AI Matchmaker Narrative</h3>
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#D6A24A] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Why You Two Connect</h4>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                Both of you prioritize family harmony alongside international career growth. Aria’s artistic vision complements your venture investment background smoothly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-white/10 pt-3">
            <Star className="w-5 h-5 text-[#D6A24A] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Astro Kundali Alignment</h4>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                34 out of 36 Guna points matched (Chitra & Magha Nakshatras). Zero Manglik dosha conflicts detected. Excellent long-term prosperity indicator.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Future Prediction & Vision Cards */}
      <div className="mb-6">
        <h3 className="font-serif text-lg font-bold text-white mb-3">Future Vision Alignment</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-wider">Family</span>
            <h4 className="text-xs font-semibold text-white mt-1">Shared Commitment</h4>
            <p className="text-[11px] text-gray-300 mt-1">Both desire an international family environment grounded in traditional warmth.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-wider">Lifestyle</span>
            <h4 className="text-xs font-semibold text-white mt-1">European & Global</h4>
            <p className="text-[11px] text-gray-300 mt-1">Frequent travel between London, Lake Como, NYC, and New Delhi.</p>
          </div>
        </div>
      </div>

      {/* Action Floating Footer */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40">
        <div className="rounded-full bg-[#0E453F]/95 backdrop-blur-2xl border border-[#D6A24A]/50 p-2.5 flex items-center justify-evenly shadow-2xl">
          <button
            onClick={() => setDatePlannerOpen(true)}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 fill-[#062E2A]" />
            <span>Invite to Date</span>
          </button>

          <button
            onClick={() => setVideoCallActive(true)}
            className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/20"
          >
            <Video className="w-4 h-4 text-[#D6A24A]" />
            <span>HD Video Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
