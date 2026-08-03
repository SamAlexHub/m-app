import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, Video, Send, Mic, Gift, Calendar, ShieldCheck, Play } from 'lucide-react-native';
import { useAppStore, ChatMessage } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';

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
            <ArrowLeft size={18} color="#ffffff" />
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
            <Calendar size={18} color="#D6A24A" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVideoCallActive(true)} style={styles.iconBtn}>
            <Video size={18} color="#D6A24A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        <View style={styles.encryptBadge}>
          <ShieldCheck size={12} color="#D6A24A" />
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
                      <Play size={12} color="#062E2A" />
                    </View>
                    <Text style={styles.voiceText}>Voice Note • {msg.duration}</Text>
                  </View>
                ) : msg.isGiftSticker ? (
                  <View style={styles.giftRow}>
                    <Gift size={20} color="#D6A24A" />
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
          <Gift size={18} color="#D6A24A" />
        </TouchableOpacity>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Write a message..."
          placeholderTextColor="#9CA3AF"
          style={styles.textInput}
        />

        <TouchableOpacity activeOpacity={0.85} onPress={handleSend} style={styles.sendBtn}>
          <Send size={16} color="#062E2A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#0E453F',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 162, 74, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#062E2A',
    alignItems: 'center',
    justify: 'center',
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
    borderColor: '#D6A24A',
  },
  nameText: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusText: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#062E2A',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
    alignItems: 'center',
    justify: 'center',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    gap: 12,
  },
  encryptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(14, 69, 63, 0.6)',
    alignSelf: 'center',
    marginBottom: 8,
  },
  encryptText: {
    fontSize: 9,
    color: '#D1D5DB',
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
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomLeftRadius: 2,
  },
  msgText: {
    fontSize: 12,
    color: '#ffffff',
    lineHeight: 16,
  },
  timeText: {
    fontSize: 8,
    color: '#9CA3AF',
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
    backgroundColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
  },
  voiceText: {
    fontSize: 11,
    color: '#ffffff',
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  giftText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  giftsTray: {
    flexDirection: 'row',
    justify: 'space-around',
    padding: 8,
    backgroundColor: '#0E453F',
    borderTopWidth: 1,
    borderTopColor: 'rgba(214, 162, 74, 0.3)',
  },
  giftChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  giftChipText: {
    fontSize: 10,
    color: '#ffffff',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#0E453F',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justify: 'center',
  },
  textInput: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    fontSize: 12,
    color: '#ffffff',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
  },
});
