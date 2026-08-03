import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ShieldAlert } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const TermsConditionsScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  const sections = [
    {
      title: '1. Admission & Eligibility Criteria',
      text: 'Éternité is a private matrimonial service reserved strictly for high-net-worth families, royalty, and accomplished professionals. Membership is conditional upon completing ID verification audits. We reserve the right to decline applications without prior notice.',
    },
    {
      title: '2. Member Code of Conduct',
      text: 'Members must engage with prospective partners in a respectful, transparent, and matrimonial-focused manner. Committing to private date appointments booked via our Concierge planners constitutes a formal engagement; unexcused absences may result in immediate tier downgrades.',
    },
    {
      title: '3. Photo Copyright & Snapshot Protections',
      text: 'All candidate photo materials are protected by Éternité biometric shields. Attempting to copy, screenshot, download, or screen-record profile cards violates user agreements. Breach of this clause is subject to immediate account termination and permanent bans.',
    },
    {
      title: '4. Government ID Auditing & Encryption',
      text: 'Identity verification documents (passports, corporate registers) uploaded during profile completion are safely stored in fully encrypted database vaults. These documents are exclusively examined by our European Concierge team and are never shared with other users.',
    },
    {
      title: '5. Matrimonial Disclaimer',
      text: 'While Éternité implements rigorous values, zodiac, and background audits to compute AI Soulmate scores, we do not guarantee marriage success. Our service provides premium facilitation; the final assessment remains with the members.',
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
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Warning pill */}
        <GlassCard style={styles.warningCard}>
          <ShieldAlert size={20} color={COLORS.accentGold} strokeWidth={1.8} />
          <Text style={styles.warningText}>
            Please review the legal and safety bylaws of Éternité luxury matrimonial community.
          </Text>
        </GlassCard>

        {/* Sections list */}
        <View style={styles.list}>
          {sections.map((sec, index) => (
            <View key={index} style={styles.secBlock}>
              <Text style={styles.secTitle}>{sec.title}</Text>
              <Text style={styles.secText}>{sec.text}</Text>
            </View>
          ))}
        </View>

        {/* Footer info */}
        <Text style={styles.footerNote}>
          Last Updated: August 2026. © Éternité Matrimonial Concierge Inc. All rights reserved.
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: 'rgba(216, 168, 75, 0.06)',
    borderColor: 'rgba(216, 168, 75, 0.25)',
    marginBottom: SPACING.lg,
  },
  warningText: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    color: COLORS.white,
    flex: 1,
    lineHeight: 16,
  },
  list: {
    gap: SPACING.md,
  },
  secBlock: {
    marginBottom: SPACING.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  secTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    marginBottom: 6,
  },
  secText: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    lineHeight: 16,
    color: COLORS.lightGray,
  },
  footerNote: {
    fontSize: 8,
    color: COLORS.mutedGray,
    textAlign: 'center',
    marginTop: SPACING.lg,
    letterSpacing: 0.5,
  },
});
