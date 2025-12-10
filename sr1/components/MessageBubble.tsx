import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { ChatMessage, ChatTheme, MessageAction } from '../types/chat';
import { LinkInfo } from '../utils/linkDetector';
import Doublecheck from '@assets/icons/doublecheck.svg';
import DoubleCheckReded from '@assets/icons/doublecheckReaded.svg';
import SingleCheck from '@assets/icons/SingleCheck.svg';
import { getUserId } from '@utils/storage';
import RenderAttachments from './renderAttchmenst';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface MessageBubbleProps {
  message: ChatMessage;
  theme: ChatTheme;
  isGrouped?: boolean;
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
  onPress,
  onLongPress,
  onLinkPress,
  onActionPress,
  actions = [],
  recever,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const sender = getUserId();

  const isUser = message.senderId != recever;
  const isAI = message.senderId !== sender;

  // Pulsing animation for sending messages
  React.useEffect(() => {
    if (message.status === 'sending') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.95,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [message.status, pulseAnim]);

  const formatTime = (date: Date | string | undefined) => {
  if (!date) return '';

  const dt = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diff = now.getTime() - dt.getTime();

  // < 1 min
  if (diff < 60 * 1000) return 'Now';

  // < 1 hour
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}m ago`;
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  // same day
  if (dt.toDateString() === now.toDateString()) {
    return dt.toLocaleTimeString([], options);
  }

  // yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (dt.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${dt.toLocaleTimeString([], options)}`;
  }

  // different year
  if (now.getFullYear() !== dt.getFullYear()) {
    return dt.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    });
  }

  // same year but older date
  return dt.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    ...options,
  });
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

    onPress?.();
  };

  const handleLongPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowActions(true);
    onLongPress?.();
  };

  const handleActionPress = (action: MessageAction) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowActions(false);
    onActionPress?.(action);
  };

  const renderStatusIcon = () => {
    if (!isUser) return null;

    let statusProps = {
      height: 14,
      width: 14,
      fill: isUser ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary,
    };

    let StatusIcon = SingleCheck;

    if (message.isRead) {
      statusProps.height=25
      statusProps.width=25
      StatusIcon = DoubleCheckReded;
    } else if (message.isDelivered) {
       statusProps.height=25
      statusProps.width=25
      StatusIcon = Doublecheck;
    }

    return (
      <View style={styles.statusContainer}>
        <StatusIcon {...statusProps} />
      </View>
    );
  };

  const bubbleStyle = [
    styles.bubble,
    {
      backgroundColor: isUser ? theme.colors.userBubble : theme.colors.aiBubble,
      borderRadius: isUser ? 18 : 18,
      borderBottomLeftRadius: isUser ? 18 : 4,
      borderBottomRightRadius: isUser ? 4 : 18,
      marginVertical: isGrouped ? 2 : 6,
    },
    message.status === 'sending' && {
      opacity: 0.8,
      transform: [{ scale: pulseAnim }],
    },
    message.status === 'failed' && {
      backgroundColor: isUser ? '#ffebee' : '#ffebee',
      borderColor: '#f44336',
      borderWidth: 1,
    },
    // Shadow effects
    !isGrouped && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
  ];

  const containerStyle = [
    styles.container,
    {
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginHorizontal: 12,
    },
    isGrouped ? styles.groupedContainer : ({} as any),
  ];

  return (
    <Animated.View
      style={[containerStyle, { transform: [{ scale: scaleValue }] }]}
    >
      {/* Message Bubble */}
      <View
        style={[styles.bubbleWrapper, { maxWidth: isUser ? '85%' : '85%' }]}
      >
        <TouchableOpacity
          style={bubbleStyle}
          onPress={handlePress}
          onLongPress={handleLongPress}
          activeOpacity={0.9}
          delayLongPress={200}
        >
          {/* Message Text - Only show if it's a text message or has text content */}
          {(message.messageType === 'text' || message.message) && (
            <Text
              style={[
                styles.messageText,
                {
                  color: isUser ? theme.colors.userText : theme.colors.aiText,
                },
                message.status === 'failed' && { color: '#d32f2f' },
              ]}
            >
              {message.message}
              {message.status === 'failed' && ' ❌'}
            </Text>
          )}

          {/* Attachments */}
          <RenderAttachments message={message} isUser={isUser} theme={theme} />

          {/* Message Footer */}
          <View
            style={[
              styles.footer,
              {
                justifyContent: isUser ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text
              style={[
                styles.timeText,
                {
                  color: isUser ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                },
                message.status === 'failed' && { color: '#d32f2f' },
              ]}
            >
              {formatTime(message.createdAt)}
            </Text>
            {renderStatusIcon()}
          </View>
        </TouchableOpacity>
      </View>

      {/* Actions Menu */}
      {showActions && actions.length > 0 && (
        <View
          style={[
            styles.actionsContainer,
            {
              [isUser ? 'right' : 'left']: 8,
              backgroundColor: theme.colors.surface,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          {actions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionButton,
                {
                  backgroundColor: action.color || theme.colors.primary,
                },
              ]}
              onPress={() => handleActionPress(action)}
            >
              <Text style={styles.actionText}>
                {action.icon} {action.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeActions}
            onPress={() => setShowActions(false)}
          >
            <Text style={styles.closeActionsText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
  groupedContainer: {
    marginVertical: 0,
  },
  bubbleWrapper: {
    minHeight: 44,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 60,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    paddingRight: 8,
  },
  attachments: {
    marginTop: 8,
  },
  attachmentContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 6,
  },
  attachmentImage: {
    width: 220,
    height: 160,
    borderRadius: 12,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoPlaceholder: {
    width: 220,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  videoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  audioContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 6,
    alignItems: 'center',
  },
  audioText: {
    fontSize: 14,
    fontWeight: '500',
  },
  fileContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  fileText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    marginRight: 4,
  },
  statusContainer: {
    marginLeft: 2,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  closeActions: {
    padding: 6,
    marginLeft: 4,
  },
  closeActionsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default MessageBubble;
