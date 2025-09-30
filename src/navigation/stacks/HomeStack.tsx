import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import { HeaderBackButton, HeaderBellButton, HeaderMenuButton, HeaderRightGroup } from '@components/HeaderButtons';

type HomeStackParamList = {
  HomeMain: undefined;
  Details: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E40AF' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        headerShadowVisible: Platform.OS === 'ios',
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => <HeaderMenuButton />,
          headerRight: () => (
            <HeaderRightGroup>
              <HeaderBellButton />
            </HeaderRightGroup>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Details',
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => (
            <HeaderRightGroup>
              <HeaderBellButton />
            </HeaderRightGroup>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;


