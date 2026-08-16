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
import { getPhotoUrl, renderText } from '../utils/profileHelpers';

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
  
  // Find appropriate profile safely: p2 represents the current user (Devan)
  const profile = isOwnProfile
    ? currentUserProfile
    : (fetchedProfile ||
       profiles.find((p: any) => p._id === selectedProfileId || p.id === selectedProfileId) ||
       MOCK_PROFILES.find((p: any) => p._id === selectedProfileId || p.id === selectedProfileId) ||
       MOCK_PROFILES[0]);

  // Guard: if profile is null/undefined, don't crash
  if (!profile) return null;

  const displayName = renderText(profile.firstName || profile.name, 'User');
  const username = `@${displayName.toLowerCase().replace(/ /g, '_')}`;
  const mainPhotoUri = getPhotoUrl(profile.mainPhoto?.url || (profile.photos && profile.photos[0]), '');

  const photo1Uri = getPhotoUrl(profile.photos?.[1], '');
  const photo2Uri = getPhotoUrl(profile.photos?.[2], '');
  const photo3Uri = getPhotoUrl(profile.photos?.[3], '');
  const photo4Uri = getPhotoUrl(profile.photos?.[4], '');

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
            const photoUrls = res.data.map((p: any) => getPhotoUrl(p, ''));
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
    setIntroText(currentUserProfile?.connectIntro || '');
    setConnectModalOpen(true);
  };

  const handleSendInvitation = () => {
    updateCurrentUserProfile({ connectIntro: introText });
    showCustomAlert({
      title: "Invitation Sent",
      message: `Your matchmaking interest with your personalized introduction has been sent to ${displayName} via Evervow Concierge!`,
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
          <ArrowLeft size={18} color="#1E152A" strokeWidth={2.4} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
        
        <Text style={styles.headerUsername}>{isOwnProfile ? "My Profile" : username}</Text>
        
        <View style={styles.headerRightActions}>
          {!isOwnProfile && (
            <TouchableOpacity onPress={() => setDetailsModalOpen(true)} style={styles.headerBtn}>
              <Eye size={18} color="#6D28D9" strokeWidth={2.2} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          )}
          {isOwnProfile ? (
            <TouchableOpacity onPress={handleLogout} style={[styles.headerBtn, { marginLeft: 8 }]}>
              <Power size={18} color="#DC2626" strokeWidth={2} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.headerBtn, { marginLeft: 8 }]}>
              <Ellipsis size={20} color="#1E152A" strokeWidth={2} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollFeed} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: '#1E152A', fontSize: 13, fontWeight: '600' }}>Loading profile...</Text>
          </View>
        ) : (
          <>

        {/* Large Centered Square Avatar with Rounded Corners & Edit Pencil */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            {mainPhotoUri ? (
              <Image source={{ uri: mainPhotoUri }} style={styles.avatarImg} />
            ) : (
              <View style={[styles.avatarImg, { backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center' }]}>
                {isOwnProfile ? (
                  <Upload size={24} color="#6D28D9" />
                ) : (
                  <User size={24} color="#6D28D9" />
                )}
              </View>
            )}
            {isOwnProfile && (
              <TouchableOpacity onPress={() => handleEditPhoto(0)} style={styles.pencilOverlayAvatar}>
                <Pencil size={11} color="#FFFFFF" strokeWidth={2.5} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Name and Job Subtitle */}
        <View style={styles.detailsBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{displayName}</Text>
            {((isOwnProfile && isProfileVerified) || (!isOwnProfile && (profile.userInfo?.isVerified || profile.verified || profile.isVerified))) && (
              <ShieldCheck size={18} color="#6D28D9" strokeWidth={2.5} style={{ marginLeft: 5 }} />
            )}
          </View>
          <Text style={styles.subtitleText}>{renderText(profile.occupation || profile.profession, '')} {profile.company ? `at ${renderText(profile.company, '')}` : ''}</Text>
        </View>

        {/* 3-Column Profile Stats: Age, Height, Zodiac */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCol}>
            <Text style={styles.statsValue}>{renderText(profile.age, 'N/A')}</Text>
            <Text style={styles.statsLabel}>Age</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsCol}>
            <Text style={styles.statsValue}>{renderText(profile.height, "5'6\"")}</Text>
            <Text style={styles.statsLabel}>Height</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsCol}>
            <Text style={styles.statsValue}>{renderText(profile.horoscope?.zodiac || profile.zodiacSign, 'N/A')}</Text>
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
              {photo1Uri ? (
                <Image source={{ uri: photo1Uri }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="#6D28D9" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="#5C4E75" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && photo1Uri ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color="#FFFFFF" strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>

            {/* Slot 3 (Index 3) */}
            <TouchableOpacity
              activeOpacity={isOwnProfile ? 0.85 : 1}
              onPress={isOwnProfile ? () => handleEditPhoto(3) : undefined}
              style={[styles.gridPhotoContainer, { height: 150 }]}
            >
              {photo3Uri ? (
                <Image source={{ uri: photo3Uri }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="#6D28D9" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="#5C4E75" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && photo3Uri ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color="#FFFFFF" strokeWidth={2.5} style={{ alignSelf: 'center' }} />
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
              {photo2Uri ? (
                <Image source={{ uri: photo2Uri }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="#6D28D9" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="#5C4E75" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && photo2Uri ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color="#FFFFFF" strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>

            {/* Slot 4 (Index 4) */}
            <TouchableOpacity
              activeOpacity={isOwnProfile ? 0.85 : 1}
              onPress={isOwnProfile ? () => handleEditPhoto(4) : undefined}
              style={[styles.gridPhotoContainer, { height: 210 }]}
            >
              {photo4Uri ? (
                <Image source={{ uri: photo4Uri }} style={styles.gridPhoto} />
              ) : isOwnProfile ? (
                <View style={styles.photoPlaceholder}>
                  <Upload size={18} color="#6D28D9" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ImageOff size={18} color="#5C4E75" strokeWidth={1.5} style={{ alignSelf: 'center' }} />
                </View>
              )}
              {isOwnProfile && photo4Uri ? (
                <View style={styles.pencilOverlayGrid}>
                  <Pencil size={10} color="#FFFFFF" strokeWidth={2.5} style={{ alignSelf: 'center' }} />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        </>
        )}
      </ScrollView>

      {/* Details Drawer Modal */}
      <Modal visible={detailsModalOpen} animationType="slide" transparent onRequestClose={() => setDetailsModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Full Matrimonial Dossier</Text>
              <TouchableOpacity onPress={() => setDetailsModalOpen(false)} style={styles.closeBtn}>
                <X size={14} color="#6D28D9" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Bio Section */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Personal Bio & Ethos</Text>
                <Text style={styles.modalText}>{renderText(profile.personalizedIntro || profile.bio, 'No bio provided.')}</Text>
              </View>

              {/* Physical & Personal */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Personal Details</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Religion:</Text> {renderText(profile.religion?._id || profile.religion, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Caste/Community:</Text> {renderText(profile.caste || profile.community, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Mother Tongue:</Text> {renderText(profile.motherTongue, 'N/A')}</Text>
              </View>

              {/* Education & Profession */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Career & Education</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Education:</Text> {renderText(profile.education, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Occupation:</Text> {renderText(profile.occupation || profile.profession, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Company:</Text> {renderText(profile.company, 'N/A')}</Text>
              </View>

              {/* Family Details */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Family Background</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Father's Profession:</Text> {renderText(profile.fatherProfession || profile.familyDetails?.father, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Mother's Profession:</Text> {renderText(profile.motherProfession || profile.familyDetails?.mother, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Family Background:</Text> {renderText(profile.familyBackground || profile.familyDetails?.background, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Family Values:</Text> {renderText(profile.familyValues || profile.familyDetails?.familyValues, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Ancestral Origin:</Text> {renderText(profile.ancestralOrigin || profile.familyDetails?.location, 'N/A')}</Text>
              </View>

              {/* Astro Details */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSecTitle}>Horoscope & Astro</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Zodiac Sign:</Text> {renderText(profile.zodiacSign || profile.horoscope?.zodiac, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Moon Sign (Rashi):</Text> {renderText(profile.moonSign || profile.horoscope?.rashi, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Nakshatra:</Text> {renderText(profile.nakshatra || profile.horoscope?.nakshatra, 'N/A')}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Manglik Status:</Text> {profile.isManglik || profile.horoscope?.manglik ? 'Yes' : 'No'}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Personalised Connection Invitation Modal */}
      <Modal visible={connectModalOpen} animationType="fade" transparent onRequestClose={() => setConnectModalOpen(false)}>
        <View style={styles.centerModalOverlay}>
          <View style={styles.centerModalContent}>
            <Text style={styles.centerModalTitle}>Send Royal Invitation</Text>
            <Text style={styles.centerModalSub}>
              Attach a personal note to introduce yourself and your family to {displayName}.
            </Text>

            <TextInput
              style={styles.introTextInput}
              value={introText}
              onChangeText={setIntroText}
              placeholder="Express genuine family values, interests, or warm greetings..."
              placeholderTextColor="#8B7F9E"
              multiline
            />

            <View style={styles.centerModalActions}>
              <TouchableOpacity onPress={() => setConnectModalOpen(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendInvitation} style={styles.sendBtn}>
                <Text style={styles.sendBtnText}>Send Invitation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        visible={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        photoIndex={editingPhotoIndex}
        currentPhotoUrl={profile.photos?.[editingPhotoIndex] || ''}
        onSavePhoto={handleSavePhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  headerUsername: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E152A',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
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
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#6D28D9',
  },
  pencilOverlayAvatar: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  pencilOverlayGrid: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  detailsBlock: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nameText: {
    ...TYPOGRAPHY.titleL,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E152A',
  },
  subtitleText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    color: '#4C3D65',
    marginTop: 2,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statsCol: {
    alignItems: 'center',
    flex: 1,
  },
  statsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(109, 40, 217, 0.15)',
  },
  statsValue: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E152A',
  },
  statsLabel: {
    fontSize: 10.5,
    color: '#5C4E75',
    marginTop: 3,
    fontWeight: '600',
  },
  actionColumn: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  completeBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  completeBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  connectBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  connectBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 10, 30, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(109, 40, 217, 0.15)',
    paddingBottom: SPACING.sm,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E152A',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  modalSection: {
    marginBottom: SPACING.md,
    backgroundColor: '#F3EEFA',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.15)',
  },
  modalSecTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#6D28D9',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalText: {
    fontSize: 12.5,
    color: '#4C3D65',
    lineHeight: 19,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1E152A',
  },
  photoPlaceholder: {
    flex: 1,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(109, 40, 217, 0.3)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  photoPlaceholderText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6D28D9',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  centerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 10, 30, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  centerModalContent: {
    width: '100%',
    maxWidth: 380,
    padding: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  centerModalTitle: {
    ...TYPOGRAPHY.titleM,
    color: '#1E152A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  centerModalSub: {
    ...TYPOGRAPHY.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#4C3D65',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  introTextInput: {
    width: '100%',
    height: 140,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.25)',
    borderRadius: RADIUS.md,
    color: '#1E152A',
    padding: SPACING.sm,
    fontSize: 13,
    lineHeight: 19,
    textAlignVertical: 'top',
    marginBottom: SPACING.md,
  },
  centerModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  cancelBtn: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.2)',
    backgroundColor: '#F3E8FF',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  sendBtn: {
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: RADIUS.full,
    backgroundColor: '#6D28D9',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  sendBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
