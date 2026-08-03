import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { ArrowLeft, MoreHorizontal, ShieldCheck, Eye, X, LogOut, Settings } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const ProfileScreen: React.FC = () => {
  const { selectedProfileId, setScreen, isProfileVerified } = useAppStore();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // If selectedProfileId is empty or is the current user ('p2'), display Devan M. Kapoor's own profile.
  const isOwnProfile = !selectedProfileId || selectedProfileId === 'p2';
  
  // Find appropriate profile: p2 represents the current user (Devan)
  const profile = MOCK_PROFILES.find((p) => p.id === (isOwnProfile ? 'p2' : selectedProfileId)) || MOCK_PROFILES[0];
  
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

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your Éternité luxury account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: () => setScreen('login') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.headerBtn}>
            <ArrowLeft size={20} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          
          <Text style={styles.headerUsername}>{isOwnProfile ? "My Profile" : username}</Text>
          
          <View style={styles.headerRightActions}>
            {!isOwnProfile && (
              <TouchableOpacity onPress={() => setDetailsModalOpen(true)} style={styles.headerBtn}>
                <Eye size={18} color={COLORS.accentGold} strokeWidth={2.2} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            )}
            {isOwnProfile ? (
              <TouchableOpacity onPress={handleLogout} style={[styles.headerBtn, { marginLeft: 8 }]}>
                <LogOut size={16} color={COLORS.redAccent} strokeWidth={2} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.headerBtn, { marginLeft: 8 }]}>
                <MoreHorizontal size={20} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Large Centered Square Avatar with Rounded Corners */}
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: profile.photos[0] }} style={styles.avatarImg} />
        </View>

        {/* Name and Job Subtitle */}
        <View style={styles.detailsBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{profile.name}</Text>
            {((isOwnProfile && isProfileVerified) || (!isOwnProfile && profile.verified)) && (
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

        {/* Action Button Section */}
        {isOwnProfile ? (
          <View style={styles.actionColumn}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => setScreen('complete-profile')} style={styles.completeBtn}>
              <Text style={styles.completeBtnText}>Complete Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={handleLogout} style={styles.logoutBtn}>
              <LogOut size={14} color={COLORS.redAccent} strokeWidth={2} style={{ marginRight: 6 }} />
              <Text style={styles.logoutBtnText}>Sign Out of Éternité</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.85} onPress={handleConnect} style={styles.connectBtn}>
            <Text style={styles.connectBtnText}>Connect Now</Text>
          </TouchableOpacity>
        )}

        {/* Masonry Photo Grid */}
        <View style={styles.photoGrid}>
          <View style={styles.gridColumn}>
            <Image source={{ uri: profile.photos[0] }} style={[styles.gridPhoto, { height: 210 }]} />
            {profile.photos[2] && <Image source={{ uri: profile.photos[2] }} style={[styles.gridPhoto, { height: 150 }]} />}
          </View>
          <View style={styles.gridColumn}>
            {profile.photos[1] && <Image source={{ uri: profile.photos[1] }} style={[styles.gridPhoto, { height: 150 }]} />}
            {profile.photos[3] && <Image source={{ uri: profile.photos[3] }} style={[styles.gridPhoto, { height: 210 }]} />}
          </View>
        </View>
      </ScrollView>

      {/* Profile Details Modal Popup (Candidate Information) */}
      <Modal visible={detailsModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detailed Profile Insights</Text>
              <TouchableOpacity onPress={() => setDetailsModalOpen(false)} style={styles.closeBtn}>
                <X size={16} color={COLORS.white} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              {/* Category 1: Family Background */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Family Background</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Heritage:</Text> {profile.familyDetails.background}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Father's Profession:</Text> {profile.familyDetails.father}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Mother's Profession:</Text> {profile.familyDetails.mother}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Family Values:</Text> {profile.familyDetails.familyValues}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Native Place:</Text> {profile.familyDetails.location}</Text>
              </View>

              {/* Category 2: Academic & Career */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Education & Profession</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Highest Education:</Text> {profile.education}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Occupation:</Text> {profile.profession}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Company:</Text> {profile.company}</Text>
              </View>

              {/* Category 3: Vedic Astro details */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Horoscope & Astro Kundali</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Zodiac Sign:</Text> {profile.horoscope.zodiac}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Rashi / Moon Sign:</Text> {profile.horoscope.rashi}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Nakshatra:</Text> {profile.horoscope.nakshatra}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Manglik Status:</Text> {profile.horoscope.manglik ? "Manglik" : "Non-Manglik"}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
    display: 'flex',
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
  actionColumn: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  completeBtn: {
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.goldGlow,
  },
  completeBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  logoutBtn: {
    height: 48,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoutBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.redAccent,
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
  // Modal popups styling
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.md,
    maxHeight: '75%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: SPACING.sm,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  modalSection: {
    marginBottom: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  modalSecTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalText: {
    fontSize: 11,
    color: COLORS.white,
    lineHeight: 18,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.mutedGray,
  },
});
