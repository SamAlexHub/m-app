import React, { useState } from 'react';
import { ArrowLeft, Phone, Video, Send, Mic, Sparkles, Gift, Calendar, ShieldCheck, Play, CheckCheck } from 'lucide-react';
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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleSendVoiceNote = () => {
    const voiceMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'user',
      text: 'Voice Note (0:18)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceNote: true,
      duration: '0:18'
    };
    sendMessage(profile.id, voiceMsg);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#062E2A] text-white flex flex-col justify-between select-none overflow-hidden">
      
      {/* Top Luxury Chat Header Bar */}
      <div className="relative z-10 px-4 py-3 bg-[#0E453F]/90 backdrop-blur-xl border-b border-[#D6A24A]/30 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('home')}
            className="w-9 h-9 rounded-full bg-[#062E2A] border border-white/15 flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            onClick={() => setScreen('profile')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-full p-[1px] bg-gradient-to-r from-[#D6A24A] to-[#F8E8CD]">
              <img src={profile.photos[0]} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#062E2A]" />
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-1">
                {profile.name}
                <ShieldCheck className="w-4 h-4 text-[#D6A24A]" />
              </h3>
              <span className="text-[10px] text-gray-300">Online • Verified VIP</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDatePlannerOpen(true)}
            className="w-9 h-9 rounded-full bg-[#062E2A] border border-[#D6A24A]/40 flex items-center justify-center text-[#D6A24A] hover:bg-[#D6A24A] hover:text-[#062E2A] transition-colors"
            title="Date Planner"
          >
            <Calendar className="w-4 h-4" />
          </button>

          <button
            onClick={() => setVideoCallActive(true)}
            className="w-9 h-9 rounded-full bg-[#062E2A] border border-[#D6A24A]/40 flex items-center justify-center text-[#D6A24A] hover:bg-[#D6A24A] hover:text-[#062E2A] transition-colors"
            title="HD Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Encrypted Protection Badge */}
        <div className="flex justify-center my-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E453F]/60 border border-white/10 text-gray-300 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D6A24A]" />
            <span>Messages protected by 256-Bit Encrypted Confidentiality</span>
          </div>
        </div>

        {chatMessages.map((msg) => {
          const isUser = msg.senderId === 'user';

          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 shadow-md ${
                  isUser
                    ? 'bg-gradient-to-r from-[#145A53] to-[#0E453F] border border-[#D6A24A]/40 text-white rounded-br-none'
                    : 'bg-[#0E453F]/90 backdrop-blur-md border border-white/15 text-white rounded-bl-none'
                }`}
              >
                {/* Voice Note View */}
                {msg.isVoiceNote ? (
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <button className="w-8 h-8 rounded-full bg-[#D6A24A] flex items-center justify-center text-[#062E2A]">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                    <div className="flex-1">
                      {/* Waveform graphic */}
                      <div className="flex items-center gap-0.5 h-4">
                        <div className="w-1 h-3 bg-[#D6A24A] rounded-full" />
                        <div className="w-1 h-4 bg-[#D6A24A] rounded-full" />
                        <div className="w-1 h-2 bg-white/40 rounded-full" />
                        <div className="w-1 h-3 bg-[#D6A24A] rounded-full" />
                        <div className="w-1 h-5 bg-[#D6A24A] rounded-full" />
                        <div className="w-1 h-2 bg-white/40 rounded-full" />
                      </div>
                      <span className="text-[10px] text-gray-300 mt-1 block">Voice Note • {msg.duration}</span>
                    </div>
                  </div>
                ) : msg.isGiftSticker ? (
                  <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8 text-[#D6A24A] animate-bounce" />
                    <div>
                      <span className="text-xs font-bold text-[#D6A24A]">{msg.giftName}</span>
                      <p className="text-[10px] text-gray-300">Luxury Royal Gift</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed font-sans">{msg.text}</p>
                )}

                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] text-gray-400">{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-[#D6A24A]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Virtual Gifts Selection Tray */}
      {showGifts && (
        <div className="p-3 bg-[#0E453F] border-t border-[#D6A24A]/30 grid grid-cols-3 gap-2 animate-fade-in">
          <button
            onClick={() => handleSendGift('Dom Pérignon Champagne')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D6A24A] text-center text-xs"
          >
            🍾 Champagne
          </button>
          <button
            onClick={() => handleSendGift('100 Royal Red Roses')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D6A24A] text-center text-xs"
          >
            🌹 Rose Bouquet
          </button>
          <button
            onClick={() => handleSendGift('Cartier Gold Emblem')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D6A24A] text-center text-xs"
          >
            💍 Gold Ring
          </button>
        </div>
      )}

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-[#0E453F]/90 backdrop-blur-xl border-t border-white/10 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowGifts(!showGifts)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D6A24A] hover:bg-white/20 transition-colors"
        >
          <Gift className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleSendVoiceNote}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D6A24A]"
        />

        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] flex items-center justify-center text-[#062E2A] shadow-gold-glow hover:opacity-95 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4 fill-[#062E2A] ml-0.5" />
        </button>
      </form>
    </div>
  );
};
