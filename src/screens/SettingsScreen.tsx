import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ShieldCheck, EyeOff, Lock, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const SettingsScreen: React.FC = () => {
  const { setScreen, incognitoMode, toggleIncognito, userTier } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('profile')} style={styles.backBtn}>
          <ArrowLeft size={18} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.badge}>
          <ShieldCheck size={12} color="#D6A24A" />
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
            <EyeOff size={18} color="#D6A24A" />
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
            <Lock size={18} color="#D6A24A" />
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
            <Globe size={18} color="#D6A24A" />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>App Language</Text>
              <Text style={styles.rowSub}>English (UK)</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </View>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>24/7 VIP ASSISTANCE</Text>
        <GlassCard style={styles.card}>
          <View style={styles.row}>
            <HelpCircle size={18} color="#D6A24A" />
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Contact Senior Concierge</Text>
              <Text style={styles.rowSub}>Direct dedicated European line</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </View>
        </GlassCard>
      </View>

      <TouchableOpacity onPress={() => setScreen('login')} style={styles.signOutBtn}>
        <LogOut size={16} color="#EF4444" />
        <Text style={styles.signOutText}>Sign Out of Éternité</Text>
      </TouchableOpacity>
    </ScrollView>
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
  title: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  sub: {
    fontSize: 11,
    color: '#D6A24A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 16,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
    marginBottom: 6,
  },
  card: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textCol: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rowSub: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
  },
  toggleTrack: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 2,
    justify: 'center',
  },
  toggleTrackActive: {
    backgroundColor: '#D6A24A',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#062E2A',
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
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginTop: 16,
  },
  signOutText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EF4444',
  },
});
