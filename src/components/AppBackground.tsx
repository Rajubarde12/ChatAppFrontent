import React, { ReactNode } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface ModernBackgroundProps {
  children: ReactNode;
}

const AppBackground: React.FC<ModernBackgroundProps> = ({ children }) => {
  return (
  <LinearGradient
        colors={["#0f2027", "#203a43", "#2c5364"]}
        style={styles.container}
      >
    {children}
    </LinearGradient>
  );
};

export default AppBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});
