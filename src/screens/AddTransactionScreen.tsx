import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const AddTransactionScreen = ({ navigation, route }: any) => {
  const { type: initialType } = route?.params || {};
  
  const [transactionType, setTransactionType] = useState(initialType || 'expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const transactionTypes = [
    { key: 'income', label: 'Income', icon: 'arrow-down-circle', color: COLORS.income },
    { key: 'expense', label: 'Expense', icon: 'arrow-up-circle', color: COLORS.expense },
    { key: 'debt', label: 'Debt', icon: 'card', color: COLORS.debt },
  ];

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other'],
    expense: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other'],
    debt: ['Credit Card', 'Loan', 'Mortgage', 'Student Loan', 'Other'],
  };

  const handleSaveTransaction = () => {
    if (!amount || !description || !category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    // Here you would typically save to your state management/database
    console.log('Saving transaction:', {
      type: transactionType,
      amount: numericAmount,
      description,
      category,
      notes,
      date: new Date(),
    });

    Alert.alert(
      'Success',
      'Transaction added successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Transaction Type Selector */}
      <Animatable.View animation="fadeInDown" duration={600}>
        <Text style={styles.sectionTitle}>Transaction Type</Text>
        <View style={styles.typeSelector}>
          {transactionTypes.map((type) => (
            <TouchableOpacity
              key={type.key}
              style={[
                styles.typeButton,
                transactionType === type.key && styles.typeButtonActive,
                { borderColor: type.color }
              ]}
              onPress={() => setTransactionType(type.key)}
            >
              <Ionicons
                name={type.icon as any}
                size={24}
                color={transactionType === type.key ? type.color : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  { color: transactionType === type.key ? type.color : COLORS.textSecondary }
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animatable.View>

      {/* Amount Input */}
      <Animatable.View animation="fadeInUp" duration={600} delay={200}>
        <Text style={styles.sectionTitle}>Amount</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textMuted}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>
      </Animatable.View>

      {/* Description Input */}
      <Animatable.View animation="fadeInUp" duration={600} delay={400}>
        <Text style={styles.sectionTitle}>Description *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What is this transaction for?"
          placeholderTextColor={COLORS.textSecondary}
          value={description}
          onChangeText={setDescription}
          returnKeyType="next"
        />
      </Animatable.View>

      {/* Category Selector */}
      <Animatable.View animation="fadeInUp" duration={600} delay={600}>
        <Text style={styles.sectionTitle}>Category *</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories[transactionType as keyof typeof categories].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonActive
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextActive
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animatable.View>

      {/* Notes Input */}
      <Animatable.View animation="fadeInUp" duration={600} delay={800}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={[styles.textInput, styles.notesInput]}
          placeholder="Add any additional notes..."
          placeholderTextColor={COLORS.textSecondary}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </Animatable.View>

      {/* Quick Amount Buttons */}
      <Animatable.View animation="fadeInUp" duration={600} delay={1000}>
        <Text style={styles.sectionTitle}>Quick Amounts</Text>
        <View style={styles.quickAmountContainer}>
          {['5', '10', '20', '50', '100'].map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={styles.quickAmountButton}
              onPress={() => setAmount(quickAmount)}
            >
              <Text style={styles.quickAmountText}>${quickAmount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animatable.View>

      {/* Save Button */}
      <Animatable.View animation="fadeInUp" duration={600} delay={1200} style={styles.saveContainer}>
        <TouchableOpacity onPress={handleSaveTransaction}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.saveButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-circle" size={24} color={COLORS.textPrimary} />
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    marginHorizontal: SPACING.xs,
    backgroundColor: COLORS.card,
  },
  typeButtonActive: {
    backgroundColor: `${COLORS.primary}15`,
  },
  typeButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  currencySymbol: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingVertical: SPACING.lg,
  },
  textInput: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  notesInput: {
    height: 80,
  },
  categoriesContainer: {
    paddingBottom: SPACING.md,
  },
  categoryButton: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: SPACING.sm,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  quickAmountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  quickAmountButton: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  quickAmountText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  saveContainer: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
});

export default AddTransactionScreen;
