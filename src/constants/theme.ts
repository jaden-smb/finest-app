export const COLORS = {
  // Primary brand colors
  primary: '#FF8C00', // Vibrant orange
  primaryDark: '#E6670F',
  primaryLight: '#FFA500',
  
  // Background colors (black elegant theme)
  background: '#0A0A0A',
  backgroundSecondary: '#1A1A1A',
  backgroundTertiary: '#2A2A2A',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#999999',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  // Transaction colors
  income: '#4CAF50',
  expense: '#F44336',
  debt: '#FF8C00',
  
  // Card colors
  card: '#1E1E1E',
  cardBorder: '#333333',
  
  // Accent colors
  accent: '#FF8C00',
  accentSecondary: '#FFB84D',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export const FONTS = {
  // Runic-inspired typography
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
  
  // Custom fonts (to be loaded)
  kino: 'Kino', // For logo
  runic: 'RunicRegular', // For headers
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  display: 32,
  logo: 28,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};
