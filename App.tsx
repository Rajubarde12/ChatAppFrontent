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
import { useColorScheme, StatusBar, LogBox } from 'react-native';
import RootNavigator from '@RootNavigation';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  LogBox.ignoreAllLogs(true);
  const isDarkMode = useColorScheme() === 'dark';
  // useEffect(() => {
  //   initSocket(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGZjMDVkOWU1MWI0MGJkNDkwOWI3ZCIsImlhdCI6MTc1OTU1ODA1NSwiZXhwIjoxNzYyMTUwMDU1fQ.3MDH6hTXk5ELW8oGoe35BtonyA0B4Oj70mssP1tp-xw',
  //     'http://10.0.2.2:5000',
  //   );
  // }, []);
  return (
   
      <SafeAreaView  style={{ flex: 1,backgroundColor:"#000"}}>
       <StatusBar barStyle={"dark-content"}/>
        <ThemeProvider>
          <NavigationContainer >
            <Provider store={store}>
              <RootNavigator />
            </Provider>
          </NavigationContainer>
        </ThemeProvider>
      
      </SafeAreaView>
  
  );
}

export default App;
