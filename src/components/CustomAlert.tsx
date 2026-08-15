import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { CheckCircle, XCircle, Info } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const CustomAlert: React.FC = () => {
  const { customAlert, hideCustomAlert } = useAppStore();
  const { visible, title, message, type, onConfirm, onCancel, confirmText, cancelText } = customAlert;

  if (!visible) return null;

  const handleConfirm = () => {
    hideCustomAlert();
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    hideCustomAlert();
    if (onCancel) onCancel();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={48} color={COLORS.greenSuccess} strokeWidth={2} />;
      case 'error':
        return <XCircle size={48} color={COLORS.redAccent} strokeWidth={2} />;
      default:
        return <Info size={48} color={COLORS.accentGold} strokeWidth={2} />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return COLORS.greenSuccess;
      case 'error':
        return COLORS.redAccent;
      default:
        return COLORS.accentGold;
    }
  };

  return (
    <View style={styles.absoluteOverlay}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          
          <View style={styles.iconContainer}>
            {getIcon()}
          </View>
          
          <Text style={[styles.title, { color: getTitleColor() }]}>{title.toUpperCase()}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>{cancelText || 'Cancel'}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={handleConfirm} 
              style={[
                styles.confirmButton, 
                { backgroundColor: type === 'error' ? COLORS.redAccent : (type === 'success' ? COLORS.greenSuccess : COLORS.accentGold) }
              ]}
            >
              <Text style={styles.confirmButtonText}>{confirmText || 'DONE'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  alertBox: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF', // Clean white background for contrast like the image
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  iconContainer: {
    marginBottom: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.titleM,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  message: {
    ...TYPOGRAPHY.body,
    color: '#4B5563', // Darker text for readability on light bg
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  confirmButton: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});
