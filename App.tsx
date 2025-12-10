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
import { useColorScheme, StatusBar, LogBox, Button, Alert } from 'react-native';
import RootNavigator from '@RootNavigation';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import notifee, { AndroidImportance } from '@notifee/react-native';

import { useStallionUpdate } from "react-native-stallion";


import {
  initSocket,
  messageNotificationType,
  offSocketNotification,
  onSocketNotification,
} from '@utils/socket';
import { getToken } from '@utils/storage';
import Contstants from '@utils/Contstants';

function App() {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      initSocket(token, Contstants.SocketUrl);
    }
  }, []);
  async function onDisplayNotification(data:messageNotificationType) {
    await notifee.requestPermission();
   
    
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: "New Message",
      body: data.newMessage.message,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    onSocketNotification(onDisplayNotification);
    return () => {
      offSocketNotification();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle={'dark-content'} />
      <ThemeProvider>
        <NavigationContainer>
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
