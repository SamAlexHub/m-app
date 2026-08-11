import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Mail, ShieldCheck, X, Lock, CheckCircle2, Send } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { apiService } from '../services/api';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { GlassCard } from './GlassCard';

interface EmailOtpModalProps {
  visible: boolean;
  onClose: () => void;
}

type Stage = 'idle' | 'sent' | 'verified';

export const EmailOtpModal: React.FC<EmailOtpModalProps> = ({ visible, onClose }) => {
  const { currentUser, setEmailVerified } = useAppStore();
  const userEmail = currentUser?.email || '';

  const [stage, setStage] = useState<Stage>('idle');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const resetState = () => {
    setStage('idle');
    setOtpCode('');
    setLoading(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  // Step 1 — Generate & send OTP
  const handleGenerateOtp = async () => {
    setErrorMsg('');
    try {
      setLoading(true);
      await apiService.sendEmailOtp(userEmail);
      setStage('sent');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      setErrorMsg('Please enter the 6-digit code sent to your email.');
      return;
    }
    setErrorMsg('');
    try {
      setLoading(true);
      await apiService.verifyEmailOtp(userEmail, otpCode);
      setEmailVerified(true);
      setStage('verified');
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <GlassCard style={styles.modalCard}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <ShieldCheck size={20} color={COLORS.accentGold} />
              <Text style={styles.title}>Verify Email Address</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <X size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Registered email display */}
          <Text style={styles.subtitle}>
            Verification code will be sent to your registered email:
          </Text>
          <View style={styles.emailBadge}>
            <Mail size={15} color={COLORS.accentGold} />
            <Text style={styles.emailText} numberOfLines={1}>{userEmail}</Text>
          </View>

          {/* Error message */}
          {errorMsg ? <Text style={styles.errorText}>⚠️ {errorMsg}</Text> : null}

          {/* STAGE: idle — Show generate button */}
          {stage === 'idle' && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleGenerateOtp}
                disabled={loading}
                activeOpacity={0.82}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.primary} size="small" />
                ) : (
                  <View style={styles.btnInner}>
                    <Send size={15} color={COLORS.primary} />
                    <Text style={styles.actionBtnText}>Generate & Send OTP</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* STAGE: sent — Show success info + OTP input */}
          {stage === 'sent' && (
            <View style={styles.section}>
              <View style={styles.sentBanner}>
                <CheckCircle2 size={16} color={COLORS.accentGold} />
                <Text style={styles.sentBannerText}>
                  A 6-digit code has been sent to your email. Please check your inbox (and spam folder).
                </Text>
              </View>

              <Text style={styles.inputLabel}>ENTER 6-DIGIT VERIFICATION CODE</Text>
              <View style={styles.inputBox}>
                <Lock size={16} color={COLORS.accentGold} />
                <TextInput
                  value={otpCode}
                  onChangeText={(v) => { setOtpCode(v); setErrorMsg(''); }}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="• • • • • •"
                  placeholderTextColor={COLORS.mutedGray}
                  style={styles.otpInput}
                  autoFocus
                />
              </View>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleVerifyOtp}
                disabled={loading}
                activeOpacity={0.82}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.primary} size="small" />
                ) : (
                  <View style={styles.btnInner}>
                    <ShieldCheck size={15} color={COLORS.primary} />
                    <Text style={styles.actionBtnText}>Verify Email</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleGenerateOtp}
                disabled={loading}
                style={styles.resendBtn}
              >
                <Text style={styles.resendText}>Didn't receive code? Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STAGE: verified */}
          {stage === 'verified' && (
            <View style={styles.section}>
              <View style={styles.successBanner}>
                <CheckCircle2 size={22} color={COLORS.accentGold} />
                <Text style={styles.successText}>Email verified successfully!</Text>
                <Text style={styles.successSub}>Your VIP features are now unlocked.</Text>
              </View>
            </View>
          )}

        </GlassCard>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.80)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    padding: SPACING.lg,
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: SPACING.md,
  },
  emailText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  errorText: {
    fontSize: 11,
    color: COLORS.redAccent,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  section: {
    marginTop: SPACING.xs,
  },
  sentBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(212,175,55,0.10)',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.30)',
    padding: 12,
    marginBottom: SPACING.md,
  },
  sentBannerText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.accentGold,
    lineHeight: 18,
  },
  inputLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.mutedGray,
    letterSpacing: 1,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1.5,
    borderColor: COLORS.accentGold,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  otpInput: {
    flex: 1,
    fontSize: 22,
    letterSpacing: 10,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
  },
  actionBtn: {
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.goldGlow,
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  resendBtn: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  resendText: {
    fontSize: 11,
    color: COLORS.mutedGray,
    textDecorationLine: 'underline',
  },
  successBanner: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: 8,
  },
  successText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accentGold,
  },
  successSub: {
    fontSize: 12,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
});
