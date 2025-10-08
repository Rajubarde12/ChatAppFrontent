import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import AppDrawer from '@navigation/drawer/AppDrawer';
import SettingsScreen from '@screens/SettingsScreen';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/Login';
import RegistrationScreen from '@screens/Regisration';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='SplashScreen'>
      <Stack.Screen name="Main" component={AppDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;


