import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Sparkles, Bell, ShieldCheck, MapPin, Crown, Heart, ArrowRight } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';
import { SUCCESS_STORIES } from '../data/successStories';

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
            <MapPin size={12} color="#D6A24A" />
            <Text style={styles.locationText}>MONACO • LONDON • DUBAI</Text>
          </View>
          <Text style={styles.greetingText}>Bonjour, Devan</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setScreen('notifications')} style={styles.iconBtn}>
            <Bell size={20} color="#D6A24A" />
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
            <Sparkles size={10} color="#D6A24A" />
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
            <Sparkles size={18} color="#D6A24A" />
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
            <CircularScore score={topMatch.aiMatchScore} size={80} />
          </View>
        </GlassCard>
      </View>

      {/* Verified Profiles Horizontal Reel */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <ShieldCheck size={18} color="#D6A24A" />
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
              activeOpacity={0.8}
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
                <Crown size={12} color="#D6A24A" />
                <Text style={styles.vipBadgeText}>DIAMOND VIP MEMBERSHIP</Text>
              </View>
              <Text style={styles.vipTitle}>Unlock Private Matchmaker Concierge</Text>
              <Text style={styles.vipSub}>Senior European wedding consultants & incognito mode.</Text>
            </View>
            <View style={styles.vipArrowBtn}>
              <ArrowRight size={20} color="#062E2A" />
            </View>
          </View>
        </GlassCard>
      </View>

      {/* Success Stories */}
      <View style={[styles.section, { marginBottom: 32 }]}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Heart size={18} color="#EF4444" fill="#EF4444" />
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
    backgroundColor: '#062E2A',
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  greetingText: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
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
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
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
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justify: 'center',
  },
  unreadText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D6A24A',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  heroCard: {
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 46, 42, 0.65)',
  },
  heroContent: {
    padding: 16,
    justifyContent: 'center',
    flex: 1,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(14, 69, 63, 0.9)',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  heroBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  heroTitle: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroSub: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  refreshText: {
    fontSize: 10,
    color: '#D6A24A',
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 11,
    color: '#D6A24A',
    fontWeight: 'bold',
  },
  matchCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  matchAvatar: {
    width: 72,
    height: 90,
    borderRadius: 16,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  matchSub: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  matchQuote: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 4,
    fontStyle: 'italic',
  },
  insightBtn: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#D6A24A',
    alignSelf: 'flex-start',
  },
  insightBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  reelContent: {
    gap: 12,
  },
  reelCard: {
    width: 120,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0E453F',
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
    borderRadius: 10,
    backgroundColor: '#062E2A',
  },
  reelBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
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
    color: '#ffffff',
  },
  reelSub: {
    fontSize: 9,
    color: '#D1D5DB',
  },
  vipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  vipTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  vipBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
  },
  vipTitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  vipSub: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
  },
  vipArrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storyImg: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
  storyContent: {
    flex: 1,
  },
  storyLoc: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  storyCouple: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 1,
  },
  storyQuote: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
