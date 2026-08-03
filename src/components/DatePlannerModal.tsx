import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import { Sparkles, X, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

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
              <Sparkles size={18} color="#D6A24A" />
              <Text style={styles.titleText}>VIP Luxury Date Planner</Text>
            </View>
            <TouchableOpacity onPress={() => setDatePlannerOpen(false)} style={styles.closeBtn}>
              <X size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {submitted ? (
            <View style={styles.submittedContainer}>
              <CheckCircle2 size={56} color="#D6A24A" />
              <Text style={styles.submittedTitle}>Invitation Sent</Text>
              <Text style={styles.submittedSubtext}>
                Your date invitation to {selectedVenue} has been dispatched via Éternité Concierge.
              </Text>
            </View>
          ) : (
            <ScrollView style={styles.scrollContent}>
              <Text style={styles.subtext}>
                Propose an exclusive date. Our VIP Concierge handles reservations and security seamlessly.
              </Text>

              <Text style={styles.sectionHeader}>SELECT MICHELIN VENUE</Text>
              {venues.map((v) => (
                <TouchableOpacity
                  key={v.name}
                  activeOpacity={0.8}
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

              <TouchableOpacity activeOpacity={0.85} onPress={handlePropose} style={styles.submitButton}>
                <Sparkles size={16} color="#062E2A" />
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
    backgroundColor: '#0E453F',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 12,
  },
  subtext: {
    fontSize: 11,
    color: '#D1D5DB',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
    marginBottom: 8,
  },
  venueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
  },
  venueCardSelected: {
    borderColor: '#D6A24A',
    backgroundColor: 'rgba(6, 46, 42, 0.9)',
  },
  venueImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  venueSub: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D6A24A',
    marginTop: 16,
  },
  submitText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  submittedContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  submittedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  submittedSubtext: {
    fontSize: 11,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 240,
  },
});
