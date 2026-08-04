import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const VideoCallModal: React.FC = () => {
  const { videoCallActive, setVideoCallActive, activeChatProfileId } = useAppStore();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  if (!videoCallActive) return null;

  const profile = MOCK_PROFILES.find((p) => p.id === activeChatProfileId) || MOCK_PROFILES[0];

  return (
    <Modal visible={videoCallActive} transparent animationType="fade">
      <View style={styles.container}>
        <Image source={{ uri: profile.photos[0] }} style={styles.bgImage} resizeMode="cover" />
        <View style={styles.darkOverlay} />

        {/* Top Encrypted Bar */}
        <View style={styles.topRow}>
          <View style={styles.encryptBadge}>
            <ShieldCheck size={14} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.encryptText}>256-Bit Encrypted HD Call</Text>
          </View>
        </View>

        {/* Center Remote Info */}
        <View style={styles.centerInfo}>
          <Image source={{ uri: profile.photos[0] }} style={styles.avatar} />
          <Text style={styles.nameText}>{profile.name}</Text>
          <Text style={styles.timeText}>04:28 • Connected HD Voice & Video</Text>
        </View>

        {/* Bottom Control Bar */}
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => setMuted(!muted)} style={[styles.controlBtn, muted && styles.controlBtnActive]}>
            {muted ? <MicOff size={22} color={COLORS.white} strokeWidth={2} /> : <Mic size={22} color={COLORS.white} strokeWidth={2} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVideoCallActive(false)} style={styles.endCallBtn}>
            <PhoneOff size={28} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVideoOff(!videoOff)} style={[styles.controlBtn, videoOff && styles.controlBtnActive]}>
            {videoOff ? <VideoOff size={22} color={COLORS.white} strokeWidth={2} /> : <Video size={22} color={COLORS.white} strokeWidth={2} />}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.75)',
  },
  topRow: {
    paddingTop: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  encryptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(7, 47, 43, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.accentGold,
  },
  encryptText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    letterSpacing: 0.5,
  },
  centerInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: COLORS.accentGold,
    marginBottom: SPACING.md,
  },
  nameText: {
    ...TYPOGRAPHY.titleXL,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.accentGold,
    fontWeight: 'bold',
    marginTop: 4,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
  },
  endCallBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.redAccent,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
});
