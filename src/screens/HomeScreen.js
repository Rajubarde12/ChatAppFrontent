import React, { useEffect, useCallback } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../utils/colors';
import Dots from '../assets/svgIcon/dots.svg';
import { fetchUserChats, fetchUsersList } from '../redux/reducers';
import UserAvtar from '../components/common/UserAvtar';
import { formatMessageTime } from '../utils/timeFormattor';
import SocketService from '../socket.js';
import { StatusIcon } from './ChatScreen/compoents/StatusIcon.js';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userLists, userChats, loading, userProfile } = useSelector(
    state => state.app,
  );

    


  // Separate recent chats and all users
  const recentChats = userChats || [];
  const allUsers = (userLists || []).filter(
    user => !recentChats.some(chat => chat.chat_id === user.chat_id),
  );

  useFocusEffect(
    useCallback(() => {
      SocketService.userListOpened();
      return () => {
        SocketService.userListClosed();
      };
    }, []),
  );

  useEffect(() => {
    SocketService.onRefressUserList(() => {
      dispatch(fetchUsersList());
      dispatch(fetchUserChats());
    });
    return () => {
      SocketService.offRefressUserList();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUsersList());
    dispatch(fetchUserChats());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ChatScreen', { user: item })}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <UserAvtar uri={item?.image} size={52} />
        <View style={{ marginLeft: 14, flexShrink: 1 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}
            numberOfLines={1}
          >
            {item?.name || `${item?.mobile || 'Unknown User'}`}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 2,
            }}
          >
            {item?.lastMessage?.senderId === userProfile?.id && (
              <StatusIcon
                status={
                  item?.lastMessage?.isRead
                    ? 'read'
                    : item?.lastMessage?.isDelivered
                    ? 'delivered'
                    : 'sent'
                }
              />
            )}
            <Text
              style={{
                color: colors.neutral[400],
                fontSize: 13,
                fontWeight: '400',
              }}
              numberOfLines={1}
            >
              {item?.lastMessage?.messageType === 'text'
                ? item?.lastMessage?.message || 'No message'
                : item?.lastMessage?.messageType === 'image'
                ? '🖼️ Photo'
                : item?.lastMessage?.messageType === 'video'
                ? '🎥 Video'
                : item?.lastMessage?.messageType === 'audio'
                ? '🎧 Audio'
                : item?.lastMessage?.messageType === 'file'
                ? '📄 File'
                : 'Hey there!'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
        <Text
          style={{ color: colors.neutral[300], fontSize: 12, marginBottom: 5 }}
        >
          {formatMessageTime(item?.lastMessageTime) || '10:34 PM'}
        </Text>

        {item?.unreadCount > 0 && (
          <View
            style={{
              height: 22,
              width: 22,
              borderRadius: 11,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>
              {item?.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title, data) => (
    <View style={{ marginBottom: 16 }}>
      {data?.length > 0 && (
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          {title}
        </Text>
      )}
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.chat_id?.toString() || item.id?.toString() || index.toString()
        }
        renderItem={renderItem}
        scrollEnabled={false} // scroll controlled by parent ScrollView
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              backgroundColor: colors.neutral[800],
              marginLeft: 82,
            }}
          />
        )}
        ListEmptyComponent={() =>
          loading ? (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          ) : null
        }
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 10,
            paddingBottom: 6,
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
            Chats
          </Text>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
            {userProfile?.name}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {/* <SearchIcon /> */}
            <Dots />
          </View>
        </View>

        {/* Scrollable Lists */}
        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          {renderSection('Recent Chats', recentChats)}
          {renderSection('All Users', allUsers)}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
