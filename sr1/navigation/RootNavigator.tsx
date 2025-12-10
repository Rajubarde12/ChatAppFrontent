import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@navigation/types';
import AppDrawer from '@navigation/drawer/AppDrawer';
import SettingsScreen from '@screens/SettingsScreen';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/Login';
import RegistrationScreen from '@screens/Regisration';
import ContactsChatScreen from '@screens/Const UnregisterdUserlisting';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="Main" component={AppDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScContactsChatScreenreen" component={ContactsChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;


