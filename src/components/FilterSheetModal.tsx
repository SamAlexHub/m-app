import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { SlidersHorizontal, X, Sparkles } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

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
              <SlidersHorizontal size={18} color="#D6A24A" />
              <Text style={styles.titleText}>Advanced Match Filters</Text>
            </View>
            <TouchableOpacity onPress={() => setFilterModalOpen(false)} style={styles.closeBtn}>
              <X size={16} color="#ffffff" />
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

            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>LOCATION & DIASPORA</Text>
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

            <TouchableOpacity activeOpacity={0.85} onPress={() => setFilterModalOpen(false)} style={styles.applyBtn}>
              <Sparkles size={16} color="#062E2A" />
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
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#0E453F',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '75%',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
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
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
    marginBottom: 8,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  chipSelected: {
    backgroundColor: '#D6A24A',
    borderColor: '#D6A24A',
  },
  chipText: {
    fontSize: 11,
    color: '#D1D5DB',
  },
  chipTextSelected: {
    color: '#062E2A',
    fontWeight: 'bold',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D6A24A',
    marginTop: 24,
  },
  applyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#062E2A',
  },
});
