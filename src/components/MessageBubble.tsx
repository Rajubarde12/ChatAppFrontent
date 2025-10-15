import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ChatMessage, ChatTheme, MessageAction } from '../types/chat';
import Avatar from './Avatar';
import ClickableText from './ClickableText';
import { LinkInfo } from '../utils/linkDetector';
import Doublecheck from '@assets/icons/doublecheck.svg';
import DoubleCheckReded from '@assets/icons/doublecheckReaded.svg';
import SingleCheck from '@assets/icons/SingleCheck.svg';

interface MessageBubbleProps {
  message: ChatMessage;
  theme: ChatTheme;
  isGrouped?: boolean;
  showAvatar?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  onLinkPress?: (linkInfo: LinkInfo) => void;
  onActionPress?: (action: MessageAction) => void;
  actions?: MessageAction[];
  recever: string;
  sender: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  theme,
  isGrouped = false,
  showAvatar = true,
  onPress,
  onLongPress,
  onLinkPress,
  onActionPress,
  actions = [],
  recever,
  sender,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const isUser = message.receiverId === recever;
  const isAI = message.senderId === sender;

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return '';

    // Ensure date is a Date object
    let dt: Date;
    if (date instanceof Date) {
      dt = date;
    } else {
      dt = new Date(date);
    }

    const now = new Date();
    const diff = now.getTime() - dt.getTime();

    // Less than 1 minute
    if (diff < 60 * 1000) return 'Just now';

    // Less than 1 hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    }

    // Today
    if (dt.toDateString() === now.toDateString()) {
      return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (dt.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${dt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }

    // Older
    if (now.getFullYear() !== dt.getFullYear()) {
      return dt.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    // This year
    return dt.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'failed':
        return '❌';
      default:
        return '';
    }
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  const handleLongPress = () => {
    setShowActions(true);
    if (onLongPress) {
      onLongPress();
    }
  };

  const bubbleStyle = [
    styles.bubble,
    {
      backgroundColor: isUser ? theme.colors.userBubble : theme.colors.aiBubble,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 2,
      paddingTop: 5,
      marginVertical: isGrouped ? theme.spacing.xs : theme.spacing.sm,
      marginHorizontal: theme.spacing.sm,
      maxWidth: '80%',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      borderBottomLeftRadius: isUser
        ? theme.borderRadius.lg
        : theme.borderRadius.sm,
      borderBottomRightRadius: isUser
        ? theme.borderRadius.sm
        : theme.borderRadius.lg,
    },
  ];

  const textStyle = [
    styles.text,
    {
      color: isUser ? theme.colors.userText : theme.colors.aiText,
      fontSize: 15,
    },
  ];

  const timeStyle = [
    styles.time,
    {
      color: theme.colors.textSecondary,
      fontSize: 12,
      marginTop: theme.spacing.xs,
    },
  ];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleValue }],
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
        },
      ]}
    >
      <TouchableOpacity
        style={bubbleStyle}
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            {
              borderWidth: 0,
              fontSize: 16,
              paddingRight: '8%',
              color: isUser ? '#fff' : '#00',
            },
          ]}
        >
          {message.message}
        </Text>

        <View
          style={[
            styles.footer,
            {
              flexDirection: isUser ? 'row' : 'row',
              alignSelf: 'flex-end',
              marginLeft: '5%',
              marginTop: 3,
              alignItems: 'center',
            },
          ]}
        >
          <Text
            style={[
              {
                marginLeft: '0%',
                fontSize: 10,
                marginTop: -3,
                color: isUser ? '#f9f9f9' : '#000',
              },
            ]}
          >
            {formatTime(message.createdAt)}
          </Text>
          <View style={{marginLeft:3}}>
          {isUser ? (
            message.isRead ? (
              <DoubleCheckReded height={21} width={21} fill={'#fff'} />
            ) : message.isDelivered ? (
              <Doublecheck height={21} width={21} fill={'#fff'} />
            ) : <SingleCheck height={12} width={12}  fill={"#fff"}/>
          ) : null}
          </View>
        </View>
      </TouchableOpacity>

      {showActions && actions.length > 0 && (
        <View
          style={[
            styles.actions,
            { left: isUser ? 'auto' : 0, right: isUser ? 0 : 'auto' },
          ]}
        >
          {actions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionButton,
                {
                  backgroundColor: action.color || theme.colors.surface,
                  borderRadius: theme.borderRadius.sm,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  marginHorizontal: theme.spacing.xs,
                },
              ]}
              onPress={() => {
                onActionPress?.(action);
                setShowActions(false);
              }}
            >
              <Text style={[styles.actionText, { color: theme.colors.text }]}>
                {action.icon} {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles applied dynamically
  },
  bubble: {
    // Styles applied dynamically
  },
  text: {
    fontSize: 18,
  },
  time: {
    // Styles applied dynamically
  },
  footer: {
    marginTop: 1,
  },
  attachments: {
    marginTop: 8,
  },
  reactions: {
    marginTop: 8,
    flexWrap: 'wrap',
  },
  reaction: {
    // Styles applied dynamically
  },
  reactionText: {
    fontSize: 12,
  },
  typingContainer: {
    marginTop: 4,
  },
  typingDots: {
    // Animation will be added here
  },
  actions: {
    position: 'absolute',
    top: -40,
    flexDirection: 'row',
    zIndex: 1000,
  },
  actionButton: {
    // Styles applied dynamically
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MessageBubble;
