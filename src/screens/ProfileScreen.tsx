import React, { useState } from 'react';
import { ArrowLeft, Heart, ShieldCheck, MapPin, Briefcase, GraduationCap, Sparkles, Compass, Star, Calendar, MessageCircle, Share2, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';

export const ProfileScreen: React.FC = () => {
  const { selectedProfileId, setScreen, setDatePlannerOpen, setVideoCallActive, shortlistedIds, toggleShortlist } = useAppStore();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const profile = MOCK_PROFILES.find((p) => p.id === selectedProfileId) || MOCK_PROFILES[0];
  const isShortlisted = shortlistedIds.includes(profile.id);

  return (
    <div className="relative w-full min-h-screen bg-[#062E2A] text-white pb-32 select-none overflow-x-hidden">
      
      {/* Cover Image Parallax Header */}
      <div className="relative w-full h-80 bg-[#0E453F]">
        <img
          src={profile.coverPhoto}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#062E2A]" />

        {/* Top Floating Action Bar */}
        <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-20">
          <button
            onClick={() => setScreen('discover')}
            className="w-10 h-10 rounded-full bg-[#062E2A]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleShortlist(profile.id)}
              className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
                isShortlisted ? 'bg-red-500/80 border-red-400 text-white' : 'bg-[#062E2A]/80 border-white/20 text-gray-300'
              }`}
            >
              <Heart className={`w-5 h-5 ${isShortlisted ? 'fill-white' : ''}`} />
            </button>

            <button className="w-10 h-10 rounded-full bg-[#062E2A]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Info Card Overlay */}
      <div className="relative z-10 -mt-16 px-4">
        <GlassCard glow className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-3xl font-bold text-white">{profile.name}, {profile.age}</h1>
                {profile.verified && (
                  <ShieldCheck className="w-6 h-6 text-[#D6A24A]" />
                )}
              </div>
              <p className="text-xs text-[#D6A24A] font-semibold mt-0.5">{profile.profession} at {profile.company}</p>
              <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#D6A24A]" />
                <span>{profile.location}</span>
                <span>• {profile.height}</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <CircularScore score={profile.aiMatchScore} size={90} label="AI Soulmate Match" />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-200 leading-relaxed font-sans font-light border-t border-white/10 pt-3">
            "{profile.bio}"
          </p>
        </GlassCard>

        {/* Photo Gallery Grid */}
        <div className="mt-6">
          <h3 className="font-serif text-lg font-bold text-white mb-3">Photo Gallery</h3>
          <div className="grid grid-cols-4 gap-2">
            {profile.photos.map((photo, index) => (
              <div
                key={index}
                onClick={() => setSelectedPhoto(photo)}
                className="w-full h-24 rounded-2xl overflow-hidden border border-white/15 cursor-pointer hover:border-[#D6A24A] transition-all shadow-md"
              >
                <img src={photo} alt={`Gallery ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        {/* Astro Kundali & Horoscope Compatibility */}
        <div className="mt-6">
          <h3 className="font-serif text-lg font-bold text-white mb-3">Astro Kundali Compatibility</h3>
          <GlassCard className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Guna Score</span>
                <span className="font-serif text-xl font-bold text-[#D6A24A]">{profile.horoscope.gunaScore}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Sun Zodiac</span>
                <span className="font-sans text-sm font-bold text-white">{profile.horoscope.zodiac}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Nakshatra</span>
                <span className="font-sans text-sm font-bold text-white">{profile.horoscope.nakshatra}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Rashi</span>
                <span className="font-sans text-sm font-bold text-white">{profile.horoscope.rashi}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Career & Education Details */}
        <div className="mt-6">
          <h3 className="font-serif text-lg font-bold text-white mb-3">Career & Education</h3>
          <GlassCard className="p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-[#D6A24A] mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">{profile.profession}</h4>
                <p className="text-xs text-gray-300">{profile.company}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <GraduationCap className="w-5 h-5 text-[#D6A24A] mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">{profile.education}</h4>
                <p className="text-xs text-gray-300">Verified Alumni Credentials</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Family Roots & Heritage */}
        <div className="mt-6">
          <h3 className="font-serif text-lg font-bold text-white mb-3">Family Background</h3>
          <GlassCard className="p-5 space-y-2 text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Background</span>
              <span className="font-semibold text-white">{profile.familyDetails.background}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Father</span>
              <span className="font-semibold text-white">{profile.familyDetails.father}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Mother</span>
              <span className="font-semibold text-white">{profile.familyDetails.mother}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-400">Family Location</span>
              <span className="font-semibold text-white">{profile.familyDetails.location}</span>
            </div>
          </GlassCard>
        </div>

        {/* Life Timeline */}
        <div className="mt-6">
          <h3 className="font-serif text-lg font-bold text-white mb-3">Life Journey & Goals</h3>
          <GlassCard className="p-5 space-y-4">
            {profile.timeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="px-2 py-1 rounded-full bg-[#D6A24A]/20 border border-[#D6A24A] text-[#D6A24A] text-[10px] font-bold">
                  {item.year}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Floating Bottom Fixed Action Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40">
        <div className="rounded-full bg-[#0E453F]/95 backdrop-blur-2xl border border-[#D6A24A]/50 p-2.5 flex items-center justify-evenly shadow-2xl">
          <button
            onClick={() => setScreen('chat')}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-[#062E2A]" />
            <span>Chat Message</span>
          </button>

          <button
            onClick={() => setDatePlannerOpen(true)}
            className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/20"
          >
            <Calendar className="w-4 h-4 text-[#D6A24A]" />
            <span>Book Date</span>
          </button>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <img src={selectedPhoto} alt="Full view" className="max-w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl" />
        </div>
      )}
    </div>
  );
};
