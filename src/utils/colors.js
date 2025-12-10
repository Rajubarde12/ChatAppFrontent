// utils/colors.js
export const colors = {
  primary: '#13c8ec',
  backgroundLight: '#f6f8f8',
  backgroundDark: '#101f22',
  neutral: {
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  gray: {
    200: '#e5e7eb',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
  },
  darkSurface: '#283639',
  darkTextSecondary: '#9db4b9',
};

export const darkTheme = {
  background: colors.backgroundDark,
  text: colors.neutral[200],
  surface: colors.darkSurface,
  textSecondary: colors.darkTextSecondary,
  statusBar: 'light-content',
};

export const lightTheme = {
  background: colors.backgroundLight,
  text: colors.neutral[900],
  surface: colors.neutral[200],
  textSecondary: colors.neutral[500],
  statusBar: 'dark-content',
};