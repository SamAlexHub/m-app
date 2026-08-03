import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Crown, Sparkles, Check, ArrowLeft } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

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
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.badge}>
            <Crown size={12} color={COLORS.accentGold} strokeWidth={2} />
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
                    <Check size={14} color={COLORS.accentGold} strokeWidth={2} />
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
          activeOpacity={0.88}
          onPress={() => {
            setUserTier(selectedPlan);
            setScreen('home');
          }}
          style={styles.subBtn}
        >
          <Sparkles size={16} color={COLORS.primary} strokeWidth={2} />
          <Text style={styles.subBtnText}>Subscribe to {selectedPlan} Membership</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: SPACING.md,
    paddingTop: SPACING.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
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
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  badgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.full,
    padding: 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  toggleText: {
    fontSize: 10,
    color: COLORS.mutedGray,
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: COLORS.primary,
  },
  planCard: {
    marginBottom: SPACING.md,
  },
  planHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  planTag: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 8,
  },
  planName: {
    ...TYPOGRAPHY.titleM,
    fontSize: 20,
  },
  planPrice: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  planPer: {
    fontSize: 9,
    color: COLORS.lightGray,
  },
  featureList: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: SPACING.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  featureText: {
    ...TYPOGRAPHY.body,
    fontSize: 11,
  },
  bottomBar: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
  },
  subBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: SPACING.sm,
    ...SHADOWS.goldGlow,
  },
  subBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
