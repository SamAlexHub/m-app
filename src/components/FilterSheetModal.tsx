import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { SlidersHorizontal, X } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const FilterSheetModal: React.FC = () => {
  const {
    filterModalOpen,
    setFilterModalOpen,
    selectedReligion,
    setSelectedReligion,
    selectedCountry,
    setSelectedCountry,
  } = useAppStore();

  if (!filterModalOpen) return null;

  const religions = ['All Religions', 'Hindu', 'Christian', 'Muslim', 'Sikh', 'Jain', 'Parsi'];
  const regions = ['Global Elite', 'United Kingdom', 'United States', 'Switzerland', 'France', 'India', 'UAE / Dubai'];

  return (
    <Modal visible={filterModalOpen} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <SlidersHorizontal size={18} color={COLORS.accentGold} strokeWidth={2} />
              <Text style={styles.titleText}>Advanced Match Filters</Text>
            </View>
            <TouchableOpacity onPress={() => setFilterModalOpen(false)} style={styles.closeBtn}>
              <X size={16} color={COLORS.white} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHeader}>FAITH & CULTURE</Text>
            <View style={styles.chipGrid}>
              {religions.map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setSelectedReligion(r)}
                  style={[styles.chip, selectedReligion === r && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, selectedReligion === r && styles.chipTextSelected]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionHeader, { marginTop: SPACING.md }]}>LOCATION & DIASPORA</Text>
            <View style={styles.chipGrid}>
              {regions.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setSelectedCountry(c)}
                  style={[styles.chip, selectedCountry === c && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, selectedCountry === c && styles.chipTextSelected]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.88} onPress={() => setFilterModalOpen(false)} style={styles.applyBtn}>
              <Text style={styles.applyText}>Apply Filters & View Matches</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    maxHeight: '80%',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.darkGlassBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  titleText: {
    ...TYPOGRAPHY.titleM,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    marginTop: SPACING.md,
    maxHeight: 280,
  },
  scrollContentContainer: {
    paddingBottom: SPACING.md,
  },
  sectionHeader: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    marginBottom: SPACING.sm,
    color: COLORS.accentGold,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  chipSelected: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  chipText: {
    fontSize: 11,
    color: COLORS.lightGray,
  },
  chipTextSelected: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  footer: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    ...SHADOWS.goldGlow,
  },
  applyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
