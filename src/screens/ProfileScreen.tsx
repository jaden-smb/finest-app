import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const ProfileScreen = () => {
  const userStats = {
    level: 5,
    xp: 1250,
    nextLevelXp: 1500,
    streak: 12,
    goalsCompleted: 3,
    totalSavings: 15420,
  };

  const achievements = [
    { id: '1', title: 'First Goal', icon: 'trophy', color: COLORS.warning },
    { id: '2', title: 'Streak Master', icon: 'flash', color: COLORS.primary },
    { id: '3', title: 'Budget Pro', icon: 'pie-chart', color: COLORS.success },
  ];

  const menuItems = [
    { id: '1', title: 'Edit Profile', icon: 'person-outline', action: 'edit-profile' },
    { id: '2', title: 'Notifications', icon: 'notifications-outline', action: 'notifications' },
    { id: '3', title: 'Privacy & Security', icon: 'shield-outline', action: 'privacy' },
    { id: '4', title: 'Export Data', icon: 'download-outline', action: 'export' },
    { id: '5', title: 'Help & Support', icon: 'help-circle-outline', action: 'help' },
    { id: '6', title: 'About', icon: 'information-circle-outline', action: 'about' },
  ];

  const getProgressPercentage = () => {
    return ((userStats.xp - (userStats.level - 1) * 300) / 300) * 100;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Animatable.View animation="fadeInDown" duration={800}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.profileHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.textPrimary} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          
          {/* Level Progress */}
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {userStats.level}</Text>
            <View style={styles.xpProgressBar}>
              <View
                style={[
                  styles.xpProgressFill,
                  { width: `${getProgressPercentage()}%` }
                ]}
              />
            </View>
            <Text style={styles.xpText}>
              {userStats.xp} / {userStats.nextLevelXp} XP
            </Text>
          </View>
        </LinearGradient>
      </Animatable.View>

      {/* Stats Cards */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{userStats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>{userStats.goalsCompleted}</Text>
            <Text style={styles.statLabel}>Goals</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="wallet" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>${(userStats.totalSavings / 1000).toFixed(1)}K</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>
      </Animatable.View>

      {/* Achievements */}
      <Animatable.View animation="fadeInUp" duration={800} delay={400}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsContainer}
        >
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                <Ionicons name={achievement.icon as any} size={20} color={achievement.color} />
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
            </View>
          ))}
        </ScrollView>
      </Animatable.View>

      {/* Menu Items */}
      <Animatable.View animation="fadeInUp" duration={800} delay={600}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Animatable.View
              key={item.id}
              animation="fadeInUp"
              duration={600}
              delay={index * 50 + 800}
            >
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon as any} size={20} color={COLORS.textSecondary} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </Animatable.View>

      {/* Logout Button */}
      <Animatable.View animation="fadeInUp" duration={800} delay={1000} style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: SPACING.xxl + SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.medium,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.textPrimary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.textPrimary,
  },
  userName: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    opacity: 0.8,
    marginBottom: SPACING.lg,
  },
  levelContainer: {
    alignItems: 'center',
    width: '100%',
  },
  levelText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  xpProgressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  xpProgressFill: {
    height: '100%',
    backgroundColor: COLORS.textPrimary,
    borderRadius: 4,
  },
  xpText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: -SPACING.xl,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.small,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  achievementsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  achievementCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minWidth: 100,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  achievementTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});

export default ProfileScreen;
