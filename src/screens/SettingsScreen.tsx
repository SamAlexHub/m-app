import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ShieldCheck, EyeOff, Lock, Globe, LogOut, ChevronRight, Crown, FileText } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const SettingsScreen: React.FC = () => {
  const { setScreen, incognitoMode, toggleIncognito, userTier } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
          <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
        <View style={styles.badge}>
          <ShieldCheck size={12} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.badgeText}>PRIVACY & SETTINGS</Text>
        </View>
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
        <Text style={styles.sectionHeader}>LEGAL & INFORMATION</Text>
        <GlassCard style={styles.card}>
          <TouchableOpacity onPress={() => setScreen('our-speciality')} style={styles.row}>
            <Crown size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Our Speciality</Text>
              <Text style={styles.rowSub}>The 4 pillars of Éternité matchmaking</Text>
            </View>
            <ChevronRight size={16} color={COLORS.mutedGray} strokeWidth={1.8} />
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.08)', marginVertical: 12 }} />

          <TouchableOpacity onPress={() => setScreen('terms-conditions')} style={styles.row}>
            <FileText size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Terms & Conditions</Text>
              <Text style={styles.rowSub}>Matrimonial legal & security policies</Text>
            </View>
            <ChevronRight size={16} color={COLORS.mutedGray} strokeWidth={1.8} />
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.08)', marginVertical: 12 }} />

          <TouchableOpacity onPress={() => setScreen('system-guarantees')} style={styles.row}>
            <ShieldCheck size={18} color={COLORS.accentGold} strokeWidth={1.8} />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>System Guarantees</Text>
              <Text style={styles.rowSub}>Our 7 promises & match guarantees</Text>
            </View>
            <ChevronRight size={16} color={COLORS.mutedGray} strokeWidth={1.8} />
          </TouchableOpacity>
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
    justifyContent: 'flex-start',
    gap: SPACING.sm,
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
    justifyContent: 'center',
    display: 'flex',
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
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.45)',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    marginTop: SPACING.xl,
    width: '64%',
  },
  signOutText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.redAccent,
  },
});
