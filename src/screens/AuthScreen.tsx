import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  CheckCircle2,
  User as UserIcon,
  ArrowRight,
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { apiService } from '../services/api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const AuthScreen: React.FC = () => {
  const { setScreen, setAuthToken, setCurrentUser, updateCurrentUserProfile, showCustomAlert } = useAppStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

<<<<<<< HEAD
  // Email OTP Verification State
=======
  // 6-Digit Email OTP Verification State (kept for reference, no longer used at signup)
>>>>>>> 01bb8ca60fb56c1c5e4ff2b1995781b9faeef747
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const toggleAuthMode = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setEmailOtpSent(false);
    setErrorMsg('');
    setInfoMsg('');
  };

  // Handle Submit
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
<<<<<<< HEAD
        if (!emailOtpSent) {
          const res = await apiService.register({ email: email.trim(), password });
          if (res.data?.token) setAuthToken(res.data.token);
          if (res.data?.user) setCurrentUser(res.data.user);
          setEmailOtpSent(true);
          setInfoMsg(`OTP code sent to ${email}`);
        } else {
          if (!emailOtp || emailOtp.length < 6) {
            setErrorMsg('Please enter the 6-digit OTP code sent to your email');
            return;
          }
          const res = await apiService.verifyEmailOtp(email.trim(), emailOtp);
          if (res.token) setAuthToken(res.token);
          if (res.user) setCurrentUser(res.user);
          setIsEmailVerified(true);
          setInfoMsg('Email verified successfully! Redirecting...');
          setTimeout(() => {
            setScreen('home');
          }, 500);
        }
=======
        // Registration: directly create account and navigate to Home
        const res = await apiService.register({ email: email.trim(), password });
        if (res.token) setAuthToken(res.token);
        if (res.user) setCurrentUser(res.user);
        updateCurrentUserProfile({ name: '', profession: '', company: '', height: '', photos: Array(5).fill('') });
        showCustomAlert({
          title: 'Welcome to EverVow!',
          message: 'Your account has been created successfully.\n\nPlease verify your email address from the Home screen to unlock all VIP features.',
          type: 'success',
          confirmText: 'Go to Home',
          onConfirm: () => setScreen('home'),
        });
>>>>>>> 01bb8ca60fb56c1c5e4ff2b1995781b9faeef747
      } else {
        const res = await apiService.login(email.trim(), password);
        if (res.token) setAuthToken(res.token);
        if (res.user) setCurrentUser(res.user);
<<<<<<< HEAD
        setInfoMsg('Login successful!');
=======
        if (res.profile) {
          updateCurrentUserProfile({
            name: `${res.profile.firstName || ''} ${res.profile.lastName || ''}`.trim(),
            height: res.profile.height || '',
            religion: res.profile.religion?._id || res.profile.religion || '',
            community: res.profile.caste || '',
            motherTongue: res.profile.motherTongue || '',
            profession: res.profile.occupation || '',
            company: res.profile.company || '',
            education: res.profile.education || '',
            connectIntro: res.profile.personalizedIntro || '',
            familyDetails: {
              father: res.profile.fatherProfession || '',
              mother: res.profile.motherProfession || '',
              background: res.profile.familyBackground || '',
              familyValues: res.profile.familyValues || '',
              location: res.profile.ancestralOrigin || ''
            },
            horoscope: {
              zodiac: res.profile.zodiacSign || '',
              rashi: res.profile.moonSign || '',
              nakshatra: res.profile.nakshatra || '',
              manglik: res.profile.isManglik || false,
              gunaScore: "33 / 36"
            },
            vipVerificationDoc: res.profile.vipVerificationDoc || { documentType: 'Aadhar', documentNumber: '', status: 'pending' },
            photos: res.profile.photos && res.profile.photos.length > 0
              ? [...res.profile.photos, ...Array(5 - res.profile.photos.length).fill('')].slice(0, 5)
              : Array(5).fill(''),
          });
        } else {
          updateCurrentUserProfile({ name: '', profession: '', company: '', height: '', photos: Array(5).fill('') });
        }
        setInfoMsg('Login successful! Redirecting...');
>>>>>>> 01bb8ca60fb56c1c5e4ff2b1995781b9faeef747
        setTimeout(() => {
          setScreen('home');
        }, 400);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
  <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
=======
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
            {authMode === 'login' ? 'Welcome Back' : 'Join Evervow'}
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
>>>>>>> 01bb8ca60fb56c1c5e4ff2b1995781b9faeef747

  {/* 3D Couple Background Image with Soft Overlay */ }
      <Image
        source={require('../../assets/3d/onboarding_1.png')}
        style={styles.bgImage}
        resizeMode="cover"
        blurRadius={Platform.OS === 'ios' ? 25 : 12}
      />
      <View style={styles.bgOverlay} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Aesthetic Brand Header */}
          <View style={styles.brandHeader}>
            <Text style={styles.brandTitle}>EVERVOW</Text>
            <Text style={styles.brandSubtitle}>CULTIVATING TIMELESS UNIONS</Text>
          </View>

<<<<<<< HEAD
  {/* Glassmorphic Neumorphic Form Card */ }
  <View style={styles.glassCard}>
    {/* Mode Tab Switcher (Login vs Sign Up) */}
    <View style={styles.tabContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggleAuthMode('login')}
        style={[styles.tabButton, authMode === 'login' && styles.tabButtonActive]}
      >
        <Text style={[styles.tabText, authMode === 'login' && styles.tabTextActive]}>
          Log In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggleAuthMode('signup')}
        style={[styles.tabButton, authMode === 'signup' && styles.tabButtonActive]}
      >
        <Text style={[styles.tabText, authMode === 'signup' && styles.tabTextActive]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>

    {/* Dynamic Headers */}
    <Text style={styles.welcomeTitle}>
      {authMode === 'login' ? 'Welcome Back' : 'Begin Your Journey'}
    </Text>
    <Text style={styles.welcomeSubtext}>
      {authMode === 'login'
        ? 'Sign in to access your private match lounge'
        : 'Create your verified matrimonial account'}
    </Text>

    {/* Feedback Banners */}
    {errorMsg ? <Text style={styles.errorText}>⚠️ {errorMsg}</Text> : null}
    {infoMsg ? <Text style={styles.infoText}>✨ {infoMsg}</Text> : null}

    {/* Form Inputs with Explicit Unique Keys */}
    {authMode === 'signup' && emailOtpSent ? (
      /* OTP Verification Step */
      <View key="field-otp" style={styles.fieldWrapper}>
        <Text style={styles.fieldLabel}>6-DIGIT EMAIL VERIFICATION CODE</Text>
        <View style={styles.inputBox}>
          <CheckCircle2 size={18} color="#5B50F6" strokeWidth={2} />
          <TextInput
            value={emailOtp}
            onChangeText={setEmailOtp}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="889900"
            placeholderTextColor="#94A3B8"
            style={[styles.input, { letterSpacing: 6, fontWeight: '700' }]}
          />
        </View>
      </View>
    ) : (
      <View style={styles.fieldsContainer}>
        {/* Full Name (Sign Up only) */}
        {authMode === 'signup' && (
          <View key="field-name" style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>FULL NAME</Text>
            <View style={styles.inputBox}>
              <UserIcon size={18} color="#64748B" strokeWidth={2} />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Alex Baby"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
            </View>
          </View>
        )}

        {/* Email Address (Login & Sign Up) */}
        <View key="field-email" style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
          <View style={styles.inputBox}>
            <Mail size={18} color="#64748B" strokeWidth={2} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="alex@example.com"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />
          </View>
        </View>

        {/* Password (Login & Sign Up - ALWAYS SHOWN) */}
        <View key="field-password" style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.inputBox}>
            <Lock size={18} color="#64748B" strokeWidth={2} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter password"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? (
                <EyeOff size={18} color="#64748B" />
              ) : (
                <Eye size={18} color="#64748B" />
              )}
            </TouchableOpacity>
          </View>
        </View>
=======
          {/* Feedback Banners */}
        {errorMsg ? <Text style={styles.errorText}>⚠️ {errorMsg}</Text> : null}
        {infoMsg ? <Text style={styles.infoText}>ℹ️ {infoMsg}</Text> : null}

        {/* Email Verification Step for Registration - removed, verify later from home */}
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

>>>>>>> 01bb8ca60fb56c1c5e4ff2b1995781b9faeef747

        {/* Confirm Password (Sign Up only) */}
        {authMode === 'signup' && (
          <View key="field-confirm" style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
            <View style={styles.inputBox}>
              <Lock size={18} color="#64748B" strokeWidth={2} />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm password"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeBtn}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} color="#64748B" />
                ) : (
                  <Eye size={18} color="#64748B" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )}

    {/* Forgot Password Link */}
    {authMode === 'login' && (
      <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    )}

    {/* Primary Action Button */}
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handleAuthSubmit}
      style={styles.primaryButton}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <View style={styles.buttonInner}>
          <Text style={styles.primaryButtonText}>
            {authMode === 'signup'
              ? !emailOtpSent
                ? 'Create Account'
                : 'Verify Email Code'
              : 'Log In'}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />
        </View>
      )}
    </TouchableOpacity>
<<<<<<< HEAD

  {/* Bottom Footer Switcher */ }
  <View style={styles.switchRow}>
    <Text style={styles.switchSubtext}>
      {authMode === 'login'
        ? "Don't have an account? "
        : 'Already have an account? '}
=======
          </View>
        </GlassCard >
      </ScrollView >

  {/* Bottom Action Controls */ }
  < View style = { styles.bottomControls } >
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
            {authMode === 'signup' ? 'Create My Account' : 'Enter Private Lounge'}
>>>>>>> 01bb8ca60fb56c1c5e4ff2b1995781b9faeef747
          </Text>
          <TouchableOpacity
            onPress={() => toggleAuthMode(authMode === 'login' ? 'signup' : 'login')}
            activeOpacity={0.7}
          >
            <Text style={styles.switchLinkText}>
              {authMode === 'login' ? 'Sign Up' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </View>
    </View>
        </ScrollView >
      </SafeAreaView >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.28,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(250, 247, 242, 0.82)',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  /* Aesthetic Brand Header */
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
    color: '#1E293B',
  },
  brandSubtitle: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: '#64748B',
    marginTop: 4,
  },

  /* Glassmorphic Form Container Card */
  glassCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },

  /* Tab Mode Switcher */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 22,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#5B50F6',
    fontWeight: '800',
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },

  errorText: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 12,
    color: '#5B50F6',
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '600',
  },

  fieldsContainer: {
    width: '100%',
  },
  fieldWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#64748B',
    marginBottom: 6,
  },
  inputBox: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 6,
  },

  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 2,
  },
  forgotText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#5B50F6',
  },

  /* Primary Button */
  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#5B50F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5B50F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 18,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  /* Footer Switcher */
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  switchSubtext: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  switchLinkText: {
    fontSize: 13,
    color: '#5B50F6',
    fontWeight: '800',
  },
});
