import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { getToken } from '@utils/storage';
import { useNavigation } from '@react-navigation/native';
import Contstants from '@utils/Contstants';

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
      console.log('token in user list screen', token);
      
      const res = await axios.get(`${Contstants.MainUrl}/users/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users); // Nested
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

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleUserPress(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { padding: 12, borderRadius: 8, backgroundColor: '#f0f0f0' },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#555' },
  separator: { height: 10 },
});
