import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { ArrowLeft, MoreHorizontal, ShieldCheck } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const ProfileScreen: React.FC = () => {
  const { selectedProfileId, setScreen } = useAppStore();

  const profile = MOCK_PROFILES.find((p) => p.id === selectedProfileId) || MOCK_PROFILES[0];
  
  // Construct clean username handle matching screenshot format
  const username = `@${profile.name.toLowerCase().replace(/ /g, '_')}`;

  const handleConnect = () => {
    Alert.alert(
      "Send Connection Interest",
      `Would you like to send a matchmaking interest to ${profile.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Send Now", 
          onPress: () => {
            Alert.alert("Success", `Your interest has been sent to ${profile.name} via Éternité Concierge! You will be notified immediately once they respond.`);
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Custom Header (Back Arrow, Centered Username, Settings) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('discover')} style={styles.headerBtn}>
            <ArrowLeft size={20} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerUsername}>{username}</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <MoreHorizontal size={20} color={COLORS.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Large Centered Square Avatar with Rounded Corners */}
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: profile.photos[0] }} style={styles.avatarImg} />
        </View>

        {/* Name and Job Subtitle */}
        <View style={styles.detailsBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{profile.name}</Text>
            {profile.verified && (
              <ShieldCheck size={18} color={COLORS.accentGold} strokeWidth={2.5} style={{ marginLeft: 5 }} />
            )}
          </View>
          <Text style={styles.subtitleText}>{profile.profession} at {profile.company}</Text>
        </View>

        {/* 3-Column Profile Stats: Age, Height, Zodiac */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCol}>
            <Text style={styles.statsValue}>{profile.age}</Text>
            <Text style={styles.statsLabel}>Age</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsCol}>
            <Text style={styles.statsValue}>{profile.height || "5'6\""}</Text>
            <Text style={styles.statsLabel}>Height</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsCol}>
            <Text style={styles.statsValue}>{profile.horoscope.zodiac}</Text>
            <Text style={styles.statsLabel}>Zodiac</Text>
          </View>
        </View>

        {/* Primary Connect Button */}
        <TouchableOpacity activeOpacity={0.85} onPress={handleConnect} style={styles.connectBtn}>
          <Text style={styles.connectBtnText}>Connect Now</Text>
        </TouchableOpacity>

        {/* Masonry Photo Grid */}
        <View style={styles.photoGrid}>
          <View style={styles.gridColumn}>
            <Image source={{ uri: profile.photos[0] }} style={[styles.gridPhoto, { height: 210 }]} />
            <Image source={{ uri: profile.photos[2] }} style={[styles.gridPhoto, { height: 150 }]} />
          </View>
          <View style={styles.gridColumn}>
            <Image source={{ uri: profile.photos[1] }} style={[styles.gridPhoto, { height: 150 }]} />
            <Image source={{ uri: profile.photos[3] }} style={[styles.gridPhoto, { height: 210 }]} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUsername: {
    ...TYPOGRAPHY.titleM,
    fontSize: 15,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  avatarImg: {
    width: 140,
    height: 140,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  detailsBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    color: COLORS.white,
  },
  subtitleText: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    marginTop: 4,
    color: COLORS.mutedGray,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    marginBottom: SPACING.lg,
  },
  statsCol: {
    alignItems: 'center',
    flex: 1,
  },
  statsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  statsValue: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    color: COLORS.white,
  },
  statsLabel: {
    fontSize: 10,
    color: COLORS.mutedGray,
    marginTop: 3,
    fontWeight: '600',
  },
  connectBtn: {
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.goldGlow,
  },
  connectBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  gridColumn: {
    flex: 1,
    gap: SPACING.md,
  },
  gridPhoto: {
    width: '100%',
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
