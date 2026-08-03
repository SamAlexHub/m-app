import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, Heart, Sparkles, MapPin } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { SUCCESS_STORIES } from '../data/successStories';
import { GlassCard } from '../components/GlassCard';

export const SuccessStoriesScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
          <ArrowLeft size={18} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Heart size={12} color="#D6A24A" fill="#D6A24A" />
          <Text style={styles.badgeText}>ROYAL NUPTIALS</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <Text style={styles.title}>Couples United by Éternité</Text>
      <Text style={styles.sub}>Real Love Stories • Real European Weddings</Text>

      <View style={styles.list}>
        {SUCCESS_STORIES.map((story) => (
          <GlassCard key={story.id} glow style={styles.storyCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' }} style={styles.coverImage} />

            <View style={styles.matchBadge}>
              <Sparkles size={10} color="#062E2A" />
              <Text style={styles.matchBadgeText}>{story.matchScore}% Match</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.coupleNames}>{story.coupleNames}</Text>
              <Text style={styles.weddingDate}>{story.weddingDate}</Text>
            </View>

            <View style={styles.locRow}>
              <MapPin size={12} color="#D6A24A" />
              <Text style={styles.locText}>{story.location}</Text>
            </View>

            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>"{story.quote}"</Text>
            </View>
          </GlassCard>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062E2A',
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justify: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#0E453F',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 74, 0.4)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D6A24A',
    letterSpacing: 1,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  sub: {
    fontSize: 11,
    color: '#D6A24A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 16,
  },
  list: {
    gap: 16,
  },
  storyCard: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 12,
  },
  matchBadge: {
    position: 'absolute',
    top: 28,
    left: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#D6A24A',
  },
  matchBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#062E2A',
  },
  cardHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'baseline',
  },
  coupleNames: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weddingDate: {
    fontSize: 11,
    color: '#D6A24A',
    fontWeight: 'bold',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locText: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  quoteBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  quoteText: {
    fontSize: 11,
    color: '#D1D5DB',
    fontStyle: 'italic',
  },
});
