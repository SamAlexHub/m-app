import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, Video, Send, Gift, Calendar, ShieldCheck, Play } from 'lucide-react-native';
import { useAppStore, ChatMessage } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const ChatScreen: React.FC = () => {
  const {
    activeChatProfileId,
    messagesMap,
    sendMessage,
    setScreen,
    setVideoCallActive,
    setDatePlannerOpen
  } = useAppStore();

  const [inputText, setInputText] = useState('');
  const [showGifts, setShowGifts] = useState(false);

  const profile = MOCK_PROFILES.find((p) => p.id === activeChatProfileId) || MOCK_PROFILES[0];
  const chatMessages = messagesMap[profile.id] || [];

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    sendMessage(profile.id, newMsg);
    setInputText('');
  };

  const handleSendGift = (giftName: string) => {
    const giftMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'user',
      text: `Sent a virtual luxury gift: ${giftName}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGiftSticker: true,
      giftName: giftName
    };
    sendMessage(profile.id, giftMsg);
    setShowGifts(false);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen('profile')} style={styles.profileRow}>
            <Image source={{ uri: profile.photos[0] }} style={styles.avatar} />
            <View>
              <Text style={styles.nameText}>{profile.name}</Text>
              <Text style={styles.statusText}>Online • Verified VIP</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setDatePlannerOpen(true)} style={styles.iconBtn}>
            <Calendar size={18} color={COLORS.accentGold} strokeWidth={1.8} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVideoCallActive(true)} style={styles.iconBtn}>
            <Video size={18} color={COLORS.accentGold} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        <View style={styles.encryptBadge}>
          <ShieldCheck size={12} color={COLORS.accentGold} strokeWidth={1.8} />
          <Text style={styles.encryptText}>Protected by 256-Bit Encrypted Confidentiality</Text>
        </View>

        {chatMessages.map((msg) => {
          const isUser = msg.senderId === 'user';

          return (
            <View key={msg.id} style={[styles.bubbleWrapper, isUser ? styles.userBubbleAlign : styles.otherBubbleAlign]}>
              <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
                {msg.isVoiceNote ? (
                  <View style={styles.voiceNoteRow}>
                    <View style={styles.playBtn}>
                      <Play size={12} color={COLORS.primary} />
                    </View>
                    <Text style={styles.voiceText}>Voice Note • {msg.duration}</Text>
                  </View>
                ) : msg.isGiftSticker ? (
                  <View style={styles.giftRow}>
                    <Gift size={20} color={COLORS.accentGold} strokeWidth={1.8} />
                    <Text style={styles.giftText}>{msg.giftName}</Text>
                  </View>
                ) : (
                  <Text style={styles.msgText}>{msg.text}</Text>
                )}
                <Text style={styles.timeText}>{msg.timestamp}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Gifts Tray */}
      {showGifts && (
        <View style={styles.giftsTray}>
          <TouchableOpacity onPress={() => handleSendGift('Dom Pérignon Champagne')} style={styles.giftChip}>
            <Text style={styles.giftChipText}>🍾 Champagne</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSendGift('100 Royal Red Roses')} style={styles.giftChip}>
            <Text style={styles.giftChipText}>🌹 Rose Bouquet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSendGift('Cartier Gold Emblem')} style={styles.giftChip}>
            <Text style={styles.giftChipText}>💍 Gold Ring</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity onPress={() => setShowGifts(!showGifts)} style={styles.inputIconBtn}>
          <Gift size={18} color={COLORS.accentGold} strokeWidth={1.8} />
        </TouchableOpacity>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Write a message..."
          placeholderTextColor={COLORS.mutedGray}
          style={styles.textInput}
        />

        <TouchableOpacity activeOpacity={0.88} onPress={handleSend} style={styles.sendBtn}>
          <Send size={16} color={COLORS.primary} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGlassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.accentGold,
  },
  nameText: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statusText: {
    fontSize: 9,
    color: COLORS.mutedGray,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  encryptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.6)',
    alignSelf: 'center',
    marginBottom: SPACING.sm,
  },
  encryptText: {
    fontSize: 9,
    color: COLORS.lightGray,
  },
  bubbleWrapper: {
    marginBottom: 4,
  },
  userBubbleAlign: {
    alignItems: 'flex-end',
  },
  otherBubbleAlign: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: RADIUS.md,
  },
  userBubble: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    borderBottomRightRadius: 2,
    ...SHADOWS.soft,
  },
  otherBubble: {
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomLeftRadius: 2,
  },
  msgText: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    lineHeight: 18,
  },
  timeText: {
    fontSize: 8,
    color: COLORS.mutedGray,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  voiceNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceText: {
    fontSize: 11,
    color: COLORS.white,
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  giftText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  giftsTray: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SPACING.sm,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.darkGlassBorder,
  },
  giftChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  giftChipText: {
    fontSize: 10,
    color: COLORS.white,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: 12,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    fontSize: 12,
    color: COLORS.white,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.goldGlow,
  },
});
