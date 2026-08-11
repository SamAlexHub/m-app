import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { ArrowLeft, Ellipsis, ShieldCheck, Eye, X, LogOut, Pencil, Upload, Power, ArrowRight, User, ImageOff } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';
import { EmailOtpModal } from '../components/EmailOtpModal';
import { UploadPhotoModal } from '../components/UploadPhotoModal';
import { apiService } from '../services/api';

const MOCK_EDIT_POOL = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
];

export const ProfileScreen: React.FC = () => {
  const { selectedProfileId, setScreen, isProfileVerified, isEmailVerified, currentUserProfile, updateCurrentUserProfile, updateUserPhoto, authToken, profiles, showCustomAlert } = useAppStore();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState(0);
  const [introText, setIntroText] = useState('');
  const [fetchedProfile, setFetchedProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // If selectedProfileId is empty or matches the current user's id, display own profile.
  const currentUserId = currentUserProfile?._id || (currentUserProfile as any)?.id;
  const isOwnProfile = !selectedProfileId || selectedProfileId === currentUserId || selectedProfileId === 'p2';
  
  // Find appropriate profile: p2 represents the current user (Devan)
  const profile = isOwnProfile ? currentUserProfile : (fetchedProfile || profiles.find((p: any) => p._id === selectedProfileId || p.id === selectedProfileId) || MOCK_PROFILES[0]);
  // Guard: if profile is null/undefined, don't crash
  if (!profile) return null;

  // Construct clean username handle matching screenshot format
  const username = `@${(profile.firstName || profile.name || 'user').toLowerCase().replace(/ /g, '_')}`;

  useEffect(() => {
    const loadProfileDetails = async () => {
      if (!isOwnProfile && authToken && selectedProfileId) {
        setLoading(true);
        try {
          const res = await apiService.getProfileById(selectedProfileId, authToken);
          if (res.data) {
            setFetchedProfile(res.data);
          }
        } catch (error) {
          console.error("Failed to load full profile details", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadProfileDetails();
  }, [isOwnProfile, authToken, selectedProfileId]);

  // Fetch photos on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      if (isOwnProfile && authToken) {
        try {
          const res = await apiService.getUserPhotos(authToken);
          if (res.success && res.data) {
            // Backend returns array of {url, isMain}. Map to string array.
            const photoUrls = res.data.map((p: any) => p.url);
            // Maintain array of 5 to match UI placeholders
            const formattedPhotos = [...photoUrls, ...Array(5 - photoUrls.length).fill('')];
            updateCurrentUserProfile({ photos: formattedPhotos.slice(0, 5) });
          }
        } catch (e) {
          console.error("Failed to fetch user photos", e);
        }
      }
    };
    fetchPhotos();
  }, [isOwnProfile, authToken]);

  const handleConnect = () => {
    setIntroText(currentUserProfile.connectIntro || '');
    setConnectModalOpen(true);
  };

  const handleSendInvitation = () => {
    updateCurrentUserProfile({ connectIntro: introText });
    showCustomAlert({
      title: "Invitation Sent",
      message: `Your matchmaking interest with your personalized introduction has been sent to ${profile.firstName || profile.name} via Evervow Concierge!`,
      type: "success",
      confirmText: "OK",
      onConfirm: () => setConnectModalOpen(false)
    });
  };

  const handleLogout = () => {
    showCustomAlert({
      title: "Sign Out",
      message: "Are you sure you want to sign out of your Evervow luxury account?",
      type: "info",
      cancelText: "Cancel",
      onCancel: () => {},
      confirmText: "Sign Out",
      onConfirm: () => setScreen('login')
    });
  };

  const handleEditPhoto = (index: number) => {
    setEditingPhotoIndex(index);
    setUploadModalOpen(true);
  };

  const handleSavePhoto = async (newUrl: string) => {
    updateUserPhoto(editingPhotoIndex, newUrl);
    if (authToken) {
      await apiService.addPhoto(newUrl, editingPhotoIndex === 0, authToken);
    }
  };

  return (
    <View style={styles.container}>
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
              <Power size={18} color={COLORS.redAccent} strokeWidth={2} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.headerBtn, { marginLeft: 8 }]}>
              <Ellipsis size={20} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollFeed} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: COLORS.white }}>Loading profile...</Text>
          </View>
        ) : (
          <>

        {/* Large Centered Square Avatar with Rounded Corners & Edit Pencil */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            {(profile.mainPhoto?.url || (profile.photos && profile.photos[0])) ? (
              <Image source={{ uri: profile.mainPhoto?.url || profile.photos[0] }} style={styles.avatarImg} />
            ) : (
              <View style={[styles.avatarImg, { backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }]}>
                {isOwnProfile ? (
                  <Upload size={24} color="rgba(255, 255, 255, 0.2)" />
                ) : (
                  <User size={24} color="rgba(255, 255, 255, 0.2)" />
                )}
              </View>
            )}
            {isOwnProfile && (
              <TouchableOpacity onPress={() => handleEditPhoto(0)} style={styles.pencilOverlayAvatar}>
                <Pencil size={11} color={COLORS.primary} strokeWidth={2.5} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Name and Job Subtitle */}
        <View style={styles.detailsBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{profile.firstName || profile.name}</Text>
            {((isOwnProfile && isProfileVerified) || (!isOwnProfile && (profile.userInfo?.isVerified || profile.verified || profile.isVerified))) && (
              <ShieldCheck size={18} color={COLORS.accentGold} strokeWidth={2.5} style={{ marginLeft: 5 }} />
            )}
          </View>
          <Text style={styles.subtitleText}>{profile.occupation || profile.profession} {profile.company ? `at ${profile.company}` : ''}</Text>
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
            <Text style={styles.statsValue}>{profile.horoscope?.zodiac || profile.zodiacSign || 'N/A'}</Text>
            <Text style={styles.statsLabel}>Zodiac</Text>
          </View>
        </View>

        {/* Action Button Section */}
        {isOwnProfile ? (
          <View style={styles.actionColumn}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => setScreen('complete-profile')} style={styles.completeBtn}>
              <Text style={styles.completeBtnText}>Complete Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.85} onPress={handleConnect} style={styles.connectBtn}>
            <Text style={styles.connectBtnText}>Connect Now</Text>
          </TouchableOpacity>
        )}

        {/* Masonry Photo Grid with Edit Pencils & Placeholders */}
        <View style={styles.photoGrid}>
          {/* Column 1 */}
          <View style={styles.gridColumn}>
            {/* Slot 1 (Index 1) */}
            <TouchableOpacity
              activeOpacity={isOwnProfile ? 0.85 : 1}
              onPress={isOwnProfile ? () => handleEditPhoto(1) : undefined}
              style={[styles.gridPhotoContainer, { height: 210 }]}
            >
              {profile.photos?.[1] ? (
                <Image source={{ uri: profile.photos?.[1] }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="rgba(255, 255, 255, 0.2)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="rgba(255, 255, 255, 0.1)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && profile.photos?.[1] ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color={COLORS.primary} strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>

            {/* Slot 3 (Index 3) */}
            <TouchableOpacity
              activeOpacity={isOwnProfile ? 0.85 : 1}
              onPress={isOwnProfile ? () => handleEditPhoto(3) : undefined}
              style={[styles.gridPhotoContainer, { height: 150 }]}
            >
              {profile.photos?.[3] ? (
                <Image source={{ uri: profile.photos?.[3] }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="rgba(255, 255, 255, 0.2)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="rgba(255, 255, 255, 0.1)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && profile.photos?.[3] ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color={COLORS.primary} strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>

          {/* Column 2 */}
          <View style={styles.gridColumn}>
            {/* Slot 2 (Index 2) */}
            <TouchableOpacity
              activeOpacity={isOwnProfile ? 0.85 : 1}
              onPress={isOwnProfile ? () => handleEditPhoto(2) : undefined}
              style={[styles.gridPhotoContainer, { height: 150 }]}
            >
              {profile.photos?.[2] ? (
                <Image source={{ uri: profile.photos?.[2] }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="rgba(255, 255, 255, 0.2)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="rgba(255, 255, 255, 0.1)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && profile.photos?.[2] ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color={COLORS.primary} strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>

            {/* Slot 4 (Index 4) */}
            <TouchableOpacity
              activeOpacity={isOwnProfile ? 0.85 : 1}
              onPress={isOwnProfile ? () => handleEditPhoto(4) : undefined}
              style={[styles.gridPhotoContainer, { height: 210 }]}
            >
              {profile.photos?.[4] ? (
                <Image source={{ uri: profile.photos?.[4] }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="rgba(255, 255, 255, 0.2)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="rgba(255, 255, 255, 0.1)" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && profile.photos?.[4] ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color={COLORS.primary} strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        </>
        )}
      </ScrollView>

      {/* Profile Details Modal Popup */}
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
                <Text style={styles.modalText}><Text style={styles.bold}>Heritage:</Text> {profile.familyDetails?.background || profile.familyBackground || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Father's Profession:</Text> {profile.familyDetails?.father || profile.fatherProfession || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Mother's Profession:</Text> {profile.familyDetails?.mother || profile.motherProfession || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Family Values:</Text> {profile.familyDetails?.familyValues || profile.familyValues || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Native Place:</Text> {profile.familyDetails?.location || profile.ancestralOrigin || 'Not specified'}</Text>
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
                <Text style={styles.modalText}><Text style={styles.bold}>Zodiac Sign:</Text> {profile.horoscope?.zodiac || profile.zodiacSign || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Rashi / Moon Sign:</Text> {profile.horoscope?.rashi || profile.moonSign || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Nakshatra:</Text> {profile.horoscope?.nakshatra || profile.nakshatra || 'Not specified'}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Manglik Status:</Text> {
                  profile.horoscope?.manglik !== undefined ? (profile.horoscope.manglik ? "Manglik" : "Non-Manglik") : 
                  (profile.isManglik !== undefined ? (profile.isManglik ? "Manglik" : "Non-Manglik") : 'Not specified')
                }</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Personalized Connection Modal Popup */}
      <Modal visible={connectModalOpen} animationType="fade" transparent>
        <View style={styles.centerModalOverlay}>
          <GlassCard style={styles.centerModalContent}>
            <Text style={styles.centerModalTitle}>Introduce Yourself</Text>
            <Text style={styles.centerModalSub}>
              Send a personalized message to {profile.name} along with your concierge connection request:
            </Text>

            <TextInput
              style={styles.introTextInput}
              value={introText}
              onChangeText={setIntroText}
              multiline
              numberOfLines={6}
              placeholder="Tell them about yourself, your career, expectations..."
              placeholderTextColor="rgba(255, 255, 255, 0.35)"
            />

            <View style={styles.centerModalActions}>
              <TouchableOpacity
                onPress={() => setConnectModalOpen(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSendInvitation}
                style={styles.sendBtn}
              >
                <Text style={styles.sendBtnText}>Send Request</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>
      </Modal>

      {/* Email Verification Modal Popup */}
      <EmailOtpModal visible={emailModalOpen} onClose={() => setEmailModalOpen(false)} />

      {/* Upload Photo Modal Popup */}
      <UploadPhotoModal
        visible={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        photoIndex={editingPhotoIndex}
        currentPhotoUrl={profile.photos?.[editingPhotoIndex]}
        onSavePhoto={handleSavePhoto}
      />
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
    paddingBottom: 110,
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
  avatarContainer: {
    position: 'relative',
    width: 140,
    height: 140,
  },
  avatarImg: {
    width: 140,
    height: 140,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  pencilOverlayAvatar: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accentGold,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    ...SHADOWS.soft,
  },
  pencilOverlayGrid: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.accentGold,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    ...SHADOWS.soft,
  },
  detailsBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
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
  emailVerifyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(216, 168, 75, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(216, 168, 75, 0.35)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  emailVerifyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  emailVerifySub: {
    fontSize: 10,
    color: COLORS.lightGray,
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
  gridPhotoContainer: {
    position: 'relative',
    width: '100%',
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
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
  photoPlaceholder: {
    flex: 1,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  photoPlaceholderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.mutedGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  centerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  centerModalContent: {
    width: '100%',
    maxWidth: 380,
    padding: SPACING.lg,
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  centerModalTitle: {
    ...TYPOGRAPHY.titleM,
    color: COLORS.accentGold,
    fontSize: 18,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  centerModalSub: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  introTextInput: {
    width: '100%',
    height: 140,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: RADIUS.md,
    color: COLORS.white,
    padding: SPACING.sm,
    fontSize: 12,
    lineHeight: 18,
    textAlignVertical: 'top',
    marginBottom: SPACING.md,
  },
  centerModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  sendBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  sendBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
