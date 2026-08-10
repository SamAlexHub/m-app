import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import { Crown, X, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const DatePlannerModal: React.FC = () => {
  const { datePlannerOpen, setDatePlannerOpen } = useAppStore();
  const [selectedVenue, setSelectedVenue] = useState('Le Meurice Alain Ducasse, Paris');
  const [submitted, setSubmitted] = useState(false);

  if (!datePlannerOpen) return null;

  const venues = [
    { name: 'Le Meurice Alain Ducasse', city: 'Paris', style: '3-Star Michelin Luxury', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80' },
    { name: 'The Ritz Mayfair Terrace', city: 'London', style: 'Royal High Tea', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Villa d’Este Lake Pavilion', city: 'Lake Como', style: 'Private Waterfront Dinner', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80' },
  ];

  const handlePropose = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDatePlannerOpen(false);
    }, 2000);
  };

  return (
    <Modal visible={datePlannerOpen} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Crown size={18} color={COLORS.accentGold} strokeWidth={2} />
              <Text style={styles.titleText}>VIP Luxury Date Planner</Text>
            </View>
            <TouchableOpacity onPress={() => setDatePlannerOpen(false)} style={styles.closeBtn}>
              <X size={16} color={COLORS.white} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {submitted ? (
            <View style={styles.submittedContainer}>
              <CheckCircle2 size={56} color={COLORS.accentGold} strokeWidth={1.8} />
              <Text style={styles.submittedTitle}>Invitation Dispatched</Text>
              <Text style={styles.submittedSubtext}>
                Your date invitation to {selectedVenue} has been dispatched via Evervow Concierge.
              </Text>
            </View>
          ) : (
            <ScrollView style={styles.scrollContent}>
              <Text style={styles.subtext}>
                Propose an exclusive experience. Our VIP Concierge handles reservations and security verification seamlessly.
              </Text>

              <Text style={styles.sectionHeader}>SELECT MICHELIN VENUE</Text>
              {venues.map((v) => (
                <TouchableOpacity
                  key={v.name}
                  activeOpacity={0.85}
                  onPress={() => setSelectedVenue(v.name)}
                  style={[
                    styles.venueCard,
                    selectedVenue === v.name && styles.venueCardSelected,
                  ]}
                >
                  <Image source={{ uri: v.image }} style={styles.venueImage} />
                  <View style={styles.venueInfo}>
                    <Text style={styles.venueName}>{v.name}</Text>
                    <Text style={styles.venueSub}>{v.city} • {v.style}</Text>
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity activeOpacity={0.88} onPress={handlePropose} style={styles.submitButton}>
                <Text style={styles.submitText}>Send VIP Invitation</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
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
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: RADIUS.xl, // 32px
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '80%',
    borderWidth: 1,
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
  },
  subtext: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: SPACING.sm,
  },
  venueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: SPACING.sm,
  },
  venueCardSelected: {
    borderColor: COLORS.accentGold,
    backgroundColor: 'rgba(7, 47, 43, 0.9)',
    ...SHADOWS.goldGlow,
  },
  venueImage: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  venueSub: {
    fontSize: 11,
    color: COLORS.mutedGray,
    marginTop: 2,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentGold,
    marginTop: SPACING.lg,
    ...SHADOWS.goldGlow,
  },
  submitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  submittedContainer: {
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
  },
  submittedTitle: {
    ...TYPOGRAPHY.titleL,
    marginTop: SPACING.md,
  },
  submittedSubtext: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xs,
    maxWidth: 260,
  },
});
