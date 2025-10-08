import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import { getToken } from '@utils/storage';
import { useNavigation } from '@react-navigation/native';
import Contstants from '@utils/Contstants';
import AppBackground from '@components/AppBackground';
import CustomHeader from '@components/CustomHeader';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isActive: boolean;
}

export default function UserListScreen() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await axios.get(`${Contstants.MainUrl}/users/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserPress = (user: IUser) => {
    navigation.navigate('HomeMain', {
      receiverId: user._id,
      receiverName: user.name,
    });
  };

  const getInitials = (name: string) => {
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
        <CustomHeader title="Users" showBackButton={false} />
      <View style={styles.container}>
      
        <FlatList
          data={users}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleUserPress(item)}
            >
              {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {getInitials(item.name)}
                  </Text>
                </View>
              )}
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
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
