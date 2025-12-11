import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import BackArrowIcon from '../icons/BackArrowIcon';

import VideoCallIcon from '../icons/VideoCallIcon';
import PhoneIcon from '../icons/PhoneIcon';
import MoreOptionsIcon from '../icons/MoreOptionsIcon';
import UserAvtar from '../../../components/common/UserAvtar';
import { colors } from '../../../utils/colors';
import { mainUrl } from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const RenderHeader = ({ user = null }) => {
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
          {true ? 'Online' : `Last seen ${SAMPLE_USER.lastSeen}`}
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
