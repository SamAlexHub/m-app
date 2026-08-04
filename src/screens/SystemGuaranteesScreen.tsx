import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ShieldCheck, PhoneOff, Bell, Cpu, Undo, CreditCard, Workflow, Gift } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const SystemGuaranteesScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  const guarantees = [
    {
      icon: PhoneOff,
      title: 'No Unwanted Calls',
      text: 'We respect your privacy and never make unnecessary phone calls.',
    },
    {
      icon: Bell,
      title: 'Weekly Match Reminders',
      text: 'Receive a gentle reminder every week with your latest match updates.',
    },
    {
      icon: Cpu,
      title: 'Daily AI-Powered Matches',
      text: 'Discover a new AI-recommended profile every day based on your preferences.',
    },
    {
      icon: Undo,
      title: 'Cancel Anytime',
      text: 'You can pause or cancel your membership whenever you choose—no commitments.',
    },
    {
      icon: CreditCard,
      title: 'Affordable Monthly Plans',
      text: 'Choose from flexible monthly subscription plans designed to fit your budget.',
    },
    {
      icon: Workflow,
      title: '100% System-Driven Process',
      text: 'Our matchmaking process is fully automated, ensuring a fair, transparent, and unbiased experience.',
    },
    {
      icon: Gift,
      title: 'Earn Rewards by Referring Friends',
      text: 'Invite your friends and earn ₹200 for every successful referral.',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('settings')} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Guarantees</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Info card */}
        <GlassCard style={styles.infoCard}>
          <ShieldCheck size={20} color={COLORS.accentGold} strokeWidth={1.8} />
          <Text style={styles.infoText}>
            Our matchmaking process is automated, fair, and designed around user privacy and transparency.
          </Text>
        </GlassCard>

        {/* Guarantees list */}
        <View style={styles.list}>
          {guarantees.map((g, index) => {
            const Icon = g.icon;
            return (
              <GlassCard key={index} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.iconCircle}>
                    <Icon size={16} color={COLORS.accentGold} strokeWidth={2} style={{ alignSelf: 'center' }} />
                  </View>
                  <Text style={styles.itemTitle}>{g.title}</Text>
                </View>
                <Text style={styles.itemText}>{g.text}</Text>
              </GlassCard>
            );
          })}
        </View>

        {/* Footer info */}
        <Text style={styles.footerNote}>
          © 2026 Éternité Matrimonial Concierge Inc. All rights reserved.
        </Text>
      </ScrollView>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
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
    justifyContent: 'center',
    display: 'flex',
  },
  headerTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: 'rgba(14, 69, 63, 0.5)',
  },
  infoText: {
    ...TYPOGRAPHY.body,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.accentGoldLight,
  },
  list: {
    gap: SPACING.md,
  },
  itemCard: {
    padding: SPACING.md,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(216, 168, 75, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(216, 168, 75, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    flex: 1,
  },
  itemText: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.lightGray,
    paddingLeft: 40,
  },
  footerNote: {
    fontSize: 9,
    lineHeight: 13,
    color: COLORS.mutedGray,
    letterSpacing: 1.25,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});
