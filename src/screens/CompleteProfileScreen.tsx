import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, Switch, ActivityIndicator } from 'react-native';
import { ArrowLeft, Shield, Upload, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { apiService } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const CompleteProfileScreen: React.FC = () => {
  const { currentUserProfile, updateCurrentUserProfile, setScreen, setProfileVerified, authToken } = useAppStore();

  // Gender State (male / female - Required Feature)
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Personal / Physical State
  const [firstName, setFirstName] = useState(currentUserProfile.name ? currentUserProfile.name.split(' ')[0] : "");
  const [lastName, setLastName] = useState(currentUserProfile.name ? currentUserProfile.name.split(' ').slice(1).join(' ') : "");
  const [height, setHeight] = useState(currentUserProfile.height || "6'1\"");
  const [religion, setReligion] = useState(
    currentUserProfile.religion || ""
  );
  const [community, setCommunity] = useState(currentUserProfile.community || "Punjabi Khatri");
  const [motherTongue, setMotherTongue] = useState(currentUserProfile.motherTongue || "English / Hindi");

  // Job / Professional State
  const [profession, setProfession] = useState(currentUserProfile.profession || "");
  const [company, setCompany] = useState(currentUserProfile.company || "");
  const [education, setEducation] = useState(currentUserProfile.education || "");

  // Family Heritage State
  const [fatherOcc, setFatherOcc] = useState(currentUserProfile.familyDetails?.father || "");
  const [motherOcc, setMotherOcc] = useState(currentUserProfile.familyDetails?.mother || "");
  const [background, setBackground] = useState(currentUserProfile.familyDetails?.background || "");
  const [familyValues, setFamilyValues] = useState(currentUserProfile.familyDetails?.familyValues || "");
  const [ancestralOrigins, setAncestralOrigins] = useState(currentUserProfile.familyDetails?.location || "");

  // Astro / Horoscope State
  const [zodiac, setZodiac] = useState(currentUserProfile.horoscope?.zodiac || "");
  const [rashi, setRashi] = useState(currentUserProfile.horoscope?.rashi || "");
  const [nakshatra, setNakshatra] = useState(currentUserProfile.horoscope?.nakshatra || "");
  const [manglik, setManglik] = useState(currentUserProfile.horoscope?.manglik || false);
  const [connectIntro, setConnectIntro] = useState(currentUserProfile.connectIntro || "");
  const [docType, setDocType] = useState(currentUserProfile.vipVerificationDoc?.documentType || "Aadhar");
  const [docNumber, setDocNumber] = useState(currentUserProfile.vipVerificationDoc?.documentNumber || "");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [docOptions, setDocOptions] = useState<any[]>([]);
  const [religionOptions, setReligionOptions] = useState<any[]>([]);
  const [religionSearch, setReligionSearch] = useState("");
  const [religionDropdownOpen, setReligionDropdownOpen] = useState(false);

  useEffect(() => {
    if (authToken) {
      apiService.getMasterOptions('documentType', authToken)
        .then(res => {
          if (res.data && res.data.length > 0) {
            setDocOptions(res.data);
            if (!currentUserProfile.vipVerificationDoc?.documentType) {
              setDocType(res.data[0].value);
            }
          }
        })
        .catch(err => console.error("Failed to load document options:", err));
        
      apiService.getMasterOptions('religion', authToken)
        .then(res => {
          if (res.data && res.data.length > 0) {
            setReligionOptions(res.data);
            if (!religion && res.data.length > 0) {
              setReligion(res.data[0]._id);
            }
          }
        })
        .catch(err => console.error("Failed to load religion options:", err));
    }
  }, [authToken, currentUserProfile.vipVerificationDoc?.documentType]);

  const handleSave = async () => {
    if (!authToken) {
      Alert.alert(
        "Session Expired",
        "You are currently logged out. Please sign in to save your profile.",
        [{ text: "Go to Login", onPress: () => setScreen('login') }]
      );
      return;
    }

    console.log("handleSave triggered");
    console.log("Current authToken:", authToken);

    // Validation
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!height.trim()) newErrors.height = "Height is required";
    if (!profession.trim()) newErrors.profession = "Profession is required";
    if (!company.trim()) newErrors.company = "Company is required";
    if (!docNumber.trim()) newErrors.docNumber = `Please enter your ${docType} number`;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setSaving(true);
    try {
      // 1. Sync to backend API if token is present
      console.log("Auth token present, making API call to completeProfile...");
      await apiService.completeProfile(
        {
          fullName: `${firstName} ${lastName}`.trim(),
          gender,
          personalDetails: { height, religion, communityCaste: community, motherTongue },
          professionalDetails: { currentJob: profession, company, education },
          familyDetails: { fatherOccupation: fatherOcc, motherOccupation: motherOcc, familyBackground: background, familyEthos: familyValues, ancestralOrigins },
          horoscopeDetails: { zodiacSign: zodiac, moonSignRashi: rashi, nakshatra, isManglik: manglik },
          bioIntro: connectIntro,
          vipVerificationDoc: { documentType: docType, documentNumber: docNumber, status: 'pending' },
        },
        authToken
      );
      console.log("API call completeProfile successful");

      // 2. Update local state
      updateCurrentUserProfile({
        name: `${firstName} ${lastName}`.trim(),
        height,
        connectIntro,
        religion,
        community,
        motherTongue,
        profession,
        company,
        education,
        familyDetails: {
          father: fatherOcc,
          mother: motherOcc,
          background: background,
          familyValues: familyValues,
          location: ancestralOrigins
        },
        horoscope: {
          zodiac,
          rashi,
          nakshatra,
          manglik,
          gunaScore: currentUserProfile.horoscope?.gunaScore || "33 / 36"
        },
        vipVerificationDoc: { documentType: docType, documentNumber: docNumber, status: 'pending' }
      });

      if (docNumber) {
        setProfileVerified(true);
      }

      Alert.alert(
        "Profile Completed",
        "Your luxury matrimony profile credentials have been saved to your MongoDB database and local app.",
        [{ text: "Great", onPress: () => setScreen('profile') }]
      );
    } catch (err: any) {
      Alert.alert("Error Saving Profile", err.message || "Something went wrong while saving profile to server");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('profile')} style={styles.backBtn}>
            <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollFeed} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Section 1: Personal & Physical Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal & Physical Details</Text>
          <GlassCard style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[styles.input, errors.firstName ? styles.inputError : null]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="e.g. Devan"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[styles.input, errors.lastName ? styles.inputError : null]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="e.g. Kapoor"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>GENDER (REQUIRED)</Text>
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: RADIUS.md,
                    backgroundColor: gender === 'male' ? COLORS.accentGold : 'rgba(255, 255, 255, 0.05)',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: gender === 'male' ? COLORS.accentGold : 'rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '700', color: gender === 'male' ? COLORS.primary : COLORS.white }}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setGender('female')}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: RADIUS.md,
                    backgroundColor: gender === 'female' ? COLORS.accentGold : 'rgba(255, 255, 255, 0.05)',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: gender === 'female' ? COLORS.accentGold : 'rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '700', color: gender === 'female' ? COLORS.primary : COLORS.white }}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height</Text>
              <TextInput
                style={[styles.input, errors.height ? styles.inputError : null]}
                value={height}
                onChangeText={setHeight}
                placeholder="e.g. 6ft 1in"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Religion</Text>
              <TouchableOpacity
                style={[styles.input, { justifyContent: 'center' }]}
                onPress={() => setReligionDropdownOpen(true)}
              >
                <Text style={{ color: religion ? COLORS.white : 'rgba(255, 255, 255, 0.3)' }}>
                  {religion ? religionOptions.find(opt => opt._id === religion)?.label : "Select Religion"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Community / Caste</Text>
              <TextInput
                style={styles.input}
                value={community}
                onChangeText={setCommunity}
                placeholder="e.g. Punjabi Khatri"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mother Tongue</Text>
              <TextInput
                style={styles.input}
                value={motherTongue}
                onChangeText={setMotherTongue}
                placeholder="e.g. English / Hindi"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>
          </GlassCard>
        </View>

        {/* Section 2: Job & Professional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job & Professional Details</Text>
          <GlassCard style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Current Job / Profession</Text>
              <TextInput
                style={[styles.input, errors.profession ? styles.inputError : null]}
                value={profession}
                onChangeText={setProfession}
                placeholder="e.g. Venture Capitalist"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              {errors.profession && <Text style={styles.errorText}>{errors.profession}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company / Organisation</Text>
              <TextInput
                style={[styles.input, errors.company ? styles.inputError : null]}
                value={company}
                onChangeText={setCompany}
                placeholder="e.g. Apex Horizon Capital"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              {errors.company && <Text style={styles.errorText}>{errors.company}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Highest Education Credentials</Text>
              <TextInput
                style={styles.input}
                value={education}
                onChangeText={setEducation}
                placeholder="e.g. MBA, Harvard Business School"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>
          </GlassCard>
        </View>

        {/* Section 3: Family Heritage & Background */}
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
              <Text style={styles.label}>Family Background</Text>
              <TextInput
                style={styles.input}
                value={background}
                onChangeText={setBackground}
                placeholder="e.g. Business Royalty & Developers"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Family Ethos & Values</Text>
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

        {/* Section 4: Astro & Horoscope Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horoscope & Astro Kundali</Text>
          <GlassCard style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Zodiac Sign</Text>
              <TextInput
                style={styles.input}
                value={zodiac}
                onChangeText={setZodiac}
                placeholder="e.g. Leo"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Moon Sign / Rashi</Text>
              <TextInput
                style={styles.input}
                value={rashi}
                onChangeText={setRashi}
                placeholder="e.g. Simha"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nakshatra</Text>
              <TextInput
                style={styles.input}
                value={nakshatra}
                onChangeText={setNakshatra}
                placeholder="e.g. Magha"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
            </View>

            <View style={[styles.inputGroup, styles.switchRow]}>
              <Text style={[styles.label, { marginBottom: 0 }]}>Is Manglik?</Text>
              <Switch
                value={manglik}
                onValueChange={setManglik}
                trackColor={{ false: '#767577', true: COLORS.accentGold }}
                thumbColor={manglik ? COLORS.white : '#f4f3f4'}
              />
            </View>
          </GlassCard>
        </View>

        {/* Section Connection Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection Introduction Statement</Text>
          <GlassCard style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Personalized Intro Message</Text>
              <TextInput
                style={[styles.input, { height: 120, textAlignVertical: 'top', paddingTop: 10 }]}
                value={connectIntro}
                onChangeText={setConnectIntro}
                placeholder="Write who you are, your job, what you are looking for, ambitions..."
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                multiline
                numberOfLines={5}
              />
              <Text style={{ fontSize: 9, color: COLORS.mutedGray, marginTop: 6, lineHeight: 13 }}>
                This statement will pre-fill the personalized popup invitation when you initiate a match connection interest.
              </Text>
            </View>
          </GlassCard>
        </View>

        {/* Section 5: Security Verification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Concierge VIP Security Verification</Text>
          <GlassCard style={styles.formCard}>
            <Text style={styles.uploadInfo}>
              Please select your document type and enter its number to activate your gold checkmark badge.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>DOCUMENT TYPE</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
                {docOptions.length > 0 ? docOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setDocType(opt.value)}
                    style={{
                      flex: 1,
                      minWidth: '45%',
                      paddingVertical: 10,
                      borderRadius: RADIUS.md,
                      backgroundColor: docType === opt.value ? COLORS.accentGold : 'rgba(255, 255, 255, 0.05)',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: docType === opt.value ? COLORS.accentGold : 'rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '700', color: docType === opt.value ? COLORS.primary : COLORS.white }}>{opt.label}</Text>
                  </TouchableOpacity>
                )) : (
                  <ActivityIndicator color={COLORS.accentGold} />
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{docType.toUpperCase()} NUMBER</Text>
              <TextInput
                style={[styles.input, errors.docNumber ? styles.inputError : null]}
                value={docNumber}
                onChangeText={setDocNumber}
                placeholder={`Enter your ${docType} number`}
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              {errors.docNumber && <Text style={styles.errorText}>{errors.docNumber}</Text>}
            </View>
          </GlassCard>
        </View>

        {/* Save CTA */}
        <TouchableOpacity 
          activeOpacity={0.88} 
          onPress={handleSave} 
          style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          disabled={saving}
        >
          <Text style={styles.saveBtnText}>
            {saving ? "Saving..." : "Save Profile Credentials"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Religion Searchable Dropdown Modal */}
      {religionDropdownOpen && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg }]}>
          <GlassCard style={{ width: '100%', maxHeight: '80%', padding: SPACING.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md }}>
              <Text style={{ ...TYPOGRAPHY.titleM, color: COLORS.accentGold, fontSize: 16 }}>Select Religion</Text>
              <TouchableOpacity onPress={() => setReligionDropdownOpen(false)}>
                <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, { marginBottom: SPACING.md, backgroundColor: 'rgba(255,255,255,0.08)' }]}
              placeholder="Search religion..."
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              value={religionSearch}
              onChangeText={setReligionSearch}
              autoFocus
            />
            <ScrollView style={{ flexShrink: 1 }} showsVerticalScrollIndicator={false}>
              {religionOptions.filter(opt => opt.label.toLowerCase().includes(religionSearch.toLowerCase())).map(opt => (
                <TouchableOpacity
                  key={opt._id}
                  style={{
                    paddingVertical: SPACING.md,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(255,255,255,0.1)'
                  }}
                  onPress={() => {
                    setReligion(opt._id);
                    setReligionDropdownOpen(false);
                    setReligionSearch('');
                  }}
                >
                  <Text style={{ color: religion === opt._id ? COLORS.accentGold : COLORS.white, fontSize: 14 }}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
              {religionOptions.filter(opt => opt.label.toLowerCase().includes(religionSearch.toLowerCase())).length === 0 && (
                <Text style={{ color: COLORS.mutedGray, textAlign: 'center', marginTop: SPACING.md }}>No religions found</Text>
              )}
            </ScrollView>
          </GlassCard>
        </View>
      )}
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
    paddingBottom: 40,
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
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
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 10,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: '600',
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
