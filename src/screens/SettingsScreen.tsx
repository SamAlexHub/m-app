import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, EyeOff, Lock, Users, Globe, HelpCircle, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const SettingsScreen: React.FC = () => {
  const { setScreen, incognitoMode, toggleIncognito, userTier } = useAppStore();
  const [selectedLanguage, setSelectedLanguage] = useState('English (UK)');

  return (
    <div className="relative w-full min-h-screen bg-[#062E2A] text-[#ffffff] pb-28 pt-8 sm:pt-10 px-4 select-none overflow-x-hidden">
      
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between py-2 mb-4">
        <button
          onClick={() => setScreen('profile')}
          className="w-10 h-10 rounded-full bg-[#0E453F] border border-white/15 flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E453F]/90 border border-[#D6A24A]/40 text-[#D6A24A] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Settings</span>
        </div>

        <div className="w-10 h-10" />
      </div>

      <div className="relative z-10 text-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">App Settings</h1>
        <p className="text-xs text-[#D6A24A] mt-0.5 font-semibold">Tier Status: {userTier} VIP Member</p>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Privacy & Incognito Section */}
        <div>
          <h3 className="text-xs font-bold text-[#D6A24A] uppercase tracking-wider mb-2">Privacy & Confidentiality</h3>
          <GlassCard className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeOff className="w-5 h-5 text-[#D6A24A]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Incognito Mode</h4>
                  <p className="text-[11px] text-gray-300">Only profiles you like can view your photos & identity</p>
                </div>
              </div>

              <button
                onClick={toggleIncognito}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  incognitoMode ? 'bg-[#D6A24A] shadow-gold-glow' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#062E2A] transition-transform ${
                    incognitoMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#D6A24A]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Family Access Shield</h4>
                  <p className="text-[11px] text-gray-300">Allow parents/family to view curated recommendations</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </GlassCard>
        </div>

        {/* Security & Authentication */}
        <div>
          <h3 className="text-xs font-bold text-[#D6A24A] uppercase tracking-wider mb-2">Security</h3>
          <GlassCard className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#D6A24A]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Face ID / Biometric Lock</h4>
                  <p className="text-[11px] text-gray-300">Require Face ID every time app launches</p>
                </div>
              </div>
              <div className="w-12 h-6 rounded-full bg-[#D6A24A] p-1 flex items-center justify-end">
                <div className="w-4 h-4 rounded-full bg-[#062E2A]" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Preferences & Language */}
        <div>
          <h3 className="text-xs font-bold text-[#D6A24A] uppercase tracking-wider mb-2">Preferences</h3>
          <GlassCard className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#D6A24A]" />
                <div>
                  <h4 className="text-xs font-bold text-white">App Language</h4>
                  <p className="text-[11px] text-gray-300">{selectedLanguage}</p>
                </div>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-[#062E2A] text-white text-xs p-1.5 rounded-xl border border-white/20 focus:outline-none"
              >
                <option value="English (UK)">English (UK)</option>
                <option value="Français">Français</option>
                <option value="Hindi / हिंदी">Hindi / हिंदी</option>
                <option value="Español">Español</option>
                <option value="العربية">العربية</option>
              </select>
            </div>
          </GlassCard>
        </div>

        {/* VIP Support */}
        <div>
          <h3 className="text-xs font-bold text-[#D6A24A] uppercase tracking-wider mb-2">24/7 VIP Assistance</h3>
          <GlassCard className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#D6A24A]" />
              <div>
                <h4 className="text-xs font-bold text-white">Contact Senior Concierge</h4>
                <p className="text-[11px] text-gray-300">Direct dedicated European matchmaking line</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </GlassCard>
        </div>

        {/* Log Out */}
        <button
          onClick={() => setScreen('login')}
          className="w-full py-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Éternité</span>
        </button>
      </div>
    </div>
  );
};
