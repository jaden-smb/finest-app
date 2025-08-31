import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING;
  margin?: keyof typeof SPACING;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  padding = 'lg', 
  margin = 'sm',
  elevated = false 
}) => {
  return (
    <View 
      style={[
        styles.card,
        {
          padding: SPACING[padding],
          margin: SPACING[margin],
        },
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  elevated: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default Card;
