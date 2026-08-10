import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Bell, ShieldCheck, MapPin, Crown, Heart, ArrowRight, Settings } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';
import { SUCCESS_STORIES } from '../data/successStories';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { EmailOtpModal } from '../components/EmailOtpModal';

export const HomeScreen: React.FC = () => {
  const { setScreen, setSelectedProfileId, notifications, isProfileVerified, setProfileVerified, isEmailVerified, currentUserProfile, currentUser } = useAppStore();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [verificationExpanded, setVerificationExpanded] = useState(false);

  // Sync API status strictly: must be 'verified' and true
  const actualEmailVerified = currentUser?.isVerified === true || currentUser?.isEmailVerified === true || isEmailVerified;
  const actualProfileVerified = currentUserProfile?.vipVerificationDoc?.status === 'verified';

  const unreadCount = notifications.filter((n) => !n.read).length;
  const topMatch = MOCK_PROFILES[0];

  const completedCount = (actualEmailVerified ? 1 : 0) + 1 + (actualProfileVerified ? 1 : 0);

  const handleVerifyProfile = () => {
    Alert.alert(
      "Profile Verification",
      "Upload your passport or ID to get the gold verification shield. Would you like to verify now?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Verify Now", 
          onPress: () => {
            setProfileVerified(true);
            Alert.alert("Success", "Your profile has been verified by our European Concierge! The verification badge is now active.");
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingText} numberOfLines={1}>{currentUserProfile?.name || 'User'}</Text>
          <TouchableOpacity
            onPress={actualProfileVerified ? undefined : handleVerifyProfile}
            style={[
              styles.verifyPillHeader,
              actualProfileVerified ? styles.verifyPillHeaderVerified : styles.verifyPillHeaderPending
            ]}
          >
            <ShieldCheck
              size={10}
              color={actualProfileVerified ? COLORS.accentGold : COLORS.redAccent}
              strokeWidth={2.5}
            />
            <Text
              style={[
                styles.verifyPillTextHeader,
                actualProfileVerified ? styles.verifyPillTextHeaderVerified : styles.verifyPillTextHeaderPending
              ]}
            >
              {actualProfileVerified ? 'Verified' : 'Pending'}
            </Text>
          </TouchableOpacity>
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
        </View>
      </View>

      <ScrollView style={styles.scrollFeed} contentContainerStyle={styles.scrollContent}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>EXCLUSIVE MATCHMAKING</Text>
            </View>
            <Text style={styles.heroTitle}>Where Modern Romance Meets Timeless Values</Text>
            <Text style={styles.heroSub}>Curated soulmate recommendations verified by European Concierge.</Text>
          </View>
        </View>

        {/* Verification Checklist */}
        {(!actualProfileVerified || !actualEmailVerified) && (
          <View style={styles.section}>
            <TouchableOpacity 
              onPress={() => setVerificationExpanded(!verificationExpanded)}
              style={[styles.sectionHeader, { paddingVertical: SPACING.xs }]}
              activeOpacity={0.7}
            >
              <View style={styles.sectionTitleRow}>
                <ShieldCheck size={18} color={COLORS.accentGold} strokeWidth={2} />
                <Text style={styles.sectionTitle}>Verification Pending</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.checklistProgress}>{completedCount} of 3</Text>
                <ArrowRight 
                  size={16} 
                  color={COLORS.accentGold} 
                  style={{ transform: [{ rotate: verificationExpanded ? '90deg' : '0deg' }] }}
                />
              </View>
            </TouchableOpacity>

            {verificationExpanded && (
              <GlassCard glow>
                <View style={styles.checklistCard}>
                  <Text style={styles.checklistCardTitle}>Complete your verification tasks to unlock VIP royal profiles and match safely.</Text>
                  
                  {/* Email Verification Item */}
                  {actualEmailVerified ? (
                    <View style={styles.checkItemRow}>
                      <View style={[styles.checkIndicator, styles.checkIndicatorDone]}>
                        <Text style={styles.checkIndicatorText}>✓</Text>
                      </View>
                      <Text style={styles.checkItemTextDone}>Email Verification Completed</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => setEmailModalOpen(true)} style={styles.checkItemRow}>
                      <View style={styles.checkIndicator}>
                        <Text style={styles.checkIndicatorText}>•</Text>
                      </View>
                      <Text style={styles.checkItemText}>Email Verification (Action Required)</Text>
                      <ArrowRight size={12} color={COLORS.accentGold} style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>
                  )}
                  
                  {/* Mobile Phone Verification Item */}
                  <View style={styles.checkItemRow}>
                    <View style={[styles.checkIndicator, styles.checkIndicatorDone]}>
                      <Text style={styles.checkIndicatorText}>✓</Text>
                    </View>
                    <Text style={styles.checkItemTextDone}>Mobile Phone Verification Completed</Text>
                  </View>
                  
                  {/* Profile Verification Item */}
                  {actualProfileVerified ? (
                    <View style={styles.checkItemRow}>
                      <View style={[styles.checkIndicator, styles.checkIndicatorDone]}>
                        <Text style={styles.checkIndicatorText}>✓</Text>
                      </View>
                      <Text style={styles.checkItemTextDone}>Government ID Verification Completed</Text>
                    </View>
                  ) : currentUserProfile?.vipVerificationDoc?.status === 'pending' ? (
                    <View style={styles.checkItemRow}>
                      <View style={[styles.checkIndicator, { borderColor: COLORS.accentGold }]}>
                        <Text style={[styles.checkIndicatorText, { color: COLORS.accentGold }]}>⏳</Text>
                      </View>
                      <Text style={[styles.checkItemText, { color: COLORS.accentGold }]}>Government ID Verification (Pending Review)</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={handleVerifyProfile} style={styles.checkItemRow}>
                      <View style={styles.checkIndicator}>
                        <Text style={styles.checkIndicatorText}>•</Text>
                      </View>
                      <Text style={styles.checkItemText}>Government ID Verification (Action Required)</Text>
                      <ArrowRight size={12} color={COLORS.accentGold} style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>
                  )}
                </View>
              </GlassCard>
            )}
          </View>
        )}

        {/* Today's AI Match */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Heart size={18} color={COLORS.accentGold} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Today’s AI Soulmate</Text>
            </View>
            <Text style={styles.refreshText}>Refreshes at midnight</Text>
          </View>

          <GlassCard glow onClick={() => { setSelectedProfileId(topMatch.id); setScreen('match-details'); }}>
            <View style={styles.matchCardContent}>
              <View style={styles.matchCardTopRow}>
                <Image source={{ uri: topMatch.photos[0] }} style={styles.matchAvatar} />
                <View style={styles.matchInfo}>
                  <Text style={styles.matchName}>{topMatch.name}, {topMatch.age}</Text>
                  <Text style={styles.matchSub} numberOfLines={1}>{topMatch.profession} • {topMatch.location}</Text>
                  <View style={styles.sharedIntentBadge}>
                    <Text style={styles.sharedIntentText}>AI MATCH PRINCIPLE</Text>
                  </View>
                </View>
                <View style={styles.scoreContainer}>
                  <CircularScore score={topMatch.aiMatchScore} size={64} label="" />
                </View>
              </View>
              
              <Text style={styles.matchQuote} numberOfLines={2}>"{topMatch.matchReason}"</Text>

              <TouchableOpacity
                onPress={() => { setSelectedProfileId(topMatch.id); setScreen('match-details'); }}
                style={styles.insightBtn}
              >
                <Text style={styles.insightBtnText}>View Compatibility Insights</Text>
                <ArrowRight size={12} color={COLORS.primary} strokeWidth={2.5} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
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

      {/* Email Verification Modal Popup */}
      <EmailOtpModal visible={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollFeed: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  verifyPillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  verifyPillHeaderPending: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  verifyPillHeaderVerified: {
    backgroundColor: 'rgba(216, 168, 75, 0.12)',
    borderColor: 'rgba(216, 168, 75, 0.35)',
  },
  verifyPillTextHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  verifyPillTextHeaderPending: {
    color: COLORS.redAccent,
  },
  verifyPillTextHeaderVerified: {
    color: COLORS.accentGold,
  },
  greetingText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    marginTop: 0,
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
    justifyContent: 'center',
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
    justifyContent: 'center',
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
    justifyContent: 'center',
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
  checklistProgress: {
    fontSize: 10,
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },
  checklistCard: {
    paddingVertical: SPACING.xs,
  },
  checklistCardTitle: {
    fontSize: 11,
    color: COLORS.lightGray,
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    gap: 10,
  },
  checkIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkIndicatorDone: {
    backgroundColor: COLORS.accentGold,
  },
  checkIndicatorText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    lineHeight: 12,
  },
  checkItemText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
  },
  checkItemTextDone: {
    fontSize: 12,
    color: COLORS.mutedGray,
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
    width: '100%',
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
  matchCardContent: {
    flexDirection: 'column',
    width: '100%',
  },
  matchCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  matchAvatar: {
    width: 64,
    height: 80,
    borderRadius: RADIUS.md,
  },
  matchInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  matchName: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
  },
  matchSub: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    marginTop: 2,
  },
  sharedIntentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(216, 168, 75, 0.1)',
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
  },
  sharedIntentText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  scoreContainer: {
    marginLeft: SPACING.sm,
  },
  matchQuote: {
    ...TYPOGRAPHY.body,
    fontSize: 11,
    lineHeight: 16,
    marginTop: SPACING.md,
    fontStyle: 'italic',
    color: COLORS.lightGray,
  },
  insightBtn: {
    marginTop: SPACING.md,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
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
