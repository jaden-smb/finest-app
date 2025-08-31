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

const InsightsScreen = () => {
  const insights = [
    {
      id: '1',
      type: 'spending-pattern',
      title: 'Coffee Spending Alert',
      description: 'You\'ve spent $127 on coffee this month, 40% more than last month.',
      priority: 'medium',
      icon: 'cafe',
      color: COLORS.warning,
    },
    {
      id: '2',
      type: 'saving-opportunity',
      title: 'Subscription Optimization',
      description: 'You have 3 unused subscriptions costing $45/month. Consider canceling them.',
      priority: 'high',
      icon: 'card',
      color: COLORS.error,
    },
    {
      id: '3',
      type: 'investment-suggestion',
      title: 'Investment Opportunity',
      description: 'Based on your savings pattern, consider investing $500 in a diversified portfolio.',
      priority: 'low',
      icon: 'trending-up',
      color: COLORS.success,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Financial Insights</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Insights List */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
        {insights.map((insight, index) => (
          <Animatable.View
            key={insight.id}
            animation="fadeInUp"
            duration={600}
            delay={index * 100 + 400}
            style={styles.insightCard}
          >
            <View style={styles.insightHeader}>
              <View style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}>
                <Ionicons name={insight.icon as any} size={20} color={insight.color} />
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(insight.priority) }]}>
                <Text style={styles.priorityText}>{insight.priority.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={styles.insightDescription}>{insight.description}</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={[styles.actionButtonText, { color: insight.color }]}>Take Action</Text>
              <Ionicons name="arrow-forward" size={16} color={insight.color} />
            </TouchableOpacity>
          </Animatable.View>
        ))}
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  insightCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  priorityText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  insightTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  insightDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
});

export default InsightsScreen;
