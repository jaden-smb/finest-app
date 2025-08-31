import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const GoalsScreen = () => {
  const goals = [
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Save for 6 months of expenses',
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: '2025-12-31',
      category: 'savings',
      icon: 'shield-checkmark',
      color: COLORS.success,
    },
    {
      id: '2',
      title: 'Vacation Trip',
      description: 'Trip to Europe next summer',
      targetAmount: 3000,
      currentAmount: 1200,
      targetDate: '2025-06-01',
      category: 'travel',
      icon: 'airplane',
      color: COLORS.info,
    },
    {
      id: '3',
      title: 'New Laptop',
      description: 'MacBook Pro for work',
      targetAmount: 2500,
      currentAmount: 2500,
      targetDate: '2025-03-15',
      category: 'electronics',
      icon: 'laptop',
      color: COLORS.primary,
    },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Goals</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Progress Overview */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.overviewCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.overviewTitle}>Goals Progress</Text>
          <Text style={styles.overviewStats}>
            {goals.filter(g => getProgressPercentage(g.currentAmount, g.targetAmount) === 100).length} of {goals.length} completed
          </Text>
          <View style={styles.achievementContainer}>
            <Ionicons name="trophy" size={24} color={COLORS.textPrimary} />
            <Text style={styles.achievementText}>Keep going! You're doing great!</Text>
          </View>
        </LinearGradient>
      </Animatable.View>

      {/* Goals List */}
      <Animatable.View animation="fadeInUp" duration={800} delay={400}>
        <Text style={styles.sectionTitle}>Your Goals</Text>
        {goals.map((goal, index) => {
          const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const isCompleted = progress === 100;
          
          return (
            <Animatable.View
              key={goal.id}
              animation="fadeInUp"
              duration={600}
              delay={index * 100 + 600}
              style={[styles.goalCard, isCompleted && styles.goalCardCompleted]}
            >
              <View style={styles.goalHeader}>
                <View style={[styles.goalIcon, { backgroundColor: `${goal.color}20` }]}>
                  <Ionicons name={goal.icon as any} size={24} color={goal.color} />
                </View>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
                  </View>
                )}
              </View>

              <View style={styles.goalProgress}>
                <View style={styles.goalAmountContainer}>
                  <Text style={styles.goalCurrentAmount}>
                    ${goal.currentAmount.toLocaleString()}
                  </Text>
                  <Text style={styles.goalTargetAmount}>
                    / ${goal.targetAmount.toLocaleString()}
                  </Text>
                </View>
                <Text style={[styles.goalPercentage, { color: goal.color }]}>
                  {progress.toFixed(0)}%
                </Text>
              </View>

              <View style={styles.goalProgressBarContainer}>
                <View style={[styles.goalProgressBar, { backgroundColor: `${goal.color}20` }]}>
                  <View
                    style={[
                      styles.goalProgressFill,
                      {
                        width: `${progress}%`,
                        backgroundColor: goal.color,
                      }
                    ]}
                  />
                </View>
              </View>

              <View style={styles.goalFooter}>
                <View style={styles.goalTimeContainer}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.goalTimeText}>
                    {isCompleted 
                      ? 'Completed!' 
                      : daysRemaining > 0 
                        ? `${daysRemaining} days left` 
                        : 'Overdue'
                    }
                  </Text>
                </View>
                <TouchableOpacity style={styles.goalActionButton}>
                  <Text style={[styles.goalActionText, { color: goal.color }]}>
                    {isCompleted ? 'View' : 'Add Money'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          );
        })}
      </Animatable.View>

      {/* Achievements Section */}
      <Animatable.View animation="fadeInUp" duration={800} delay={1000}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementItem}>
            <View style={styles.achievementIcon}>
              <Ionicons name="medal" size={20} color={COLORS.warning} />
            </View>
            <View style={styles.achievementDetails}>
              <Text style={styles.achievementTitle}>First Goal Completed!</Text>
              <Text style={styles.achievementSubtitle}>You completed your first savings goal</Text>
            </View>
            <Text style={styles.achievementXP}>+100 XP</Text>
          </View>
          
          <View style={styles.achievementItem}>
            <View style={styles.achievementIcon}>
              <Ionicons name="flash" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.achievementDetails}>
              <Text style={styles.achievementTitle}>Streak Master</Text>
              <Text style={styles.achievementSubtitle}>7 days of consistent saving</Text>
            </View>
            <Text style={styles.achievementXP}>+50 XP</Text>
          </View>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewCard: {
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  overviewTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  overviewStats: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    opacity: 0.9,
    marginBottom: SPACING.md,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginLeft: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  goalCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  goalCardCompleted: {
    borderColor: COLORS.success,
    backgroundColor: `${COLORS.success}10`,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  goalDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  completedBadge: {
    marginLeft: SPACING.sm,
  },
  goalProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  goalAmountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  goalCurrentAmount: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  goalTargetAmount: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  goalPercentage: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  goalProgressBarContainer: {
    marginBottom: SPACING.md,
  },
  goalProgressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalTimeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  goalActionButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  goalActionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  achievementsContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  achievementIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  achievementSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  achievementXP: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default GoalsScreen;
