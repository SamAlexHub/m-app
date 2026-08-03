import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';

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
            <ShieldCheck size={14} color="#D6A24A" />
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
            {muted ? <MicOff size={22} color="#ffffff" /> : <Mic size={22} color="#ffffff" />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVideoCallActive(false)} style={styles.endCallBtn}>
            <PhoneOff size={28} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVideoOff(!videoOff)} style={[styles.controlBtn, videoOff && styles.controlBtnActive]}>
            {videoOff ? <VideoOff size={22} color="#ffffff" /> : <Video size={22} color="#ffffff" />}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
    justify: 'space-between',
    padding: 24,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 46, 42, 0.75)',
  },
  topRow: {
    paddingTop: 36,
    flexDirection: 'row',
    justify: 'center',
  },
  encryptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 46, 42, 0.9)',
    borderWidth: 1,
    borderColor: '#D6A24A',
  },
  encryptText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  centerInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#D6A24A',
    marginBottom: 12,
  },
  nameText: {
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeText: {
    fontSize: 11,
    color: '#D6A24A',
    fontWeight: 'bold',
    marginTop: 4,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 24,
    paddingBottom: 32,
  },
  controlBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justify: 'center',
  },
  controlBtnActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
  },
  endCallBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justify: 'center',
    elevation: 8,
  },
});
