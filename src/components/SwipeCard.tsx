import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, X, Sparkles, ShieldCheck, MapPin, Briefcase, MessageCircle } from 'lucide-react-native';
import { Profile } from '../data/profiles';

const { width } = Dimensions.get('window');

interface SwipeCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onOpenDetails: () => void;
  onStartChat: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onLike,
  onPass,
  onSuperLike,
  onOpenDetails,
  onStartChat,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: profile.photos[0] }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />

      {/* Top Badges */}
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
          {profile.verified && (
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={12} color="#D6A24A" />
              <Text style={styles.verifiedText}>Verified Royal</Text>
            </View>
          )}
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>{profile.vipTier} VIP</Text>
          </View>
        </View>

        <View style={styles.scoreBadge}>
          <Sparkles size={12} color="#062E2A" />
          <Text style={styles.scoreText}>{profile.aiMatchScore}% Match</Text>
        </View>
      </View>

      {/* Content Details */}
      <TouchableOpacity activeOpacity={0.9} onPress={onOpenDetails} style={styles.detailsContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
          <Text style={styles.gunaText}>{profile.horoscope.gunaScore} Guna Sync</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MapPin size={12} color="#D6A24A" />
            <Text style={styles.metaText}>{profile.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Briefcase size={12} color="#D6A24A" />
            <Text style={styles.metaText}>{profile.profession}</Text>
          </View>
        </View>

        <Text style={styles.bioText} numberOfLines={2}>
          "{profile.bio}"
        </Text>

        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{profile.religion} • {profile.community}</Text>
          </View>
          <View style={styles.tagGold}>
            <Text style={styles.tagGoldText}>{profile.horoscope.zodiac}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPass} style={styles.passButton}>
          <X size={20} color="#EF4444" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={onSuperLike} style={styles.superLikeButton}>
          <Sparkles size={20} color="#D6A24A" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={onLike} style={styles.likeButton}>
          <Heart size={28} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={onStartChat} style={styles.chatButton}>
          <MessageCircle size={20} color="#D6A24A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 520,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 46, 42, 0.45)',
  },
  topRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 46, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.5)',
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  tierBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(14, 69, 63, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tierText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#D6A24A',
  },
  scoreText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  nameText: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gunaText: {
    fontSize: 11,
    color: '#D6A24A',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#E5E7EB',
  },
  bioText: {
    fontSize: 11,
    color: '#D1D5DB',
    marginTop: 6,
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tagText: {
    fontSize: 10,
    color: '#ffffff',
  },
  tagGold: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
    backgroundColor: 'rgba(214, 162, 74, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  tagGoldText: {
    fontSize: 10,
    color: '#D6A24A',
    fontWeight: 'bold',
  },
  actionRow: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 20,
  },
  passButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(6, 46, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    alignItems: 'center',
    justify: 'center',
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
  },
  likeButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
    elevation: 8,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(6, 46, 42, 0.9)',
    borderWidth: 1,
    borderColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
  },
});
