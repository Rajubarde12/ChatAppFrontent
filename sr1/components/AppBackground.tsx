import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

interface AppBackgroundProps {
  children?: React.ReactNode;
}

const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      {/* 3️⃣ Actual content above everything */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#6e8e9cff',
    width:'100%'
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});

export default AppBackground;
