import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBar from '../components/common/StatusBar';
import SplashLogo from '../components/splash/SplashLogo';
import Tagline from '../components/splash/Tagline';
import { styles } from '../styles/theme';
import { colors, lightTheme, darkTheme } from '../utils/colors';
import { getString } from '../utils/storage';

const SplashScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = true ? darkTheme : lightTheme;
  useEffect(() => {
    const token = getString('token');
    setTimeout(() => {
      if (token) {
        navigation.replace('HomeScreen');
        return;
      } else {
        navigation.replace('CountrySelectionScreen');
      }
    }, 2000);
  });
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.fullScreenContainer}>
        <StatusBar />
        <View style={styles.mainContent}>
          <SplashLogo />
        </View>
        <Tagline />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
