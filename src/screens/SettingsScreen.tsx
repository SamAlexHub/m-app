import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ShieldCheck, EyeOff, Lock, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const SettingsScreen: React.FC = () => {
  const { setScreen, incognitoMode, toggleIncognito, userTier } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('profile')} style={styles.backBtn}>
          <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.badge}>
          <ShieldCheck size={12} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.badgeText}>PRIVACY & SETTINGS</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <Text style={styles.title}>App Settings</Text>
      <Text style={styles.sub}>Tier Status: {userTier} VIP Member</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>PRIVACY & CONFIDENTIALITY</Text>
        <GlassCard style={styles.card}>
          <View style={styles.row}>
            <EyeOff size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Incognito Mode</Text>
              <Text style={styles.rowSub}>Only profiles you like can view your photos</Text>
            </View>
            <TouchableOpacity onPress={toggleIncognito} style={[styles.toggleTrack, incognitoMode && styles.toggleTrackActive]}>
              <View style={[styles.toggleThumb, incognitoMode && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>SECURITY</Text>
        <GlassCard style={styles.card}>
          <View style={styles.row}>
            <Lock size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Face ID / Biometric Lock</Text>
              <Text style={styles.rowSub}>Require Face ID every time app launches</Text>
            </View>
            <View style={[styles.toggleTrack, styles.toggleTrackActive]}>
              <View style={[styles.toggleThumb, styles.toggleThumbActive]} />
            </View>
          </View>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>PREFERENCES</Text>
        <GlassCard style={styles.card}>
          <View style={styles.row}>
            <Globe size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>App Language</Text>
              <Text style={styles.rowSub}>English (UK)</Text>
            </View>
            <ChevronRight size={16} color={COLORS.mutedGray} strokeWidth={1.8} />
          </View>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>24/7 VIP ASSISTANCE</Text>
        <GlassCard style={styles.card}>
          <View style={styles.row}>
            <HelpCircle size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Contact Senior Concierge</Text>
              <Text style={styles.rowSub}>Direct dedicated European line</Text>
            </View>
            <ChevronRight size={16} color={COLORS.mutedGray} strokeWidth={1.8} />
          </View>
        </GlassCard>
      </View>

      <TouchableOpacity onPress={() => setScreen('login')} style={styles.signOutBtn}>
        <LogOut size={16} color={COLORS.redAccent} strokeWidth={1.8} />
        <Text style={styles.signOutText}>Sign Out of Éternité</Text>
      </TouchableOpacity>
    </ScrollView>
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
  title: {
    ...TYPOGRAPHY.titleL,
    fontSize: 24,
    textAlign: 'center',
  },
  sub: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
    marginBottom: 6,
  },
  card: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  textCol: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  rowSub: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    marginTop: 2,
  },
  toggleTrack: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackActive: {
    backgroundColor: COLORS.accentGold,
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginTop: SPACING.md,
  },
  signOutText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.redAccent,
  },
});
