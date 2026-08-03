import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Mail, Phone, Lock, Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react-native';
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
          <ShieldCheck size={14} color="#D6A24A" />
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
            <Phone size={14} color={method === 'phone' ? '#D6A24A' : '#9CA3AF'} />
            <Text style={[styles.methodText, method === 'phone' && styles.methodTextActive]}>Phone OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMethod('email')}
            style={[styles.methodBtn, method === 'email' && styles.methodBtnActive]}
          >
            <Mail size={14} color={method === 'email' ? '#D6A24A' : '#9CA3AF'} />
            <Text style={[styles.methodText, method === 'email' && styles.methodTextActive]}>Email</Text>
          </TouchableOpacity>
        </View>

        {method === 'phone' ? (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <View style={styles.inputBox}>
              <Phone size={16} color="#D6A24A" />
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#9CA3AF"
                style={styles.inputText}
              />
            </View>
          </View>
        ) : (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputBox}>
              <Mail size={16} color="#D6A24A" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#9CA3AF"
                style={styles.inputText}
              />
            </View>
          </View>
        )}

        {method === 'phone' && otpSent && (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>4-Digit Code</Text>
            <View style={styles.inputBox}>
              <Lock size={16} color="#D6A24A" />
              <TextInput
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
                placeholderTextColor="#9CA3AF"
                style={[styles.inputText, { letterSpacing: 6, fontWeight: 'bold' }]}
              />
            </View>
          </View>
        )}

        <TouchableOpacity activeOpacity={0.85} onPress={handleAuthSubmit} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>
            {method === 'phone' && !otpSent ? 'Send Verification OTP' : 'Enter Private Lounge'}
          </Text>
          <ArrowRight size={16} color="#062E2A" />
        </TouchableOpacity>
      </GlassCard>

      <TouchableOpacity onPress={() => setScreen('home')} style={styles.fingerprintBtn}>
        <Fingerprint size={20} color="#D6A24A" />
        <Text style={styles.fingerprintText}>Biometric Passcode Sign-In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#062E2A',
    justify: 'space-between',
    padding: 24,
  },
  header: {
    paddingTop: 16,
    alignItems: 'center',
  },
  confidentialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  confidentialText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  card: {
    marginTop: 20,
  },
  titleText: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 11,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: '#D6A24A',
  },
  pillText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#062E2A',
    fontWeight: 'bold',
  },
  methodRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  methodBtnActive: {
    borderColor: '#D6A24A',
    backgroundColor: 'rgba(214, 162, 74, 0.1)',
  },
  methodText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  methodTextActive: {
    color: '#D6A24A',
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
  },
  inputText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D6A24A',
    marginTop: 8,
  },
  submitBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  fingerprintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  fingerprintText: {
    fontSize: 11,
    color: '#D1D5DB',
  },
});
