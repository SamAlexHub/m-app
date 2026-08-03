import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { ArrowLeft, Shield, Upload, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const CompleteProfileScreen: React.FC = () => {
  const { setScreen, setProfileVerified } = useAppStore();
  const [fatherOcc, setFatherOcc] = useState('Chairman, Kapoor Enterprises');
  const [motherOcc, setMotherOcc] = useState('Former Managing Director, Tech Group');
  const [familyValues, setFamilyValues] = useState('Warm, Hospitable, Progressive Values');
  const [ancestralOrigins, setAncestralOrigins] = useState('Punjab & New Delhi');
  const [partnerZodiac, setPartnerZodiac] = useState('Aries, Leo, Sagittarius');
  const [isDocUploaded, setIsDocUploaded] = useState(false);

  const handleSave = () => {
    // Dynamically mark user verified if they upload verification document
    if (isDocUploaded) {
      setProfileVerified(true);
    }
    Alert.alert(
      "Profile Completed",
      "Your luxury matrimony profile credentials have been updated. Our Concierge verification team will review any newly uploaded documents within 2 hours.",
      [{ text: "Great", onPress: () => setScreen('profile') }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('profile')} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Info card */}
        <GlassCard style={styles.infoCard}>
          <Shield size={20} color={COLORS.accentGold} strokeWidth={1.8} />
          <Text style={styles.infoText}>
            Éternité guarantees 100% verified profiles. Complete your ancestral background and secure verification to unlock premium matches.
          </Text>
        </GlassCard>

        {/* Section: Family details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Heritage & Heritage Details</Text>
          <GlassCard style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Father’s Profession / Business</Text>
              <TextInput
                style={styles.input}
                value={fatherOcc}
                onChangeText={setFatherOcc}
                placeholder="Father's occupation"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mother’s Profession / Business</Text>
              <TextInput
                style={styles.input}
                value={motherOcc}
                onChangeText={setMotherOcc}
                placeholder="Mother's occupation"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Family Values & Lifestyle</Text>
              <TextInput
                style={styles.input}
                value={familyValues}
                onChangeText={setFamilyValues}
                placeholder="Family values description"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ancestral Origins / Native Place</Text>
              <TextInput
                style={styles.input}
                value={ancestralOrigins}
                onChangeText={setAncestralOrigins}
                placeholder="Ancestral origins"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>
          </GlassCard>
        </View>

        {/* Section: Match Expectations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soulmate Preference Criteria</Text>
          <GlassCard style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Zodiac Alignments</Text>
              <TextInput
                style={styles.input}
                value={partnerZodiac}
                onChangeText={setPartnerZodiac}
                placeholder="Partner zodiacs"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>
          </GlassCard>
        </View>

        {/* Section: Verify Document upload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Concierge VIP Security Verification</Text>
          <GlassCard style={styles.formCard}>
            <Text style={styles.uploadInfo}>
              Upload a copy of your Government Issued ID (Passport, National ID) to activate your gold checkmark badge immediately.
            </Text>
            
            <TouchableOpacity
              onPress={() => setIsDocUploaded(true)}
              style={[styles.uploadBox, isDocUploaded && styles.uploadBoxDone]}
            >
              {isDocUploaded ? (
                <>
                  <CheckCircle2 size={24} color={COLORS.accentGold} strokeWidth={2} />
                  <Text style={styles.uploadTextDone}>passport_devan_kapoor.pdf uploaded</Text>
                </>
              ) : (
                <>
                  <Upload size={24} color={COLORS.mutedGray} strokeWidth={1.8} />
                  <Text style={styles.uploadText}>Select Passport / National ID Document</Text>
                </>
              )}
            </TouchableOpacity>
          </GlassCard>
        </View>

        {/* Save CTA */}
        <TouchableOpacity activeOpacity={0.88} onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Profile Credentials</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingTop: SPACING.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  headerTitle: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: 'rgba(216, 168, 75, 0.08)',
    borderColor: 'rgba(216, 168, 75, 0.3)',
    marginBottom: SPACING.md,
  },
  infoText: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    color: COLORS.white,
    flex: 1,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    marginBottom: 8,
    color: COLORS.accentGold,
  },
  formCard: {
    gap: SPACING.md,
  },
  inputGroup: {},
  label: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.mutedGray,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 44,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: COLORS.white,
    paddingHorizontal: SPACING.sm,
    fontSize: 12,
  },
  uploadInfo: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    color: COLORS.mutedGray,
    marginBottom: 8,
  },
  uploadBox: {
    height: 90,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.darkGlassBorder,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadBoxDone: {
    borderColor: COLORS.accentGold,
    backgroundColor: 'rgba(216, 168, 75, 0.05)',
  },
  uploadText: {
    fontSize: 11,
    color: COLORS.mutedGray,
  },
  uploadTextDone: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  saveBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.goldGlow,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
