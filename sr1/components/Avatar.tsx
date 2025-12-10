import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ChatTheme } from '../types/chat';

interface AvatarProps {
  sender: 'user' | 'ai';
  size?: 'small' | 'medium' | 'large';
  theme: ChatTheme;
  onPress?: () => void;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  sender,
  size = 'medium',
  theme,
  onPress,
  showOnlineStatus = false,
  isOnline = false,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'medium': return 32;
      case 'large': return 48;
      default: return 32;
    }
  };

  const getInitials = () => {
    return sender === 'user' ? 'U' : 'AI';
  };

  const getBackgroundColor = () => {
    return sender === 'user' ? theme.colors.userBubble : theme.colors.aiBubble;
  };

  const getTextColor = () => {
    return sender === 'user' ? theme.colors.userText : theme.colors.aiText;
  };

  const avatarSize = getSize();
  const fontSize = avatarSize * 0.4;

  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: getBackgroundColor(),
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle = {
    fontSize,
    fontWeight: '600' as const,
    color: getTextColor(),
  };

  const onlineIndicatorStyle = {
    width: avatarSize * 0.25,
    height: avatarSize * 0.25,
    borderRadius: (avatarSize * 0.25) / 2,
    backgroundColor: isOnline ? theme.colors.success : theme.colors.textSecondary,
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: theme.colors.background,
  };

  const AvatarContent = () => (
    <View style={[styles.container, avatarStyle]}>
      <Text style={[styles.text, textStyle]}>
        {getInitials()}
      </Text>
      {showOnlineStatus && (
        <View style={onlineIndicatorStyle} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <AvatarContent />
      </TouchableOpacity>
    );
  }

  return <AvatarContent />;
};

const styles = StyleSheet.create({
  container: {
    // Styles are applied dynamically
  },
  text: {
    // Styles are applied dynamically
  },
});

export default Avatar;
