import { Platform, ToastAndroid } from 'react-native';

export const showToast = (message: string) => {
  // Implementation for showing a custom toast message
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    return;
  }
  // For iOS or other platforms, you can integrate a custom toast library   or create your own component
  console.log('Toast message:', message);
};
