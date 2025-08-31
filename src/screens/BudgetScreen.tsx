import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const BudgetScreen = () => {
  const budgets = [
    { id: '1', category: 'Food', budgeted: 600, spent: 450, color: COLORS.success },
    { id: '2', category: 'Transportation', budgeted: 200, spent: 180, color: COLORS.warning },
    { id: '3', category: 'Entertainment', budgeted: 300, spent: 320, color: COLORS.error },
    { id: '4', category: 'Shopping', budgeted: 400, spent: 200, color: COLORS.info },
  ];

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  const getBudgetProgress = (spent: number, budgeted: number) => {
    return Math.min((spent / budgeted) * 100, 100);
  };

  const getBudgetStatus = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage <= 75) return 'good';
    if (percentage <= 90) return 'warning';
    return 'danger';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Overview Card */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.overviewCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.overviewTitle}>Monthly Budget</Text>
          <Text style={styles.overviewAmount}>
            ${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(totalSpent / totalBudget) * 100}%` }
                ]}
              />
            </View>
          </View>
          <Text style={styles.overviewSubtext}>
            ${(totalBudget - totalSpent).toLocaleString()} remaining
          </Text>
        </LinearGradient>
      </Animatable.View>

      {/* Budget Categories */}
      <Animatable.View animation="fadeInUp" duration={800} delay={400}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {budgets.map((budget, index) => {
          const progress = getBudgetProgress(budget.spent, budget.budgeted);
          const status = getBudgetStatus(budget.spent, budget.budgeted);
          
          return (
            <Animatable.View
              key={budget.id}
              animation="fadeInUp"
              duration={600}
              delay={index * 100 + 600}
              style={styles.budgetCard}
            >
              <View style={styles.budgetHeader}>
                <View style={styles.budgetInfo}>
                  <Text style={styles.budgetCategory}>{budget.category}</Text>
                  <Text style={styles.budgetAmount}>
                    ${budget.spent.toLocaleString()} / ${budget.budgeted.toLocaleString()}
                  </Text>
                </View>
                <View style={[styles.budgetIcon, { backgroundColor: `${budget.color}20` }]}>
                  <Ionicons name="pie-chart" size={20} color={budget.color} />
                </View>
              </View>
              
              <View style={styles.budgetProgressContainer}>
                <View style={[styles.budgetProgressBar, { backgroundColor: `${budget.color}20` }]}>
                  <View
                    style={[
                      styles.budgetProgressFill,
                      {
                        width: `${progress}%`,
                        backgroundColor: budget.color,
                      }
                    ]}
                  />
                </View>
                <Text style={[styles.budgetPercentage, { color: budget.color }]}>
                  {progress.toFixed(0)}%
                </Text>
              </View>
              
              <View style={styles.budgetFooter}>
                <Text style={styles.budgetRemaining}>
                  ${Math.max(0, budget.budgeted - budget.spent).toLocaleString()} remaining
                </Text>
                {status === 'danger' && (
                  <View style={styles.warningBadge}>
                    <Ionicons name="warning" size={12} color={COLORS.error} />
                    <Text style={styles.warningText}>Over budget</Text>
                  </View>
                )}
              </View>
            </Animatable.View>
          );
        })}
      </Animatable.View>

      {/* Quick Actions */}
      <Animatable.View animation="fadeInUp" duration={800} delay={1000}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="add-circle" size={24} color={COLORS.primary} />
            <Text style={styles.quickActionText}>Add Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="analytics" size={24} color={COLORS.success} />
            <Text style={styles.quickActionText}>View Report</Text>
          </TouchableOpacity>
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
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    opacity: 0.9,
    marginBottom: SPACING.sm,
  },
  overviewAmount: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  progressBarContainer: {
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.textPrimary,
    borderRadius: 4,
  },
  overviewSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  budgetCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  budgetInfo: {
    flex: 1,
  },
  budgetCategory: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  budgetAmount: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  budgetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  budgetProgressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  budgetProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetPercentage: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    minWidth: 35,
    textAlign: 'right',
  },
  budgetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetRemaining: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.error}20`,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  warningText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  quickActionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginTop: SPACING.sm,
  },
});

export default BudgetScreen;
