// components/AppButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, loading, disabled, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, { opacity: disabled || loading ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#56ab2f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
