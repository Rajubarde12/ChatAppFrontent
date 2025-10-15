import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import { getToken } from '@utils/storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Contstants from '@utils/Contstants';
import AppBackground from '@components/AppBackground';
import CustomHeader from '@components/CustomHeader';
import { ChatMessage } from 'src/types/chat';
import { IUser } from 'src/types/user';
import { useFetchUsersQuery } from 'src/app/features/user/userApi';
import { offReceiveMessage, onReceiveMessage } from '@utils/socket';

export default function UserListScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const { data, isLoading, isError, refetch } = useFetchUsersQuery();
  const focused = useIsFocused();
  useEffect(() => {
    // Refetch whenever a new message is received
    const unsubscribe = onReceiveMessage(msg => {
      refetch(); // update Users list or Chat list
    });

    // Also refetch when the screen becomes focused
    if (focused) {
      refetch();
    }

    return () => {
      offReceiveMessage(); // clean up listener
    };
  }, [focused]);

  const handleUserPress = (user: IUser) => {
    navigation.navigate('HomeMain', {
      receiverId: user.id,
      receiverName: user.name,
    });
  };

  const getInitials = (name: string) => {
    if(!name)
      return
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (loading)
    return (
      <AppBackground>
        <ActivityIndicator size="large" color="#fff" style={{ flex: 1 }} />
      </AppBackground>
    );

  return (
    <AppBackground>
      <CustomHeader title="Users" showBackButton={false} text={''} />
      <View style={styles.container}>
        <FlatList
          data={data?.users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleUserPress(item)}
            >
              
              {item.avatar ? (
                <Image
                  source={{ uri: `${Contstants.MediaUrl}/${item.avatar}` }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {getInitials(item.name)}
                  </Text>
                </View>
              )}
              <View style={styles.userInfo}>
                
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.lastMessage?.message}</Text>
              </View>
              {item.unreadCount > 0 && (
                <View
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    marginLeft: 'auto',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    {item.unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#56ab2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  userInfo: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#ddd',
  },
});
