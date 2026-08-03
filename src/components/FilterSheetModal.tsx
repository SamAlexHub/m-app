import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { SlidersHorizontal, X, Sparkles } from 'lucide-react-native';
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

          <ScrollView style={styles.scrollContent}>
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

            <TouchableOpacity activeOpacity={0.88} onPress={() => setFilterModalOpen(false)} style={styles.applyBtn}>
              <Sparkles size={16} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.applyText}>Apply Filters & View Matches</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justify: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '75%',
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
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
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justify: 'center',
  },
  scrollContent: {
    marginTop: SPACING.md,
  },
  sectionHeader: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: SPACING.sm,
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
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: SPACING.sm,
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    marginTop: SPACING.lg,
    ...SHADOWS.goldGlow,
  },
  applyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
