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
import { getToken, getUserId } from '@utils/storage';
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Contstants from '@utils/Contstants';
import AppBackground from '@components/AppBackground';
import CustomHeader from '@components/CustomHeader';
import { ChatMessage, ChatTheme } from 'src/types/chat';
import { IUser } from 'src/types/user';
import { useFetchUsersQuery } from 'src/app/features/user/userApi';
import {
  getSocket,
  offGetReadMessagesId,
  offReceiveMessage,
  onGetReadMessagesId,
  onReceiveMessage,
} from '@utils/socket';
import Doublecheck from '@assets/icons/doublecheck.svg';
import DoubleCheckReded from '@assets/icons/doublecheckReaded.svg';
import SingleCheck from '@assets/icons/SingleCheck.svg';

export default function UserListScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const { data, isLoading, isError, refetch } = useFetchUsersQuery();
  const focused = useIsFocused();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      return;
    }
    socket.on('refreshUserList', data => {
      if (data) {
        refetch();
      }
    });

    if (focused) {
      refetch();
    }

    return () => {
      socket.off('refreshUserList');
      // offGetReadMessagesId()
    };
  }, [focused]);

  const handleUserPress = (user: IUser) => {
    navigation.navigate('HomeMain', {
      receiverId: user.id,
      receiverName: user.name,
    });
  };

  const getInitials = (name: string) => {
    if (!name) return;
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RenderStatusIcon
                    isUser={item.lastMessage?.senderId == getUserId()}
                    message={item.lastMessage}
                  />
                  <Text style={styles.email}>{item.lastMessage?.message}</Text>
                </View>
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

const RenderStatusIcon = ({
  isUser,
  message,
}: {
  isUser: boolean;
  message: ChatMessage;
}) => {
  if (!isUser) return null;
  const { colors } = useTheme();

  let statusProps = {
    height: 14,
    width: 14,
    fill: isUser ? 'rgba(255,255,255,0.7)' : colors.primary,
  };

  let StatusIcon = SingleCheck;

  if (message.isRead) {
    statusProps.height = 25;
    statusProps.width = 25;
    StatusIcon = DoubleCheckReded;
  } else if (message.isDelivered) {
    statusProps.height = 25;
    statusProps.width = 25;
    StatusIcon = Doublecheck;
  }
  return (
    <View style={{ marginRight: 2 }}>
      <StatusIcon {...statusProps} />
    </View>
  );
};

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
