import React from 'react';
import { SlidersHorizontal, X, Sparkles, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const FilterSheetModal: React.FC = () => {
  const {
    filterModalOpen,
    setFilterModalOpen,
    ageRange,
    setAgeRange,
    selectedReligion,
    setSelectedReligion,
    selectedCountry,
    setSelectedCountry,
    minAstroScore,
    setMinAstroScore
  } = useAppStore();

  if (!filterModalOpen) return null;

  const religions = ['All Religions', 'Hindu', 'Christian', 'Muslim', 'Sikh', 'Jain', 'Parsi'];
  const regions = ['Global Elite', 'United Kingdom', 'United States', 'Switzerland', 'France', 'India', 'UAE / Dubai'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md bg-[#0E453F] border border-[#D6A24A]/40 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#D6A24A]" />
            <h3 className="font-serif text-xl font-bold text-white">Advanced Match Filters</h3>
          </div>
          <button
            onClick={() => setFilterModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Age Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#D6A24A] uppercase tracking-wider">Age Preference</label>
              <span className="text-xs font-bold text-white">{ageRange[0]} - {ageRange[1]} Years</span>
            </div>
            <input
              type="range"
              min="21"
              max="45"
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
              className="w-full accent-[#D6A24A] cursor-pointer"
            />
          </div>

          {/* Min Astro Kundali Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#D6A24A] uppercase tracking-wider">Astro Kundali Sync</label>
              <span className="text-xs font-bold text-white">{minAstroScore}+ / 36 Guna</span>
            </div>
            <input
              type="range"
              min="18"
              max="36"
              value={minAstroScore}
              onChange={(e) => setMinAstroScore(parseInt(e.target.value))}
              className="w-full accent-[#D6A24A] cursor-pointer"
            />
          </div>

          {/* Religion Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#D6A24A] mb-2 uppercase tracking-wider">
              Faith & Culture
            </label>
            <div className="flex flex-wrap gap-2">
              {religions.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedReligion(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedReligion === r
                      ? 'bg-[#D6A24A] text-[#062E2A] border-[#D6A24A] font-bold shadow-gold-glow'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Location / Country */}
          <div>
            <label className="block text-xs font-semibold text-[#D6A24A] mb-2 uppercase tracking-wider">
              Location & Diaspora
            </label>
            <div className="flex flex-wrap gap-2">
              {regions.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedCountry === c
                      ? 'bg-[#D6A24A] text-[#062E2A] border-[#D6A24A] font-bold shadow-gold-glow'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Only Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <h4 className="text-xs font-semibold text-white">Strict Verified Royal Profiles Only</h4>
              <p className="text-[11px] text-gray-400">Show only background-checked & biometrically verified members</p>
            </div>
            <div className="w-10 h-6 rounded-full bg-[#D6A24A] p-1 flex items-center justify-end cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-[#062E2A]" />
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setFilterModalOpen(false)}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-sm shadow-gold-halo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4 fill-[#062E2A]" />
            Apply Filters & View Matches
          </button>
        </div>
      </div>
    </div>
  );
};
