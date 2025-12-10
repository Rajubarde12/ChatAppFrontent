import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  designRoot: {
    flex: 1,
    maxWidth: 428,
    maxHeight: 926,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Text styles
  textH2: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.015,
    textAlign: 'center',
  },
  textBody: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  textBodyMedium: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  textSmall: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Button styles
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: colors.primary,
  },
  
  // Input styles
  inputContainer: {
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    includeFontPadding: false,
  },
  
  // Layout helpers
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const darkStyles = StyleSheet.create({
  designRoot: {
    backgroundColor: colors.backgroundDark,
  },
  textH2: {
    color: colors.white,
  },
  textBody: {
    color: colors.white,
  },
  input: {
    color: colors.white,
  },
});

export const lightStyles = StyleSheet.create({
  designRoot: {
    backgroundColor: colors.backgroundLight,
  },
  textH2: {
    color: colors.neutral[900],
  },
  textBody: {
    color: colors.neutral[900],
  },
  input: {
    color: colors.neutral[900],
  },
});