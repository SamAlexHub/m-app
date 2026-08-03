import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Crown, Sparkles, Check, ArrowLeft } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const MembershipScreen: React.FC = () => {
  const { setUserTier, setScreen } = useAppStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'Gold' | 'Platinum' | 'Diamond'>('Diamond');

  const plans = [
    {
      id: 'Gold',
      name: 'Gold Privilege',
      priceMonthly: '$149',
      priceAnnual: '$89',
      tag: 'ESSENTIAL LUXURY',
      features: [
        'Direct Messaging & Audio Notes',
        'Verified Profile Badge',
        'Basic Astro Kundali Sync',
      ]
    },
    {
      id: 'Platinum',
      name: 'Platinum Elite',
      priceMonthly: '$299',
      priceAnnual: '$179',
      tag: 'MOST POPULAR',
      features: [
        'Everything in Gold',
        'Unlimited HD Video Calling',
        'Incognito Profile Shield',
      ]
    },
    {
      id: 'Diamond',
      name: 'Diamond Concierge',
      priceMonthly: '$599',
      priceAnnual: '$349',
      tag: 'ROYAL VIP SERVICE',
      features: [
        'Everything in Platinum',
        'Dedicated Senior Matchmaker',
        'Private Date Planner Concierge',
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
            <ArrowLeft size={18} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.badge}>
            <Crown size={12} color="#D6A24A" />
            <Text style={styles.badgeText}>VIP MEMBERSHIP</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setBillingCycle('monthly')}
            style={[styles.toggleBtn, billingCycle === 'monthly' && styles.toggleBtnActive]}
          >
            <Text style={[styles.toggleText, billingCycle === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBillingCycle('annual')}
            style={[styles.toggleBtn, billingCycle === 'annual' && styles.toggleBtnActive]}
          >
            <Text style={[styles.toggleText, billingCycle === 'annual' && styles.toggleTextActive]}>Annual (Save 40%)</Text>
          </TouchableOpacity>
        </View>

        {/* Cards */}
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <GlassCard
              key={plan.id}
              glow={isSelected}
              onClick={() => setSelectedPlan(plan.id as any)}
              style={styles.planCard}
            >
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planTag}>{plan.tag}</Text>
                  <Text style={styles.planName}>{plan.name}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.planPrice}>
                    {billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly}
                  </Text>
                  <Text style={styles.planPer}>/ month</Text>
                </View>
              </View>

              <View style={styles.featureList}>
                {plan.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Check size={14} color="#D6A24A" />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          );
        })}
      </ScrollView>

      {/* Subscribe Footer */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            setUserTier(selectedPlan);
            setScreen('home');
          }}
          style={styles.subBtn}
        >
          <Sparkles size={16} color="#062E2A" />
          <Text style={styles.subBtnText}>Subscribe to {selectedPlan} Membership</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justify: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#0E453F',
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#D6A24A',
  },
  toggleText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#062E2A',
  },
  planCard: {
    marginBottom: 12,
  },
  planHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planTag: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  planName: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  planPrice: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  planPer: {
    fontSize: 8,
    color: '#D1D5DB',
  },
  featureList: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 11,
    color: '#D1D5DB',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  subBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D6A24A',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    elevation: 6,
  },
  subBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#062E2A',
  },
});
