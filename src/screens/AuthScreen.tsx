import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Mail, Phone, Lock, Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const AuthScreen: React.FC = () => {
  const { setScreen } = useAppStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('+44 7700 900077');
  const [email, setEmail] = useState('victoria@sterling.com');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('8899');

  const handleAuthSubmit = () => {
    if (!otpSent && method === 'phone') {
      setOtpSent(true);
      return;
    }
    setScreen('home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.confidentialBadge}>
          <ShieldCheck size={14} color={COLORS.accentGold} strokeWidth={2} />
          <Text style={styles.confidentialText}>STRICT CONFIDENTIALITY GUARANTEED</Text>
        </View>
      </View>

      <GlassCard style={styles.card}>
        <Text style={styles.titleText}>
          {authMode === 'login' ? 'Welcome Back' : 'Join Éternité'}
        </Text>
        <Text style={styles.subtext}>
          {authMode === 'login'
            ? 'Sign in to access your private match invitations'
            : 'Create your luxury matrimonial profile in minutes'}
        </Text>

        <View style={styles.pillContainer}>
          <TouchableOpacity
            onPress={() => setAuthMode('login')}
            style={[styles.pill, authMode === 'login' && styles.pillActive]}
          >
            <Text style={[styles.pillText, authMode === 'login' && styles.pillTextActive]}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAuthMode('signup')}
            style={[styles.pill, authMode === 'signup' && styles.pillActive]}
          >
            <Text style={[styles.pillText, authMode === 'signup' && styles.pillTextActive]}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.methodRow}>
          <TouchableOpacity
            onPress={() => { setMethod('phone'); setOtpSent(false); }}
            style={[styles.methodBtn, method === 'phone' && styles.methodBtnActive]}
          >
            <Phone size={14} color={method === 'phone' ? COLORS.accentGold : COLORS.mutedGray} strokeWidth={1.8} />
            <Text style={[styles.methodText, method === 'phone' && styles.methodTextActive]}>Phone OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMethod('email')}
            style={[styles.methodBtn, method === 'email' && styles.methodBtnActive]}
          >
            <Mail size={14} color={method === 'email' ? COLORS.accentGold : COLORS.mutedGray} strokeWidth={1.8} />
            <Text style={[styles.methodText, method === 'email' && styles.methodTextActive]}>Email</Text>
          </TouchableOpacity>
        </View>

        {method === 'phone' ? (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>MOBILE NUMBER</Text>
            <View style={styles.inputBox}>
              <Phone size={16} color={COLORS.accentGold} strokeWidth={1.8} />
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor={COLORS.mutedGray}
                style={styles.inputText}
              />
            </View>
          </View>
        ) : (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputBox}>
              <Mail size={16} color={COLORS.accentGold} strokeWidth={1.8} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor={COLORS.mutedGray}
                style={styles.inputText}
              />
            </View>
          </View>
        )}

        {method === 'phone' && otpSent && (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>4-DIGIT CODE</Text>
            <View style={styles.inputBox}>
              <Lock size={16} color={COLORS.accentGold} strokeWidth={1.8} />
              <TextInput
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
                placeholderTextColor={COLORS.mutedGray}
                style={[styles.inputText, { letterSpacing: 6, fontWeight: 'bold' }]}
              />
            </View>
          </View>
        )}

        <TouchableOpacity activeOpacity={0.88} onPress={handleAuthSubmit} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>
            {method === 'phone' && !otpSent ? 'Send Verification OTP' : 'Enter Private Lounge'}
          </Text>
          <ArrowRight size={16} color={COLORS.primary} strokeWidth={2.2} />
        </TouchableOpacity>
      </GlassCard>

      <TouchableOpacity onPress={() => setScreen('home')} style={styles.fingerprintBtn}>
        <Fingerprint size={20} color={COLORS.accentGold} strokeWidth={1.8} />
        <Text style={styles.fingerprintText}>Biometric Passcode Sign-In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.primary,
    justify: 'space-between',
    padding: SPACING.lg,
  },
  header: {
    paddingTop: SPACING.md,
    alignItems: 'center',
  },
  confidentialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  confidentialText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  card: {
    marginTop: SPACING.lg,
  },
  titleText: {
    ...TYPOGRAPHY.titleL,
    textAlign: 'center',
  },
  subtext: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: RADIUS.full,
    padding: 4,
    marginBottom: SPACING.md,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  pillText: {
    fontSize: 11,
    color: COLORS.mutedGray,
    fontWeight: '600',
  },
  pillTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  methodRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  methodBtnActive: {
    borderColor: COLORS.accentGold,
    backgroundColor: 'rgba(216, 168, 75, 0.1)',
  },
  methodText: {
    fontSize: 11,
    color: COLORS.mutedGray,
  },
  methodTextActive: {
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: SPACING.md,
  },
  inputText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: SPACING.sm,
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    marginTop: SPACING.xs,
    ...SHADOWS.goldGlow,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  fingerprintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  fingerprintText: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
});
