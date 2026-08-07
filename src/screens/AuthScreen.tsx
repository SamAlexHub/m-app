import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckSquare, Square, Fingerprint, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { apiService } from '../services/api';

export const AuthScreen: React.FC = () => {
  const { setScreen, setAuthToken, setCurrentUser } = useAppStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [email, setEmail] = useState('victoria@sterling.com');
  const [password, setPassword] = useState('your_secure_password_123');
  const [confirmPassword, setConfirmPassword] = useState('your_secure_password_123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // 6-Digit Email OTP Verification State
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Handle Email & Password Submit
  const handleAuthSubmit = async () => {
    setErrorMsg('');
    setInfoMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      if (authMode === 'signup') {
        if (!emailOtpSent) {
          // Step 1: Initial Registration (POST /api/v1/auth/register)
          const res = await apiService.register({ email: email.trim(), password });
          if (res.data?.token) setAuthToken(res.data.token);
          if (res.data?.user) setCurrentUser(res.data.user);
          setEmailOtpSent(true);
          setInfoMsg(`Registration successful! OTP verification code sent to ${email}.`);
        } else {
          // Step 2: Verify Email OTP (POST /api/v1/auth/verify-email-otp)
          if (!emailOtp || emailOtp.length < 6) {
            setErrorMsg('Please enter the 6-digit OTP code sent to your email');
            return;
          }
          const res = await apiService.verifyEmailOtp(email.trim(), emailOtp);
          if (res.token) setAuthToken(res.token);
          if (res.user) setCurrentUser(res.user);
          setIsEmailVerified(true);
          setInfoMsg('Email verified successfully! Entering Private Lounge...');
          setTimeout(() => {
            setScreen('home');
          }, 600);
        }
      } else {
        // Step 3: Login User (POST /api/v1/auth/login)
        const res = await apiService.login(email.trim(), password);
        if (res.token) setAuthToken(res.token);
        if (res.user) setCurrentUser(res.user);
        setInfoMsg('Login successful! Redirecting...');
        setTimeout(() => {
          setScreen('home');
        }, 400);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Dark Luxury Gradient Overlays */}
      <View style={styles.topWash} />
      <View style={styles.bottomShade} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Confidential Badge */}
        <View style={styles.header}>
          <View style={styles.confidentialBadge}>
            <ShieldCheck size={14} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.confidentialText}>STRICT CONFIDENTIALITY GUARANTEED</Text>
          </View>
        </View>

        {/* Main Luxury Glass Card */}
        <GlassCard style={styles.card}>
          {/* Card Title & Description */}
          <Text style={styles.titleText}>
            {authMode === 'login' ? 'Welcome Back' : 'Join Éternité'}
          </Text>
          <Text style={styles.subtext}>
            {authMode === 'login'
              ? 'Sign in to access your private match invitations'
              : 'Create your luxury matrimonial profile in minutes'}
          </Text>

          {/* Mode Selector Switcher (Log In vs Register) */}
          <View style={styles.pillContainer}>
            <TouchableOpacity
              onPress={() => {
                setAuthMode('login');
                setEmailOtpSent(false);
                setErrorMsg('');
                setInfoMsg('');
              }}
              style={[styles.pill, authMode === 'login' && styles.pillActive]}
            >
              <Text style={[styles.pillText, authMode === 'login' && styles.pillTextActive]}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setAuthMode('signup');
                setEmailOtpSent(false);
                setErrorMsg('');
                setInfoMsg('');
              }}
              style={[styles.pill, authMode === 'signup' && styles.pillActive]}
            >
              <Text style={[styles.pillText, authMode === 'signup' && styles.pillTextActive]}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Feedback Banners */}
          {errorMsg ? <Text style={styles.errorText}>⚠️ {errorMsg}</Text> : null}
          {infoMsg ? <Text style={styles.infoText}>ℹ️ {infoMsg}</Text> : null}

          {/* Email Verification Step for Registration */}
          {authMode === 'signup' && emailOtpSent ? (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>VERIFY EMAIL (6-DIGIT CODE SENT TO EMAIL)</Text>
              <View style={styles.inputBox}>
                <CheckCircle2 size={16} color={COLORS.accentGold} strokeWidth={1.8} />
                <TextInput
                  value={emailOtp}
                  onChangeText={setEmailOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="889900"
                  placeholderTextColor={COLORS.mutedGray}
                  style={[styles.inputText, { letterSpacing: 6, fontWeight: 'bold' }]}
                />
              </View>
            </View>
          ) : (
            <>
              {/* Email Address Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                <View style={styles.inputBox}>
                  <Mail size={16} color={COLORS.accentGold} strokeWidth={1.8} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="victoria@sterling.com"
                    placeholderTextColor={COLORS.mutedGray}
                    style={styles.inputText}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <View style={styles.inputBox}>
                  <Lock size={16} color={COLORS.accentGold} strokeWidth={1.8} />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.mutedGray}
                    style={styles.inputText}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={16} color={COLORS.mutedGray} />
                    ) : (
                      <Eye size={16} color={COLORS.mutedGray} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password (Sign Up Mode) */}
              {authMode === 'signup' && (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
                  <View style={styles.inputBox}>
                    <Lock size={16} color={COLORS.accentGold} strokeWidth={1.8} />
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      placeholder="••••••••"
                      placeholderTextColor={COLORS.mutedGray}
                      style={styles.inputText}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <EyeOff size={16} color={COLORS.mutedGray} />
                      ) : (
                        <Eye size={16} color={COLORS.mutedGray} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}

          {/* Remember Me Toggle */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberBox}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              {rememberMe ? (
                <CheckSquare size={16} color={COLORS.accentGold} />
              ) : (
                <Square size={16} color={COLORS.mutedGray} />
              )}
              <Text style={styles.rememberText}>Remember Login Credentials</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </ScrollView>

      {/* Bottom Action Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleAuthSubmit}
          style={styles.primaryButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <>
              <Text style={styles.primaryButtonText}>
                {authMode === 'signup'
                  ? (!emailOtpSent ? 'Send Email 6-Digit Code' : 'Verify Email Code')
                  : 'Enter Private Lounge'}
              </Text>
              <ArrowRight size={18} color={COLORS.primary} strokeWidth={2.6} style={styles.buttonIcon} />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('home')} style={styles.fingerprintBtn}>
          <Fingerprint size={16} color={COLORS.accentGold} strokeWidth={1.8} />
          <Text style={styles.fingerprintText}>Biometric Passcode Sign-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  topWash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '54%',
    backgroundColor: '#0A3A34',
    opacity: 0.96,
  },
  bottomShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '46%',
    backgroundColor: '#041F1C',
    opacity: 0.58,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  header: {
    paddingTop: SPACING.xs,
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
    width: '100%',
    maxWidth: 380,
    marginTop: SPACING.md,
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
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  rememberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberText: {
    fontSize: 11,
    color: COLORS.lightGray,
  },
  errorText: {
    fontSize: 11,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 11,
    color: COLORS.accentGold,
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomControls: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: SPACING.xs,
    marginTop: SPACING.md,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 340,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.goldGlow,
  },
  primaryButtonText: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: SPACING.sm,
  },
  fingerprintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  fingerprintText: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
});
