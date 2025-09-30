import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from '@navigation/tabs/MainTabs';
import AboutScreen from '@screens/AboutScreen';
import { DrawerParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppDrawer: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={MainTabs} options={{ headerShown: false, title: 'Home' }} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;


