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
import { uploadFiles } from '../services/api';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [actualFile, setActualFile] = useState<File | null>(null);

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
        setFeedback({ type: 'success', message: 'Photo selected from gallery!' });
        
        // Convert URI to Blob to mock File for UploadThing in React Native
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        
        // Assign name and type to the blob so it works like a File
        const fileName = asset.fileName || asset.uri.split('/').pop() || 'upload.jpg';
        const fileType = asset.mimeType || 'image/jpeg';
        
        const nativeFile = Object.assign(blob, {
          name: fileName,
          type: fileType,
        }) as unknown as File;
        
        setActualFile(nativeFile);
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
      
      if (actualFile) {
        setFeedback({ type: 'success', message: 'Uploading securely...' });
        const res = await uploadFiles("profilePhoto", {
          files: [actualFile],
        });
        
        if (res && res.length > 0 && res[0].url) {
          finalUrl = res[0].url;
        } else {
          throw new Error('Upload failed to return URL');
        }
      }

      await onSavePhoto(finalUrl);
      setFeedback({ type: 'success', message: 'Photo saved and synced successfully!' });
      setTimeout(() => {
        onClose();
        setActualFile(null);
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
                <label style={webInputStyle}>
                  <Upload size={22} color={COLORS.accentGold} />
                  <Text style={{ color: COLORS.white, marginTop: 8, fontSize: 13, fontWeight: '600' }}>
                    Select Image
                  </Text>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </label>
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
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
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
    marginBottom: SPACING.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    position: 'relative',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.accentGold,
  },
  badgeLabel: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: COLORS.accentGold,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.redAccent,
  },
  successText: {
    color: COLORS.accentGold,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
    backgroundColor: COLORS.accentGold,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.mutedGray,
  },
  activeTabText: {
    color: COLORS.primary,
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
    fontSize: 12,
    color: COLORS.mutedGray,
    textAlign: 'center',
    marginBottom: 6,
  },
  mobileBrowseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accentGold,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    gap: 8,
    marginTop: 8,
  },
  mobileBrowseBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  urlTabContent: {
    gap: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  urlInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 12,
  },
  applyBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accentGold,
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentGold,
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
    borderColor: COLORS.accentGold,
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
    backgroundColor: COLORS.accentGold,
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
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  saveBtn: {
    flex: 1.4,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    backgroundColor: COLORS.accentGold,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
