import React, { useState } from 'react';
import { Mail, Phone, Lock, Sparkles, Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const AuthScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('+44 7700 900077');
  const [email, setEmail] = useState('victoria@sterling.com');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('8899');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent && method === 'phone') {
      setOtpSent(true);
      return;
    }
    setScreen('home');
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#062E2A] flex flex-col justify-between p-6 select-none overflow-hidden">
      {/* Background Pixar Parisian Balcony Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/3d/login_luxury_scene.png"
          alt="Luxury Login Scene"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062E2A]/80 via-[#062E2A]/70 to-[#062E2A]" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0E453F]/90 border border-[#D6A24A]/40 text-[#D6A24A] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Confidentiality Guaranteed</span>
        </div>
      </div>

      {/* Auth Card Container */}
      <div className="relative z-10 my-auto w-full max-w-md mx-auto">
        <GlassCard className="p-7">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl font-bold text-white">
              {authMode === 'login' ? 'Welcome Back' : 'Join Éternité'}
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              {authMode === 'login'
                ? 'Sign in to access your private match invitations'
                : 'Create your luxury matrimonial profile in minutes'}
            </p>

            {/* Toggle Mode Pills */}
            <div className="flex rounded-full bg-white/5 p-1 border border-white/10 mt-4">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                  authMode === 'login' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                  authMode === 'signup' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* Method Selectors */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setMethod('phone'); setOtpSent(false); }}
                className={`flex-1 py-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 ${
                  method === 'phone' ? 'border-[#D6A24A] text-[#D6A24A] bg-[#D6A24A]/10' : 'border-white/10 text-gray-400'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone OTP</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 ${
                  method === 'email' ? 'border-[#D6A24A] text-[#D6A24A] bg-[#D6A24A]/10' : 'border-white/10 text-gray-400'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>

            {/* Phone Input or Email Input */}
            {method === 'phone' ? (
              <div>
                <label className="block text-xs font-medium text-[#D6A24A] mb-1">Mobile Number</label>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/15 text-white">
                  <Phone className="w-4 h-4 text-[#D6A24A]" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-transparent text-sm text-white focus:outline-none w-full font-sans"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-[#D6A24A] mb-1">Email Address</label>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/15 text-white">
                  <Mail className="w-4 h-4 text-[#D6A24A]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-sm text-white focus:outline-none w-full font-sans"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>
            )}

            {/* OTP Input if Phone Sent */}
            {method === 'phone' && otpSent && (
              <div className="animate-fade-in">
                <label className="block text-xs font-medium text-[#D6A24A] mb-1">Enter 4-Digit Security Code</label>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-[#D6A24A]/60 text-white">
                  <Lock className="w-4 h-4 text-[#D6A24A]" />
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-transparent text-sm font-bold tracking-widest text-white focus:outline-none w-full"
                  />
                </div>
              </div>
            )}

            {/* Action Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-sm shadow-gold-halo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{method === 'phone' && !otpSent ? 'Send Verification OTP' : 'Enter Private Lounge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Sign-In Divider */}
          <div className="mt-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest text-gray-400">or sign in with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                onClick={() => setScreen('home')}
                className="py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span> Apple ID</span>
              </button>
              <button
                onClick={() => setScreen('home')}
                className="py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>G Google</span>
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Footer Biometrics */}
      <div className="relative z-10 pb-6 text-center">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-[#D6A24A] transition-colors"
        >
          <Fingerprint className="w-5 h-5 text-[#D6A24A]" />
          <span>Biometric Passcode Sign-In</span>
        </button>
      </div>
    </div>
  );
};
