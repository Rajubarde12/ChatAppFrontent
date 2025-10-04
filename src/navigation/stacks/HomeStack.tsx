import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import { HeaderBackButton, HeaderBellButton, HeaderMenuButton, HeaderRightGroup } from '@components/HeaderButtons';
import UserListScreen from '@screens/UserListScreen';

type HomeStackParamList = {
  HomeMain: undefined;
  Details: { id?: string } | undefined;
  UserListScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
    initialRouteName='UserListScreen'
      screenOptions={{
        headerStyle: { backgroundColor: '#1E40AF' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        headerShadowVisible: Platform.OS === 'ios',
      }}
    >
      <Stack.Screen
      name='UserListScreen'
        component={UserListScreen}
      />
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;


