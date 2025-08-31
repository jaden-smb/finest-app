import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // Mock data - in real app, this would come from state management
  const totalBalance = 12450.75;
  const monthlyIncome = 5000;
  const monthlyExpenses = 3200;
  const savingsRate = 36;

  const quickActions = [
    { icon: 'add-circle', label: 'Add Income', color: COLORS.income, type: 'income' },
    { icon: 'remove-circle', label: 'Add Expense', color: COLORS.expense, type: 'expense' },
    { icon: 'card', label: 'Add Debt', color: COLORS.debt, type: 'debt' },
    { icon: 'analytics', label: 'Insights', color: COLORS.primary, type: 'insights' },
  ];

  const recentTransactions = [
    { id: '1', description: 'Salary', amount: 5000, type: 'income', date: 'Today' },
    { id: '2', description: 'Groceries', amount: -120, type: 'expense', date: 'Yesterday' },
    { id: '3', description: 'Coffee', amount: -5.5, type: 'expense', date: 'Yesterday' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.username}>Welcome to Fine$t</Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Ionicons name="eye" size={20} color={COLORS.textPrimary} />
          </View>
          <Text style={styles.balanceAmount}>
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Income</Text>
              <Text style={styles.balanceItemAmount}>+${monthlyIncome.toLocaleString()}</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Expenses</Text>
              <Text style={styles.balanceItemAmount}>-${monthlyExpenses.toLocaleString()}</Text>
            </View>
          </View>
        </LinearGradient>
      </Animatable.View>

      {/* Quick Actions */}
      <Animatable.View animation="fadeInUp" duration={800} delay={400}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={action.type}
              style={[styles.quickActionButton, { backgroundColor: `${action.color}20` }]}
            >
              <Ionicons name={action.icon as any} size={24} color={action.color} />
              <Text style={[styles.quickActionLabel, { color: action.color }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animatable.View>

      {/* Statistics */}
      <Animatable.View animation="fadeInUp" duration={800} delay={600}>
        <Text style={styles.sectionTitle}>This Month</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="trending-up" size={20} color={COLORS.success} />
            </View>
            <Text style={styles.statValue}>{savingsRate}%</Text>
            <Text style={styles.statLabel}>Savings Rate</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="flash" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="trophy" size={20} color={COLORS.warning} />
            </View>
            <Text style={styles.statValue}>Level 5</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      </Animatable.View>

      {/* Recent Transactions */}
      <Animatable.View animation="fadeInUp" duration={800} delay={800}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsContainer}>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'income' ? `${COLORS.income}20` : `${COLORS.expense}20` }
                ]}>
                  <Ionicons
                    name={transaction.type === 'income' ? 'arrow-down' : 'arrow-up'}
                    size={16}
                    color={transaction.type === 'income' ? COLORS.income : COLORS.expense}
                  />
                </View>
                <View>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'income' ? COLORS.income : COLORS.expense }
              ]}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </Text>
            </View>
          ))}
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
  greeting: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  username: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  balanceLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: FONT_SIZES.display,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    flex: 1,
  },
  balanceItemLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  balanceItemAmount: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  seeAllText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '500',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  quickActionButton: {
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginRight: SPACING.md,
  },
  quickActionLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  transactionsContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  transactionItem: {
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
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  transactionDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  transactionAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
