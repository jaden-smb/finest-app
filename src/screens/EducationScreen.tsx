import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const EducationScreen = () => {
  const courses = [
    {
      id: '1',
      title: 'Budgeting Basics',
      description: 'Learn the fundamentals of creating and maintaining a budget',
      duration: 15,
      xpReward: 100,
      difficulty: 'beginner',
      isCompleted: true,
      progress: 100,
      category: 'Budgeting',
    },
    {
      id: '2',
      title: 'Investment 101',
      description: 'Introduction to stocks, bonds, and investment strategies',
      duration: 30,
      xpReward: 200,
      difficulty: 'intermediate',
      isCompleted: false,
      progress: 60,
      category: 'Investing',
    },
    {
      id: '3',
      title: 'Debt Management',
      description: 'Strategies for paying off debt and improving credit score',
      duration: 20,
      xpReward: 150,
      difficulty: 'beginner',
      isCompleted: false,
      progress: 0,
      category: 'Debt',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return COLORS.success;
      case 'intermediate': return COLORS.warning;
      case 'advanced': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <View style={styles.xpContainer}>
          <Ionicons name="star" size={20} color={COLORS.primary} />
          <Text style={styles.xpText}>1,250 XP</Text>
        </View>
      </View>

      {/* Progress Overview */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Learning Progress</Text>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>1</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>1</Text>
              <Text style={styles.progressLabel}>In Progress</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>5</Text>
              <Text style={styles.progressLabel}>Level</Text>
            </View>
          </View>
        </View>
      </Animatable.View>

      {/* Courses List */}
      <Animatable.View animation="fadeInUp" duration={800} delay={400}>
        <Text style={styles.sectionTitle}>Courses</Text>
        {courses.map((course, index) => (
          <Animatable.View
            key={course.id}
            animation="fadeInUp"
            duration={600}
            delay={index * 100 + 600}
            style={[styles.courseCard, course.isCompleted && styles.courseCardCompleted]}
          >
            <View style={styles.courseHeader}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
              </View>
              {course.isCompleted && (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
                </View>
              )}
            </View>

            <View style={styles.courseDetails}>
              <View style={styles.courseMetrics}>
                <View style={styles.courseMetric}>
                  <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.courseMetricText}>{course.duration} min</Text>
                </View>
                <View style={styles.courseMetric}>
                  <Ionicons name="star-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.courseMetricText}>{course.xpReward} XP</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(course.difficulty) }]}>
                  <Text style={styles.difficultyText}>{course.difficulty}</Text>
                </View>
              </View>
            </View>

            {!course.isCompleted && course.progress > 0 && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${course.progress}%` }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{course.progress}% complete</Text>
              </View>
            )}

            <TouchableOpacity style={styles.courseActionButton}>
              <Text style={styles.courseActionText}>
                {course.isCompleted ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </Animatable.View>

      {/* Daily Challenge */}
      <Animatable.View animation="fadeInUp" duration={800} delay={1000}>
        <Text style={styles.sectionTitle}>Daily Challenge</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <View style={styles.challengeIcon}>
              <Ionicons name="flash" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Track 3 Expenses</Text>
              <Text style={styles.challengeDescription}>Record at least 3 transactions today</Text>
            </View>
            <Text style={styles.challengeReward}>+50 XP</Text>
          </View>
          <View style={styles.challengeProgress}>
            <View style={styles.challengeProgressBar}>
              <View style={[styles.challengeProgressFill, { width: '66%' }]} />
            </View>
            <Text style={styles.challengeProgressText}>2/3 completed</Text>
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
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  xpText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  progressCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  progressTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  courseCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  courseCardCompleted: {
    borderColor: COLORS.success,
    backgroundColor: `${COLORS.success}10`,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  courseDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  completedBadge: {
    marginLeft: SPACING.sm,
  },
  courseDetails: {
    marginBottom: SPACING.md,
  },
  courseMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  courseMetricText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  difficultyText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  courseActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  courseActionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  challengeCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  challengeDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  challengeReward: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  challengeProgressText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    minWidth: 80,
  },
});

export default EducationScreen;
