import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Heart, ShieldCheck, MapPin, Briefcase, GraduationCap, Calendar, MessageCircle } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { MOCK_PROFILES } from '../data/profiles';
import { GlassCard } from '../components/GlassCard';
import { CircularScore } from '../components/CircularScore';

export const ProfileScreen: React.FC = () => {
  const { selectedProfileId, setScreen, setDatePlannerOpen, shortlistedIds, toggleShortlist } = useAppStore();

  const profile = MOCK_PROFILES.find((p) => p.id === selectedProfileId) || MOCK_PROFILES[0];
  const isShortlisted = shortlistedIds.includes(profile.id);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cover Header */}
        <View style={styles.coverBox}>
          <Image source={{ uri: profile.coverPhoto }} style={styles.coverImg} />
          <View style={styles.coverOverlay} />

          <View style={styles.topActions}>
            <TouchableOpacity onPress={() => setScreen('discover')} style={styles.actionBtn}>
              <ArrowLeft size={18} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleShortlist(profile.id)} style={[styles.actionBtn, isShortlisted && styles.actionBtnLiked]}>
              <Heart size={18} color="#ffffff" fill={isShortlisted ? '#ffffff' : 'none'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Card */}
        <GlassCard style={styles.profileCard}>
          <View style={styles.profileHeaderRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
                {profile.verified && <ShieldCheck size={18} color="#D6A24A" />}
              </View>
              <Text style={styles.profText}>{profile.profession} at {profile.company}</Text>
              <View style={styles.locRow}>
                <MapPin size={12} color="#D6A24A" />
                <Text style={styles.locText}>{profile.location} • {profile.height}</Text>
              </View>
            </View>
            <CircularScore score={profile.aiMatchScore} size={70} />
          </View>

          <Text style={styles.bioText}>"{profile.bio}"</Text>
        </GlassCard>

        {/* Astro Kundali */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Astro Kundali Compatibility</Text>
          <GlassCard style={styles.gridBox}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>GUNA SCORE</Text>
              <Text style={styles.gridValGold}>{profile.horoscope.gunaScore}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>SUN ZODIAC</Text>
              <Text style={styles.gridVal}>{profile.horoscope.zodiac}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>NAKSHATRA</Text>
              <Text style={styles.gridVal}>{profile.horoscope.nakshatra}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>RASHI</Text>
              <Text style={styles.gridVal}>{profile.horoscope.rashi}</Text>
            </View>
          </GlassCard>
        </View>

        {/* Career */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career & Education</Text>
          <GlassCard>
            <View style={styles.infoRow}>
              <Briefcase size={18} color="#D6A24A" />
              <View>
                <Text style={styles.infoTitle}>{profile.profession}</Text>
                <Text style={styles.infoSub}>{profile.company}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <GraduationCap size={18} color="#D6A24A" />
              <View>
                <Text style={styles.infoTitle}>{profile.education}</Text>
                <Text style={styles.infoSub}>Verified Alumni Credentials</Text>
              </View>
            </View>
          </GlassCard>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setScreen('chat')} style={styles.chatBtn}>
          <MessageCircle size={16} color="#062E2A" />
          <Text style={styles.chatBtnText}>Chat Message</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setDatePlannerOpen(true)} style={styles.dateBtn}>
          <Calendar size={16} color="#D6A24A" />
          <Text style={styles.dateBtnText}>Book Date</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
  },
  content: {
    paddingBottom: 110,
  },
  coverBox: {
    height: 220,
    position: 'relative',
  },
  coverImg: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 46, 42, 0.4)',
  },
  topActions: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(6, 46, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justify: 'center',
  },
  actionBtnLiked: {
    backgroundColor: '#EF4444',
  },
  profileCard: {
    marginHorizontal: 16,
    marginTop: -40,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D6A24A',
    marginTop: 2,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locText: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  bioText: {
    fontSize: 11,
    color: '#E5E7EB',
    marginTop: 12,
    lineHeight: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  gridBox: {
    flexDirection: 'row',
    justify: 'space-between',
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  gridLabel: {
    fontSize: 8,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  gridValGold: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D6A24A',
    marginTop: 4,
  },
  gridVal: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
    marginTop: 6,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoSub: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  chatBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D6A24A',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
  },
  chatBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  dateBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
  },
  dateBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
