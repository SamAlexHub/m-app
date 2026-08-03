import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, X, Sparkles, ShieldCheck, MapPin, Briefcase, MessageCircle } from 'lucide-react-native';
import { Profile } from '../data/profiles';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

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
              <ShieldCheck size={12} color={COLORS.accentGold} />
              <Text style={styles.verifiedText}>Verified Royal</Text>
            </View>
          )}
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>{profile.vipTier} VIP</Text>
          </View>
        </View>

        <View style={styles.scoreBadge}>
          <Sparkles size={12} color={COLORS.primary} />
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
            <MapPin size={14} color={COLORS.accentGold} />
            <Text style={styles.metaText}>{profile.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Briefcase size={14} color={COLORS.accentGold} />
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
          <X size={20} color={COLORS.redAccent} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={onSuperLike} style={styles.superLikeButton}>
          <Sparkles size={20} color={COLORS.accentGold} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={onLike} style={styles.likeButton}>
          <Heart size={26} color={COLORS.white} fill={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={onStartChat} style={styles.chatButton}>
          <MessageCircle size={20} color={COLORS.accentGold} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 520,
    borderRadius: RADIUS.xl, // 32px
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    position: 'relative',
    ...SHADOWS.soft,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.45)',
  },
  topRow: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    zIndex: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(7, 47, 43, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    letterSpacing: 0.5,
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tierText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.white,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 84,
    left: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justify: 'space-between',
  },
  nameText: {
    ...TYPOGRAPHY.titleL,
  },
  gunaText: {
    fontSize: 11,
    color: COLORS.accentGold,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.lightGray,
  },
  bioText: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    lineHeight: 18,
    marginTop: SPACING.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tagText: {
    fontSize: 10,
    color: COLORS.white,
  },
  tagGold: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(216, 168, 75, 0.2)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  tagGoldText: {
    fontSize: 10,
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  actionRow: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
    zIndex: 20,
  },
  passButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(7, 47, 43, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    alignItems: 'center',
    justify: 'center',
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
  },
  likeButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
    ...SHADOWS.goldGlow,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(7, 47, 43, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
  },
});
