import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@navigation/types';
import HomeStack from '@navigation/stacks/HomeStack';
import ProfileStack from '@navigation/stacks/ProfileStack';
import ExploreScreen from '@screens/ExploreScreen';
import HomeSvg from '@assets/icons/home.svg';
import SearchSvg from '@assets/icons/search.svg';
import UserSvg from '@assets/icons/user.svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#9CA3AF',
        headerStyle: { backgroundColor: '#1E40AF' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeSvg width={22} height={22} color={focused ? '#1E40AF' : '#9CA3AF'} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <SearchSvg width={22} height={22} color={focused ? '#1E40AF' : '#9CA3AF'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <UserSvg width={22} height={22} color={focused ? '#1E40AF' : '#9CA3AF'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;


