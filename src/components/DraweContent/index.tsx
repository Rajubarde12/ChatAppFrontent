import React, { use } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import AppBackground from '@components/AppBackground';
import { clearStorage } from '@utils/storage';
import { useGetUserProfileQuery } from 'src/app/features/user/userApi';

type DrawerProps = DrawerContentComponentProps;

const RenderDrawer: React.FC<DrawerProps> = props => {
  const { navigation } = props;
  const { data, isLoading } = useGetUserProfileQuery();
  const user = data?.user;
  // 🔹 Dummy user data (replace later with real API/user store)

  const handleLogout = () => {
    // Add your logout logic here
    clearStorage();
    navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
  };
  if (isLoading) {
    return <Text>loaging</Text>;
  }

  return (
    <AppBackground>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri:
                user?.avatar && user.avatar.trim() !== ''
                  ? user.avatar
                  : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <View style={styles.menuSection}>
          <DrawerItem
            label="Home"
            onPress={() => navigation.navigate('Tabs')}
            labelStyle={styles.menuLabel}
          />
          <DrawerItem
            label="About"
            onPress={() => navigation.navigate('About')}
            labelStyle={styles.menuLabel}
          />
          <DrawerItem
            label="Profile"
            onPress={() => navigation.navigate('Profile' as never)} // optional if exists
            labelStyle={styles.menuLabel}
          />
        </View>
        <View style={styles.footerSection}>
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            labelStyle={[styles.menuLabel, { color: 'red' }]}
          />
        </View>
      </DrawerContentScrollView>
    </AppBackground>
  );
};

export default RenderDrawer;

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
  },
  footerSection: {
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});
