import React, { useState } from 'react';
import { Crown, Sparkles, Check, ArrowLeft, ShieldCheck, Zap, Star } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const MembershipScreen: React.FC = () => {
  const { userTier, setUserTier, setScreen } = useAppStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'Gold' | 'Platinum' | 'Diamond'>('Diamond');

  const plans = [
    {
      id: 'Gold',
      name: 'Gold Privilege',
      priceMonthly: '$149',
      priceAnnual: '$89',
      tag: 'Essential Luxury',
      color: 'from-amber-700/40 via-[#D6A24A]/30 to-[#0E453F]',
      borderColor: 'border-[#D6A24A]/40',
      features: [
        'Direct Messaging & Audio Notes',
        'Verified Profile Badge',
        'Basic Astro Kundali Sync',
        'Filter by Country & Profession'
      ]
    },
    {
      id: 'Platinum',
      name: 'Platinum Elite',
      priceMonthly: '$299',
      priceAnnual: '$179',
      tag: 'Most Popular',
      color: 'from-cyan-900/40 via-emerald-800/40 to-[#0E453F]',
      borderColor: 'border-cyan-400/50',
      features: [
        'Everything in Gold',
        'Unlimited HD Video Calling',
        'Incognito Profile Shield',
        'Priority Search Boost (3x Views)',
        'Detailed 36-Guna Astro Report'
      ]
    },
    {
      id: 'Diamond',
      name: 'Diamond Concierge',
      priceMonthly: '$599',
      priceAnnual: '$349',
      tag: 'Royal VIP Service',
      color: 'from-[#B88432] via-[#D6A24A] to-[#F8E8CD]',
      borderColor: 'border-[#D6A24A]',
      isPopular: true,
      features: [
        'Everything in Platinum',
        'Dedicated European Senior Matchmaker',
        'Family Background Background Check',
        'Private Date Planner Concierge',
        'Unlimited Super Likes & Rewinds',
        'By-Invitation Only Events'
      ]
    }
  ];

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
          <Crown className="w-3.5 h-3.5" />
          <span>VIP Membership</span>
        </div>

        <div className="w-10 h-10" />
      </div>

      {/* 3D Pixar Crown Illustration Hero */}
      <div className="relative z-10 w-full h-44 rounded-[32px] overflow-hidden mb-6 shadow-2xl border border-[#D6A24A]/40 bg-[#0E453F]">
        <img
          src="/assets/3d/premium_membership_gold.png"
          alt="Membership Crown"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062E2A] via-[#062E2A]/70 to-transparent p-5 flex flex-col justify-center">
          <span className="text-[10px] text-[#D6A24A] font-bold uppercase tracking-widest">Éternité Privilege</span>
          <h2 className="font-serif text-2xl font-bold text-white max-w-xs leading-tight">Elevate Your Journey to Royalty</h2>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="relative z-10 flex items-center justify-center mb-6">
        <div className="flex rounded-full bg-[#0E453F] border border-[#D6A24A]/40 p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              billingCycle === 'monthly' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual' ? 'bg-[#D6A24A] text-[#062E2A] shadow-gold-glow' : 'text-gray-400'
            }`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 text-[#D6A24A] text-[9px] font-bold">
              Save 40%
            </span>
          </button>
        </div>
      </div>

      {/* Tier Cards Stack */}
      <div className="relative z-10 space-y-4 mb-6">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <GlassCard
              key={plan.id}
              glow={isSelected}
              onClick={() => setSelectedPlan(plan.id as any)}
              className={`p-6 transition-all border-2 ${
                isSelected ? `${plan.borderColor} bg-gradient-to-r ${plan.color}` : 'border-white/10 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#D6A24A] tracking-wider uppercase">{plan.tag}</span>
                  <h3 className="font-serif text-2xl font-bold text-white">{plan.name}</h3>
                </div>

                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#D6A24A]">
                    {billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-[10px] text-gray-300 block">/ month</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-200">
                    <Check className="w-4 h-4 text-[#D6A24A] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Subscribe Button */}
      <div className="relative z-10">
        <button
          onClick={() => {
            setUserTier(selectedPlan);
            setScreen('home');
          }}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-sm shadow-gold-halo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-[#062E2A]" />
          <span>Subscribe to {selectedPlan} Membership</span>
        </button>
      </div>
    </div>
  );
};
