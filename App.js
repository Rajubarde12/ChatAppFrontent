import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import CountrySelectionScreen from './src/screens/CountrySelectionScreen';
import PhoneScreen from './src/screens/PhoneScren';
import OtpScreen from './src/screens/otpScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { fetchUserProfile } from './src/redux/reducers';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  const { dispatch } = store || {};
  const scheme = useColorScheme();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="CountrySelectionScreen"
            component={CountrySelectionScreen}
          />
          <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen
            name="ProfileSetupScreen"
            component={ProfileSetupScreen}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
