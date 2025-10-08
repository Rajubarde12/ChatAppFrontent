/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useColorScheme, StatusBar } from 'react-native';
import RootNavigator from '@RootNavigation';
import { ThemeProvider } from './src/contexts/ThemeContext';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // useEffect(() => {
  //   initSocket(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGZjMDVkOWU1MWI0MGJkNDkwOWI3ZCIsImlhdCI6MTc1OTU1ODA1NSwiZXhwIjoxNzYyMTUwMDU1fQ.3MDH6hTXk5ELW8oGoe35BtonyA0B4Oj70mssP1tp-xw',
  //     'http://10.0.2.2:5000',
  //   );
  // }, []);
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
