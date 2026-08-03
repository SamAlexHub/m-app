import React from 'react';
import { ArrowLeft, Heart, Sparkles, MapPin, Calendar, Quote, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { SUCCESS_STORIES } from '../data/successStories';
import { GlassCard } from '../components/GlassCard';

export const SuccessStoriesScreen: React.FC = () => {
  const { setScreen } = useAppStore();

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
          <Heart className="w-3.5 h-3.5 fill-[#D6A24A]" />
          <span>Royal Nuptials</span>
        </div>

        <div className="w-10 h-10" />
      </div>

      {/* Hero Header */}
      <div className="relative z-10 text-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Couples United by Éternité</h1>
        <p className="text-xs text-[#D6A24A] mt-1 font-semibold tracking-wider">
          Real Love Stories • Real European Weddings
        </p>
      </div>

      {/* Success Stories List */}
      <div className="relative z-10 space-y-6">
        {SUCCESS_STORIES.map((story) => (
          <GlassCard key={story.id} glow className="p-6">
            {/* Story Image */}
            <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4 border border-[#D6A24A]/40">
              <img src={story.coverImage} alt={story.coupleNames} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#062E2A]/90 text-[#D6A24A] text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{story.matchScore}% AI Soulmate Match</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-2">
              <h2 className="font-serif text-2xl font-bold text-white">{story.coupleNames}</h2>
              <span className="text-xs text-[#D6A24A] font-semibold">{story.weddingDate}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-300 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#D6A24A]" />
              <span>{story.location}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 italic text-xs text-gray-200 leading-relaxed relative">
              <Quote className="w-6 h-6 text-[#D6A24A]/30 absolute top-2 right-2" />
              "{story.quote}"
            </div>

            {/* Timeline Breakdown */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <h4 className="font-serif text-sm font-bold text-white mb-3">Wedding Journey Timeline</h4>
              <div className="space-y-3">
                {story.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="px-2.5 py-1 rounded-full bg-[#D6A24A]/20 border border-[#D6A24A] text-[#D6A24A] font-bold text-[10px]">
                      {step.phase}
                    </div>
                    <div>
                      <span className="font-semibold text-white">{step.title}</span>
                      <span className="text-[10px] text-gray-400 block">{step.date} • {step.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
