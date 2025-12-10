import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBarLeft: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 64,
  },
   countryHeader: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.015,
    textAlign: 'center',
  },
  searchContainer: {
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    paddingRight: 16,
    includeFontPadding: false,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    flex: 1,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  alphabeticalIndex: {
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  indexLetter: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    paddingVertical: 2,
  },
  checkIcon: {
    marginLeft: 16,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: colors.primary,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  stickySectionHeader: {
    position: 'sticky',
    top: 64,
    zIndex: 10,
    paddingTop: 16,
  },
});

export const iconSizes = {
  small: 16,
  medium: 24,
  large: 120,
};

export const globalStyles=styles