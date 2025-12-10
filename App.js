import React from 'react';
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

const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
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
        <Stack.Screen name="ProfileSetupScreen" component={ProfileSetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
