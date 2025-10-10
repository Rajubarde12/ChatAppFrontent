import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu from '@assets/icons/back.svg';
import ArrowBack from '@assets/icons/back.svg';
import Bell from '@assets/icons/back.svg';
import LinearGradient from 'react-native-linear-gradient';
import GradientCircleLetter from './CommonProfileIcon';
import { BlurView } from '@react-native-community/blur';
import { fonts } from '@utils/fonts';
import { userStatustype } from '@utils/socket';

interface ChatHeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  backgroundColor?: string;
  text: String;
  userStatus?:userStatustype
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = '',
  showBackButton = true,
  rightIcon,
  onRightPress,
  backgroundColor = '#56ab2f', // default green
  text,
  userStatus
}) => {
  const navigation = useNavigation<any>();
const formatDate = (isoDate: string | Date | undefined): string => {
  if (!isoDate) return "";

  const date = isoDate instanceof Date ? isoDate : new Date(isoDate);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Less than 1 minute
  if (diffSeconds < 60) {
    return "Just now";
  }

  // Less than 1 hour
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  // Less than 24 hours
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  // Yesterday
  if (diffDays === 1) {
    return `Yesterday ${date.getHours() % 12 || 12}:${date.getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  }

  // Within this year
  if (date.getFullYear() === now.getFullYear()) {
    const month = date.toLocaleString("default", { month: "short" });
    return `${date.getDate()} ${month} ${date.getHours() % 12 || 12}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  }

  // Older than this year
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date
    .getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, "0")} ${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;
};



  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ArrowBack height={15} width={15} fill={'#fff'} />
        <View>
          
          <GradientCircleLetter
            fontSize={15}
            size={38}
            style={{ marginLeft: 8 }}
            letter={typeof title == 'string' ? title[0] : 'U'}
            colors={['#f55742', '#803131ff']}
          />
        </View>
        <View>
          <Text
            style={{
              marginLeft: 8,
              color: '#fff',
              fontSize: 18,
              fontWeight: '600',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              marginLeft: 8,
              color: '#fff',
              fontWeight: '400',
              fontSize: 12,
            }}
          >
            {userStatus?.isActive? 'Online':`Last Seen ${formatDate(userStatus?.lastLogin)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    overflow: 'hidden',
    backgroundColor: '#6e8e9cff',
    borderBottomWidth: 0.3,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 25,
    position: 'relative',
    zIndex: 10,
  },
});
