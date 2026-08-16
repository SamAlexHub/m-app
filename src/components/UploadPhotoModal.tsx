import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Upload, X, Check, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react-native';
import { COLORS, RADIUS, SPACING } from '../theme/tokens';
import { GlassCard } from './GlassCard';
import { uploadPhoto } from '../services/api';
import { useAppStore } from '../store/useAppStore';

const PRESET_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
];

interface UploadPhotoModalProps {
  visible: boolean;
  onClose: () => void;
  photoIndex: number;
  currentPhotoUrl?: string;
  onSavePhoto: (newUrl: string) => Promise<void> | void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  visible,
  onClose,
  photoIndex,
  currentPhotoUrl,
  onSavePhoto,
}) => {
  const [selectedUrl, setSelectedUrl] = useState<string>(currentPhotoUrl || '');
  const [selectedUri, setSelectedUri] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { authToken } = useAppStore();

  useEffect(() => {
    setSelectedUrl(currentPhotoUrl || PRESET_PHOTOS[0]);
    setFeedback(null);
  }, [currentPhotoUrl, visible]);

  const handleFileSelect = (event: any) => {
    const file = event.target?.files?.[0];
    if (file) {
      setActualFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setSelectedUrl(result);
          setFeedback({ type: 'success', message: 'Photo selected successfully!' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNativeImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedUrl(asset.uri);
        setSelectedUri(asset.uri);
        setSelectedFileName(asset.fileName || asset.uri.split('/').pop() || 'photo.jpg');
        setFeedback({ type: 'success', message: 'Photo selected from gallery!' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Failed to pick image: ' + err.message });
    }
  };



  const handleSave = async () => {
    if (!selectedUrl) {
      setFeedback({ type: 'error', message: 'Please select or upload a photo' });
      return;
    }
    try {
      setLoading(true);
      let finalUrl = selectedUrl;

      // If a native file was selected (uri is a local device path), upload it
      if (selectedUri && !selectedUri.startsWith('http')) {
        if (!authToken) {
          throw new Error('You must be logged in to upload photos');
        }
        setFeedback({ type: 'success', message: 'Uploading securely...' });
        finalUrl = await uploadPhoto(selectedUri, selectedFileName, authToken);
      }

      await onSavePhoto(finalUrl);
      setFeedback({ type: 'success', message: 'Photo saved successfully!' });
      setTimeout(() => {
        onClose();
        setSelectedUri('');
        setSelectedFileName('');
      }, 500);
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save photo' });
    } finally {
      setLoading(false);
    }
  };

  const slotTitle = photoIndex === 0 ? 'Main Avatar Photo' : `Gallery Photo #${photoIndex}`;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <GlassCard style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <ImageIcon size={20} color={COLORS.accentGold} />
              <Text style={styles.title}>Update {slotTitle}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Photo Preview Box */}
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedUrl || PRESET_PHOTOS[0] }} style={styles.previewImage} />
            <View style={styles.badgeLabel}>
              <Text style={styles.badgeText}>{slotTitle}</Text>
            </View>
          </View>

          {feedback ? (
            <Text style={[styles.feedbackText, feedback.type === 'error' ? styles.errorText : styles.successText]}>
              {feedback.type === 'error' ? '⚠️ ' : '✅ '}{feedback.message}
            </Text>
          ) : null}

          {/* Upload Area */}
          <View style={styles.tabContent}>
            <View style={styles.uploadTabContent}>
              <Text style={styles.tabDescription}>
                Select any photo from your device gallery or computer files.
              </Text>

              {Platform.OS === 'web' ? (
                <TouchableOpacity
                  style={styles.mobileBrowseBtn}
                  onPress={handleFileSelect}
                >
                  <Upload size={22} color={COLORS.accentGold} />
                  <Text style={{ color: COLORS.white, marginTop: 8, fontSize: 13, fontWeight: '600' }}>
                    Select Image (Web)
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.mobileBrowseBtn}
                  onPress={handleNativeImagePick}
                >
                  <Upload size={20} color={COLORS.primary} />
                  <Text style={styles.mobileBrowseBtnText}>Browse Device Gallery</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={loading}
              style={styles.saveBtn}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <Text style={styles.saveBtnText}>Save & Sync Photo</Text>
              )}
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </Modal>
  );
};

const webInputStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  borderWidth: 1.5,
  borderStyle: 'dashed',
  borderColor: COLORS.accentGold,
  borderRadius: RADIUS.md,
  backgroundColor: 'rgba(212, 175, 55, 0.08)',
  cursor: 'pointer',
  marginTop: 10,
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 10, 30, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    padding: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E152A',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    position: 'relative',
  },
  previewImage: {
    width: 124,
    height: 124,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: '#6D28D9',
  },
  badgeLabel: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#6D28D9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    color: '#DC2626',
  },
  successText: {
    color: '#059669',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3E8FF',
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#6D28D9',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5C4E75',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tabContent: {
    minHeight: 110,
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  uploadTabContent: {
    alignItems: 'center',
  },
  tabDescription: {
    fontSize: 13,
    color: '#4C3D65',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  mobileBrowseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D28D9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    gap: 8,
    marginTop: 8,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  mobileBrowseBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  urlTabContent: {
    gap: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  urlInput: {
    flex: 1,
    color: '#1E152A',
    fontSize: 13,
  },
  applyBtn: {
    backgroundColor: '#F3E8FF',
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6D28D9',
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  presetThumbContainer: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
  },
  presetThumbSelected: {
    borderColor: '#6D28D9',
  },
  presetThumb: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.sm - 2,
  },
  checkBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#6D28D9',
    borderRadius: 10,
    padding: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
  },
  cancelBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#6D28D9',
  },
  saveBtn: {
    flex: 1.4,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    backgroundColor: '#6D28D9',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
