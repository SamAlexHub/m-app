import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Mail, CheckCircle2, X, Lock, ShieldCheck } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { apiService } from '../services/api';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { GlassCard } from './GlassCard';

interface EmailOtpModalProps {
  visible: boolean;
  onClose: () => void;
}

export const EmailOtpModal: React.FC<EmailOtpModalProps> = ({ visible, onClose }) => {
  const { currentUser, setEmailVerified } = useAppStore();
  const userEmail = currentUser?.email || 'victoria@sterling.com';

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleSendOtp = async () => {
    setErrorMsg('');
    setInfoMsg('');
    try {
      setLoading(true);
      const res = await apiService.sendEmailOtp(userEmail);
      setOtpSent(true);
      setOtpCode(res.mockEmailOtp || '8899');
      setInfoMsg(`4-digit verification code sent to ${userEmail}! (Dev Code: ${res.mockEmailOtp || '8899'})`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('Please enter the 4-digit code');
      return;
    }

    setErrorMsg('');
    setInfoMsg('');
    try {
      setLoading(true);
      await apiService.verifyEmailOtp(userEmail, otpCode);
      setEmailVerified(true);
      setInfoMsg('Email verified successfully!');
      setTimeout(() => {
        onClose();
        setOtpSent(false);
        setOtpCode('');
        setInfoMsg('');
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid 4-digit verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <GlassCard style={styles.modalCard}>
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <ShieldCheck size={20} color={COLORS.accentGold} />
              <Text style={styles.title}>Verify Email Address</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Complete 4-digit email verification to activate full VIP matchmaking features for:
          </Text>

          <View style={styles.emailBadge}>
            <Mail size={16} color={COLORS.accentGold} />
            <Text style={styles.emailText}>{userEmail}</Text>
          </View>

          {errorMsg ? <Text style={styles.errorText}>⚠️ {errorMsg}</Text> : null}
          {infoMsg ? <Text style={styles.infoText}>ℹ️ {infoMsg}</Text> : null}

          {!otpSent ? (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleSendOtp}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <Text style={styles.actionBtnText}>Send 4-Digit Verification Code</Text>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.otpSection}>
              <Text style={styles.inputLabel}>ENTER 4-DIGIT EMAIL CODE</Text>
              <View style={styles.inputBox}>
                <Lock size={16} color={COLORS.accentGold} />
                <TextInput
                  value={otpCode}
                  onChangeText={setOtpCode}
                  keyboardType="number-pad"
                  maxLength={4}
                  placeholder="8899"
                  placeholderTextColor={COLORS.mutedGray}
                  style={styles.otpInput}
                />
              </View>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleVerifyOtp}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.primary} size="small" />
                ) : (
                  <Text style={styles.actionBtnText}>Verify & Update Email Status</Text>
                )}
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
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
    ...TYPOGRAPHY.titleM,
    fontSize: 17,
    color: COLORS.white,
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    color: COLORS.lightGray,
    marginBottom: SPACING.md,
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: SPACING.md,
  },
  emailText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  errorText: {
    fontSize: 11,
    color: COLORS.redAccent,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 11,
    color: COLORS.accentGold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  otpSection: {
    marginTop: SPACING.xs,
  },
  inputLabel: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
    marginBottom: 6,
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
    marginBottom: SPACING.md,
  },
  otpInput: {
    flex: 1,
    fontSize: 16,
    letterSpacing: 6,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  actionBtn: {
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xs,
    ...SHADOWS.goldGlow,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
