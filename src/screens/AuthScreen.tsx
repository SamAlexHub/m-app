import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, User, Fingerprint } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { apiService } from '../services/api';

// Bundled Expo Asset for 3D Pixar Cute Couple Login Hero
import loginCuteCoupleImg from '../../assets/3d/login_cute_couple.png';

export const AuthScreen: React.FC = () => {
  const { setScreen, setAuthToken, setCurrentUser, updateCurrentUserProfile, showCustomAlert } = useAppStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Handle Email & Password Submit (API calls commented out - direct bypass to Home)
  const handleAuthSubmit = async () => {
    setErrorMsg('');
    setInfoMsg('');

    // Directly navigate to Home Screen
    setScreen('home');

    /* API call functionality commented out:
    if (authMode === 'signup' && !name.trim()) {
      setErrorMsg('Please enter your User Name');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid Phone or Email');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      if (authMode === 'signup') {
        const res = await apiService.register({ email: email.trim(), password });
        if (res.token) setAuthToken(res.token);
        if (res.user) setCurrentUser(res.user);
        updateCurrentUserProfile({
          name: name.trim() || 'Valued Member',
          profession: '',
          company: '',
          height: '',
          photos: Array(5).fill(''),
        });
        showCustomAlert({
          title: 'Welcome to EverVow!',
          message: 'Your account has been created successfully.\n\nWelcome to your private matrimonial experience.',
          type: 'success',
          confirmText: 'Explore Matches',
          onConfirm: () => setScreen('home'),
        });
      } else {
        const res = await apiService.login(email.trim(), password);
        if (res.token) setAuthToken(res.token);
        if (res.user) setCurrentUser(res.user);
        if (res.profile) {
          updateCurrentUserProfile({
            name: `${res.profile.firstName || ''} ${res.profile.lastName || ''}`.trim() || 'Victoria Sterling',
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
        }
        setInfoMsg('Sign In successful! Redirecting...');
        setTimeout(() => {
          setScreen('home');
        }, 300);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <View style={styles.container}>
      {/* Soft Pastel Gradient Wash Backdrops */}
      <View style={styles.topPastelWash} />
      <View style={styles.bottomPastelWash} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Floating Top Header Privacy Badge */}
        <View style={styles.header}>
          <View style={styles.confidentialBadge}>
            <ShieldCheck size={12} color="#7C3AED" strokeWidth={2} />
            <Text style={styles.confidentialText}>100% PRIVATE & VERIFIED</Text>
          </View>
        </View>

        {/* Central Floating 3D Cute Couple Hero Illustration */}
        <View style={styles.heroWrapper}>
          <View style={styles.heroGlowCircle} />
          <Image
            source={loginCuteCoupleImg}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Main Content Area (Matching Exact Reference Screenshot Layout) */}
        <View style={styles.formContainer}>
          {/* Title & Subtitle */}
          <Text style={styles.titleText}>
            {authMode === 'signup' ? 'Sign Up' : 'Sign In'}
          </Text>
          <Text style={styles.subtitleText}>
            {authMode === 'signup'
              ? 'Create your luxury account to start discovering curated family matches.'
              : 'Welcome back! Enter your details to view your private invitations.'}
          </Text>

          {/* Mode Switcher Tabs */}
          <View style={styles.switcherContainer}>
            <TouchableOpacity
              onPress={() => {
                setAuthMode('signup');
                setErrorMsg('');
                setInfoMsg('');
              }}
              style={[styles.switcherTab, authMode === 'signup' && styles.switcherTabActive]}
            >
              <Text style={[styles.switcherText, authMode === 'signup' && styles.switcherTextActive]}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setAuthMode('login');
                setErrorMsg('');
                setInfoMsg('');
              }}
              style={[styles.switcherTab, authMode === 'login' && styles.switcherTabActive]}
            >
              <Text style={[styles.switcherText, authMode === 'login' && styles.switcherTextActive]}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Feedback Banners */}
          {errorMsg ? <Text style={styles.errorText}>⚠️ {errorMsg}</Text> : null}
          {infoMsg ? <Text style={styles.infoText}>✨ {infoMsg}</Text> : null}

          {/* Clean White Pill Input Fields (Exact match to reference model) */}
          {authMode === 'signup' && (
            <View style={styles.inputPillBox}>
              <User size={16} color="#7C3AED" style={{ marginRight: 10 }} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="User Name"
                placeholderTextColor="#9CA3AF"
                style={styles.inputText}
              />
            </View>
          )}

          <View style={styles.inputPillBox}>
            <Mail size={16} color="#7C3AED" style={{ marginRight: 10 }} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Phone or Email"
              placeholderTextColor="#9CA3AF"
              style={styles.inputText}
            />
          </View>

          <View style={styles.inputPillBox}>
            <Lock size={16} color="#7C3AED" style={{ marginRight: 10 }} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              style={styles.inputText}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={16} color="#9CA3AF" />
              ) : (
                <Eye size={16} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Theme-Matched Primary Action Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleAuthSubmit}
            style={styles.primaryButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {authMode === 'signup' ? 'Sign Up' : 'Sign In'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Switch Mode Footer Link */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAuthMode(authMode === 'signup' ? 'login' : 'signup');
              setErrorMsg('');
              setInfoMsg('');
            }}
            style={styles.switchModeLink}
          >
            <Text style={styles.switchModeText}>
              {authMode === 'signup' ? (
                <>Already have an account? <Text style={styles.switchModeBold}>Sign In</Text></>
              ) : (
                <>Don't have an account? <Text style={styles.switchModeBold}>Sign Up</Text></>
              )}
            </Text>
          </TouchableOpacity>

          {/* Quick Biometric Access */}
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.biometricBtn}>
            <Fingerprint size={15} color="#7C3AED" strokeWidth={1.8} />
            <Text style={styles.biometricText}>Quick Biometric Access</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEFA', // Ethereal light pastel backdrop
    position: 'relative',
  },
  topPastelWash: {
    position: 'absolute',
    top: -60,
    left: '5%',
    width: '90%',
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(238, 205, 245, 0.55)',
  },
  bottomPastelWash: {
    position: 'absolute',
    bottom: -80,
    right: '0%',
    width: '95%',
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(215, 230, 255, 0.45)',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  confidentialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  confidentialText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 1.4,
  },
  heroWrapper: {
    position: 'relative',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xs,
  },
  heroGlowCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(230, 215, 250, 0.9)',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  heroImage: {
    width: 146,
    height: 146,
    borderRadius: 73,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  formContainer: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1D1732',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#6B6480',
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: SPACING.md,
  },
  switcherContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 260,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: RADIUS.full,
    padding: 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(220, 205, 240, 0.7)',
  },
  switcherTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcherTabActive: {
    backgroundColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  switcherText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6480',
  },
  switcherTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  errorText: {
    fontSize: 11.5,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 11.5,
    color: '#7C3AED',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  inputPillBox: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.22)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputText: {
    flex: 1,
    color: '#1D1732',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xs,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  switchModeLink: {
    marginTop: SPACING.md,
    alignItems: 'center',
    paddingVertical: 4,
  },
  switchModeText: {
    fontSize: 12.5,
    color: '#6B6480',
  },
  switchModeBold: {
    fontWeight: '700',
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: SPACING.md,
    paddingTop: SPACING.xs,
  },
  biometricText: {
    fontSize: 11.5,
    color: '#6B6480',
    fontWeight: '500',
  },
});


