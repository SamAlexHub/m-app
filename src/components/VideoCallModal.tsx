import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';

export const VideoCallModal: React.FC = () => {
  const { videoCallActive, setVideoCallActive, activeChatProfileId } = useAppStore();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  if (!videoCallActive) return null;

  const profile = MOCK_PROFILES.find((p) => p.id === activeChatProfileId) || MOCK_PROFILES[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#062E2A] flex flex-col justify-between p-6 animate-fade-in select-none">
      {/* Background Remote Video Feed Mock */}
      <div className="absolute inset-0 z-0">
        <img
          src={profile.photos[0]}
          alt={profile.name}
          className={`w-full h-full object-cover transition-filter duration-300 ${videoOff ? 'blur-2xl opacity-40' : 'brightness-90'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Top Bar Overlay */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-[#D6A24A]/50 text-[#D6A24A] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted HD Call</span>
          </div>
        </div>

        {/* Self Camera Miniature */}
        <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-[#D6A24A]/60 shadow-2xl bg-black relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="You"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
        </div>
      </div>

      {/* Center Details */}
      <div className="relative z-10 text-center my-auto">
        <div className="w-24 h-24 rounded-full mx-auto p-[2px] bg-gradient-to-r from-[#D6A24A] to-[#F8E8CD] shadow-gold-halo mb-4">
          <img src={profile.photos[0]} alt={profile.name} className="w-full h-full rounded-full object-cover" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-white">{profile.name}</h2>
        <p className="text-xs text-[#D6A24A] mt-1 font-semibold tracking-wider uppercase">
          04:28 • Connected HD Voice & Video
        </p>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-10 flex items-center justify-center gap-6 pb-6">
        <button
          onClick={() => setMuted(!muted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
            muted ? 'bg-red-500/80 border-red-400 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
          }`}
        >
          {muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={() => setVideoCallActive(false)}
          className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl hover:bg-red-700 active:scale-95 transition-all"
        >
          <PhoneOff className="w-7 h-7" />
        </button>

        <button
          onClick={() => setVideoOff(!videoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
            videoOff ? 'bg-red-500/80 border-red-400 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
          }`}
        >
          {videoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};
