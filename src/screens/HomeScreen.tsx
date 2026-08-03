import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Sparkles, Bell, ShieldCheck, MapPin, Crown, Heart, ArrowRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';
import { SUCCESS_STORIES } from '../data/successStories';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const HomeScreen: React.FC = () => {
  const { setScreen, setSelectedProfileId, notifications } = useAppStore();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const topMatch = MOCK_PROFILES[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <View style={styles.locationRow}>
            <MapPin size={12} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.locationText}>MONACO • LONDON • DUBAI</Text>
          </View>
          <Text style={styles.greetingText}>Bonjour, Devan</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setScreen('notifications')} style={styles.iconBtn}>
            <Bell size={20} color={COLORS.accentGold} strokeWidth={1.8} />
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen('profile')} style={styles.avatarBtn}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }}
              style={styles.avatarImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Sparkles size={10} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.heroBadgeText}>EXCLUSIVE MATCHMAKING</Text>
          </View>
          <Text style={styles.heroTitle}>Where Modern Romance Meets Timeless Values</Text>
          <Text style={styles.heroSub}>Curated soulmate recommendations verified by European Concierge.</Text>
        </View>
      </View>

      {/* Today's AI Match */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Sparkles size={18} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Today’s AI Soulmate</Text>
          </View>
          <Text style={styles.refreshText}>Refreshes at midnight</Text>
        </View>

        <GlassCard glow onClick={() => { setSelectedProfileId(topMatch.id); setScreen('match-details'); }}>
          <View style={styles.matchCardRow}>
            <Image source={{ uri: topMatch.photos[0] }} style={styles.matchAvatar} />
            <View style={styles.matchInfo}>
              <Text style={styles.matchName}>{topMatch.name}, {topMatch.age}</Text>
              <Text style={styles.matchSub}>{topMatch.profession} • {topMatch.location}</Text>
              <Text style={styles.matchQuote} numberOfLines={2}>"{topMatch.matchReason}"</Text>

              <TouchableOpacity
                onPress={() => { setSelectedProfileId(topMatch.id); setScreen('match-details'); }}
                style={styles.insightBtn}
              >
                <Text style={styles.insightBtnText}>View Compatibility Insights</Text>
              </TouchableOpacity>
            </View>
            <CircularScore score={topMatch.aiMatchScore} size={84} />
          </View>
        </GlassCard>
      </View>

      {/* Verified Profiles Horizontal Reel */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <ShieldCheck size={18} color={COLORS.accentGold} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Verified Royal Profiles</Text>
          </View>
          <TouchableOpacity onPress={() => setScreen('discover')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reelContent}>
          {MOCK_PROFILES.map((p) => (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.85}
              onPress={() => { setSelectedProfileId(p.id); setScreen('profile'); }}
              style={styles.reelCard}
            >
              <Image source={{ uri: p.photos[0] }} style={styles.reelImage} />
              <View style={styles.reelOverlay} />
              <View style={styles.reelBadge}>
                <Text style={styles.reelBadgeText}>{p.aiMatchScore}%</Text>
              </View>
              <View style={styles.reelFooter}>
                <Text style={styles.reelName}>{p.name}</Text>
                <Text style={styles.reelSub} numberOfLines={1}>{p.profession}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* VIP Membership Banner */}
      <View style={styles.section}>
        <GlassCard glow onClick={() => setScreen('membership')}>
          <View style={styles.vipRow}>
            <View style={styles.vipTextCol}>
              <View style={styles.vipBadge}>
                <Crown size={12} color={COLORS.accentGold} strokeWidth={2} />
                <Text style={styles.vipBadgeText}>DIAMOND VIP MEMBERSHIP</Text>
              </View>
              <Text style={styles.vipTitle}>Unlock Private Matchmaker Concierge</Text>
              <Text style={styles.vipSub}>Senior European wedding consultants & incognito mode.</Text>
            </View>
            <View style={styles.vipArrowBtn}>
              <ArrowRight size={20} color={COLORS.primary} strokeWidth={2.5} />
            </View>
          </View>
        </GlassCard>
      </View>

      {/* Success Stories */}
      <View style={[styles.section, { marginBottom: SPACING.xl }]}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Heart size={18} color={COLORS.redAccent} fill={COLORS.redAccent} />
            <Text style={styles.sectionTitle}>Royal Success Stories</Text>
          </View>
          <TouchableOpacity onPress={() => setScreen('success-stories')}>
            <Text style={styles.viewAllText}>Explore All</Text>
          </TouchableOpacity>
        </View>

        <GlassCard onClick={() => setScreen('success-stories')}>
          <View style={styles.storyRow}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80' }} style={styles.storyImg} />
            <View style={styles.storyContent}>
              <Text style={styles.storyLoc}>VILLA D’ESTE, LAKE COMO</Text>
              <Text style={styles.storyCouple}>{SUCCESS_STORIES[0].coupleNames}</Text>
              <Text style={styles.storyQuote} numberOfLines={2}>"{SUCCESS_STORIES[0].quote}"</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: SPACING.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  greetingText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    alignItems: 'center',
    justify: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.redAccent,
    alignItems: 'center',
    justify: 'center',
  },
  unreadText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.accentGold,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  heroCard: {
    height: 160,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    position: 'relative',
    marginBottom: SPACING.lg,
    ...SHADOWS.soft,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 47, 43, 0.65)',
  },
  heroContent: {
    padding: SPACING.md,
    justify: 'center',
    flex: 1,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  heroBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  heroTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 18,
    lineHeight: 24,
  },
  heroSub: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    marginTop: 2,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: SPACING.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 18,
  },
  refreshText: {
    fontSize: 10,
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 11,
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  matchCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  matchAvatar: {
    width: 72,
    height: 90,
    borderRadius: RADIUS.md,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
  },
  matchSub: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    marginTop: 2,
  },
  matchQuote: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 4,
    fontStyle: 'italic',
  },
  insightBtn: {
    marginTop: SPACING.sm,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justify: 'center',
    ...SHADOWS.goldGlow,
  },
  insightBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  reelContent: {
    gap: SPACING.md,
  },
  reelCard: {
    width: 120,
    height: 160,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
  },
  reelImage: {
    width: '100%',
    height: '100%',
  },
  reelOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  reelBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  reelBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  reelFooter: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  reelName: {
    fontFamily: 'serif',
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  reelSub: {
    fontSize: 9,
    color: COLORS.lightGray,
  },
  vipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  vipTextCol: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  vipBadgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  vipTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
  },
  vipSub: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    marginTop: 2,
  },
  vipArrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justify: 'center',
    ...SHADOWS.goldGlow,
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  storyImg: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.md,
  },
  storyContent: {
    flex: 1,
  },
  storyLoc: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 8,
  },
  storyCouple: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    marginTop: 1,
  },
  storyQuote: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
    fontStyle: 'italic',
  },
});
