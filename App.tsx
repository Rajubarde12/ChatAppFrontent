/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme, StatusBar } from 'react-native';
import RootNavigator from '@RootNavigation';
import { ThemeProvider } from './src/contexts/ThemeContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ThemeProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
