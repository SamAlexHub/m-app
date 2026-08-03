import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationAsRead, setScreen, setSelectedProfileId } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
          <ArrowLeft size={18} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Bell size={12} color="#D6A24A" />
          <Text style={styles.badgeText}>ACTIVITY CENTER</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <Text style={styles.title}>Notifications & Alerts</Text>
      <Text style={styles.sub}>Your Private Match Updates</Text>

      <View style={styles.list}>
        {notifications.map((n) => (
          <GlassCard
            key={n.id}
            glow={!n.read}
            onClick={() => {
              markNotificationAsRead(n.id);
              setSelectedProfileId('p1');
              setScreen('match-details');
            }}
            style={styles.notifCard}
          >
            <View style={styles.notifRow}>
              {n.avatar ? (
                <Image source={{ uri: n.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.iconBox}>
                  <Sparkles size={16} color="#062E2A" />
                </View>
              )}

              <View style={styles.textCol}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{n.title}</Text>
                  <Text style={styles.timeText}>{n.time}</Text>
                </View>
                <Text style={styles.msgText}>{n.message}</Text>
              </View>

              {!n.read && <View style={styles.dot} />}
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
    gap: 10,
  },
  notifCard: {
    padding: 12,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#D6A24A',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D6A24A',
    alignItems: 'center',
    justify: 'center',
  },
  textCol: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'baseline',
  },
  cardTitle: {
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeText: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  msgText: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D6A24A',
  },
});
