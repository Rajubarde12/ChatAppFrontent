// components/AppInput.tsx
import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';

interface AppInputProps extends TextInputProps {
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({ error, style, ...props }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#ccc"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 4,
    fontSize: 12,
  },
});
