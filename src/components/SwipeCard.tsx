import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, ShieldCheck, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { Profile } from '../data/profiles';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { getPhotoUrl, renderText } from '../utils/profileHelpers';

interface SwipeCardProps {
  profile: Profile;
  onLike?: () => void;
  onPass?: () => void;
  onSuperLike?: () => void;
  onOpenDetails?: () => void;
  onStartChat?: () => void;
  onTap?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onLike,
  onPass,
  onSuperLike,
  onOpenDetails,
  onStartChat,
  onTap,
}) => {
  const handleOpenDetails = onOpenDetails || onTap || (() => {});
  const handleLike = onLike || (() => {});
  const handleSuperLike = onSuperLike || (() => {});
  const handleStartChat = onStartChat || (() => {});

  const photoUri = getPhotoUrl(profile?.mainPhoto?.url || profile?.photos?.[0]);
  const displayName = renderText(profile?.firstName || profile?.name, 'User');
  const displayProfession = renderText(profile?.profession || profile?.occupation, '');
  const displayBio = renderText(profile?.bio || profile?.personalizedIntro, 'Looking for a meaningful connection.');
  const displayLocation = renderText(profile?.location || profile?.city, 'Global Elite');

  return (
    <View style={styles.cardContainer}>
      {/* Photo Image Card */}
      <TouchableOpacity activeOpacity={0.92} onPress={handleOpenDetails} style={styles.imageCard}>
        <Image source={{ uri: photoUri }} style={styles.image} resizeMode="cover" />
        <View style={styles.imageOverlay} />
        
        {/* Glassmorphic Overlay pill bottom-left */}
        <View style={styles.imageOverlayPill}>
          <Text style={styles.imageOverlayText}>{profile?.aiMatchScore || profile?.profileCompletion || 90}% Match</Text>
        </View>
      </TouchableOpacity>

      {/* Action Row below the Photo (Heart, MessageCircle, Send, Bookmark) */}
      <View style={styles.feedActionRow}>
        <View style={styles.feedActionLeft}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleLike} style={styles.feedActionBtn}>
            <Heart size={22} color={COLORS.redAccent} fill={COLORS.redAccent} strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleStartChat} style={styles.feedActionBtn}>
            <MessageCircle size={22} color={COLORS.white} strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleSuperLike} style={styles.feedActionBtn}>
            <Send size={20} color={COLORS.white} strokeWidth={1.8} style={styles.sendIconRotated} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity activeOpacity={0.7} onPress={handleOpenDetails} style={styles.feedActionBtn}>
          <Bookmark size={22} color={COLORS.accentGold} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      {/* Description Section */}
      <TouchableOpacity activeOpacity={0.9} onPress={handleOpenDetails} style={styles.feedDescContainer}>
        <View style={styles.feedNameRow}>
          <Text style={styles.feedNameText}>{displayName}{profile?.age ? `, ${profile.age}` : ''}</Text>
          {(profile?.verified || profile?.isVerified) && <ShieldCheck size={14} color={COLORS.accentGold} strokeWidth={2.5} style={{ marginLeft: 5 }} />}
        </View>
        
        <Text style={styles.feedStatusText} numberOfLines={2}>
          {displayProfession ? <Text style={styles.boldText}>{displayProfession}</Text> : null}
          {displayProfession ? ' • ' : ''}{displayBio}
        </Text>
        
        <View style={styles.feedMetaRow}>
          <Text style={styles.feedMetaText}>{displayLocation} • Active Now • </Text>
          <Text style={styles.moreText}>more</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: SPACING.md,
  },
  imageCard: {
    width: '100%',
    height: 380,
    borderRadius: 24,
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
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.25)',
  },
  imageOverlayPill: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(7, 47, 43, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 10,
  },
  imageOverlayText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  topRow: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(7, 47, 43, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  verifiedText: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.accentGold,
    letterSpacing: 1,
  },
  tierBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  tierText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  feedActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: SPACING.xs,
  },
  feedActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  feedActionBtn: {
    padding: 2,
  },
  sendIconRotated: {
    transform: [{ rotate: '-25deg' }],
    marginTop: -2,
  },
  feedDescContainer: {
    paddingHorizontal: SPACING.xs,
  },
  feedNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  feedNameText: {
    ...TYPOGRAPHY.titleM,
    fontSize: 15,
  },
  feedStatusText: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.lightGray,
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
  feedMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  feedMetaText: {
    fontSize: 10,
    color: COLORS.mutedGray,
  },
  moreText: {
    fontSize: 10,
    color: COLORS.mutedGray,
    fontWeight: 'bold',
  },
});
