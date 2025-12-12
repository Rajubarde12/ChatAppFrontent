import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import BackArrowIcon from '../icons/BackArrowIcon';

import VideoCallIcon from '../icons/VideoCallIcon';
import PhoneIcon from '../icons/PhoneIcon';
import MoreOptionsIcon from '../icons/MoreOptionsIcon';
import UserAvtar from '../../../components/common/UserAvtar';
import { colors } from '../../../utils/colors';
import { mainUrl } from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const formatDate = isoDate => {
  if (!isoDate) return '';

  const date = isoDate instanceof Date ? isoDate : new Date(isoDate);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));


  if (diffSeconds < 60) {
    return 'Just now';
  }


  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

 
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }


  if (diffDays === 1) {
    return `Yesterday ${date.getHours() % 12 || 12}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    const month = date.toLocaleString('default', { month: 'short' });
    return `${date.getDate()} ${month} ${date.getHours() % 12 || 12}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${
    date.getHours() % 12 || 12
  }:${date.getMinutes().toString().padStart(2, '0')} ${
    date.getHours() >= 12 ? 'PM' : 'AM'
  }`;
};

const RenderHeader = ({ user = null, isonLine = null }) => {
  const navigation = useNavigation();
  const SAMPLE_USER = {
    id: 'user2',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'Online',
    lastSeen: 'Just now',
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <BackArrowIcon width={24} height={24} />
      </TouchableOpacity>

      <View style={styles.headerAvatar}>
        <UserAvtar uri={user?.avatar} size={40} />
      </View>

      <View style={styles.headerInfo}>
        <Text style={styles.userName}>
          {user?.name === 'New User'
            ? `${user?.countryCode}${user?.mobileNumber}`
            : user?.name}
        </Text>
        <Text style={styles.userStatus}>
         {isonLine?.isActive? 'Online':`Last Seen ${formatDate(isonLine?.lastLogin)}`}
        </Text>
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerActionButton}>
          <VideoCallIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerActionButton}>
          <PhoneIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerActionButton}>
          <MoreOptionsIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  userStatus: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default RenderHeader;
