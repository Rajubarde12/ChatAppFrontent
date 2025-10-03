import { ChatTheme } from '../types/chat';

export const lightTheme: ChatTheme = {
  name: 'Light',
  colors: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    userBubble: '#1E40AF',
    aiBubble: '#F1F5F9',
    userText: '#FFFFFF',
    aiText: '#1E293B',
    link: '#1E40AF',
    error: '#DC2626',
    success: '#059669',
    warning: '#D97706',
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};

export const darkTheme: ChatTheme = {
  name: 'Dark',
  colors: {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    userBubble: '#3B82F6',
    aiBubble: '#334155',
    userText: '#FFFFFF',
    aiText: '#F1F5F9',
    link: '#60A5FA',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (isDark: boolean): ChatTheme => {
  return isDark ? darkTheme : lightTheme;
};
