import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme/tokens';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationAsRead, setScreen, setSelectedProfileId } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
          <ArrowLeft size={18} color={COLORS.white} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Bell size={12} color={COLORS.accentGold} strokeWidth={1.8} />
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
                  <Sparkles size={16} color={COLORS.primary} strokeWidth={2} />
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
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
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
    justify: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkGlassBorder,
  },
  badgeText: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 9,
  },
  title: {
    ...TYPOGRAPHY.titleL,
    fontSize: 24,
    textAlign: 'center',
  },
  sub: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  list: {
    gap: SPACING.sm,
  },
  notifCard: {
    padding: SPACING.md,
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
    borderColor: COLORS.accentGold,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.accentGold,
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
    color: COLORS.white,
  },
  timeText: {
    fontSize: 9,
    color: COLORS.mutedGray,
  },
  msgText: {
    ...TYPOGRAPHY.body,
    fontSize: 10,
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentGold,
  },
});
