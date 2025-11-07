import { Dimensions } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Guideline base values (iPhone 11 as reference)
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

// Responsive scaling functions
export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

// Moderate scale with optional factor (defaults to 0.5)
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Reusable dimension constants
export const dimensions = {
  // Screen
  screenWidth: width,
  screenHeight: height,

  // Margins
  smallMargin: scale(8),
  mediumMargin: scale(16),
  largeMargin: scale(24),

  // Padding
  smallPadding: scale(8),
  mediumPadding: scale(16),
  largePadding: scale(24),

  // Radius
  smallRadius: scale(4),
  mediumRadius: scale(8),
  largeRadius: scale(16),

  // Icon sizes
  smallIcon: scale(16),
  mediumIcon: scale(24),
  largeIcon: scale(32),

  // Font sizes
  smallFont: scale(12),
  mediumFont: scale(14),
  largeFont: scale(16),
  titleFont: scale(20),
} as const;

// Breakpoints for responsive behavior
export const breakpoints = {
  phone: 0,
  tablet: 768,
} as const;

// Device type detection
export const isTablet = width >= breakpoints.tablet;
export const isPhone = width < breakpoints.tablet;

// Orientation detection
export const isPortrait = height >= width;
export const isLandscape = width > height;
