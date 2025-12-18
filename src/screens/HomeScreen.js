import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
// import SearchIcon from '../../sr1/components/icons/SearchIcon';
import Dots from '../assets/svgIcon/dots.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { fetchUsersList } from '../redux/reducers';
import UserAvtar from '../components/common/UserAvtar';
import { formatMessageTime } from '../utils/timeFormattor';
import SocketService from '../socket.js';
import { StatusIcon } from './ChatScreen/compoents/StatusIcon.js';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { userLists, loading, error, userProfile } = useSelector(
    state => state.app,
  );
  const dispatch = useDispatch();

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
    });
    return () => {
      SocketService.offRefressUserList();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUsersList());
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
        <UserAvtar uri={item?.avatar} size={52} />
        <View style={{ marginLeft: 14, flexShrink: 1 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}
            numberOfLines={1}
          >
            {item?.name === 'New User'
              ? `${item?.countryCode}${item?.mobileNumber}`
              : item?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 2,
            }}
          >
            {item?.lastMessage?.senderId == userProfile?.id ? (
              <StatusIcon
                status={
                  item?.lastMessage?.isRead
                    ? 'read'
                    : item?.lastMessage?.isDelivered
                    ? 'delivered'
                    : 'sent'
                }
              />
            ) : null}
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
                : 'Hey John, how are you?'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
        <Text
          style={{
            color: colors.neutral[300],
            fontSize: 12,
            marginBottom: 5,
          }}
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
            <Text
              style={{
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              {item?.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
      <SafeAreaView style={{ flex: 1 }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {/* <SearchIcon /> */}
            <Dots />
          </View>
        </View>

        <FlatList
          data={userLists}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={{ paddingVertical: 6 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                backgroundColor: colors.neutral[800],
                marginLeft: 82,
              }}
            />
          )}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '30%',
                  }}
                >
                  <ActivityIndicator size={'large'} />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '30%',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '500' }}>
                    {'No users found'}
                  </Text>
                </View>
              );
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
