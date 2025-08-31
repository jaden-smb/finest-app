import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../constants/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showIcon = true }) => {
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: FONT_SIZES.lg,
          iconSize: 16,
        };
      case 'large':
        return {
          fontSize: FONT_SIZES.display,
          iconSize: 32,
        };
      default:
        return {
          fontSize: FONT_SIZES.logo,
          iconSize: 24,
        };
    }
  };

  const logoSize = getLogoSize();

  return (
    <View style={styles.container}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <Ionicons name="bar-chart" size={logoSize.iconSize} color={COLORS.primary} />
        </View>
      )}
      <Text style={[styles.logoText, { fontSize: logoSize.fontSize }]}>
        Fine<Text style={styles.dollarSign}>$</Text>t
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
  logoText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  dollarSign: {
    color: COLORS.primary,
  },
});

export default Logo;
