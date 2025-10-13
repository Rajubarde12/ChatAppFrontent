import React, { useState, useEffect, useRef, useCallback, use } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Alert,
  Share,
  Clipboard,
} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import { GeminiResponse } from 'src/types/geminiResponse';
import { ChatMessage, MessageAction } from '../types/chat';
import CustomHeader from '../components/CustomHeader';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import { useTheme } from '../contexts/ThemeContext';
import {
  groupMessages,
  shouldShowAvatar,
  formatMessageTime,
} from '../utils/messageGrouping';
import { LinkInfo } from '../utils/linkDetector';
import { MMKV } from 'react-native-mmkv';
import {
  sendMessage,
  onReceiveMessage,
  onMessageSent,
  offReceiveMessage,
  offMessageSent,
  onUserStatusChanged,
  offUserStatusChanged,
  userStatustype,
  updateSendertoMessageReaded,
  onGetReadeMessagesid,
  offGetReadMessagesId,
} from '@utils/socket';
import { getUserId } from '@utils/storage';
import { getData } from 'src/api/apiMethods';
import AppBackground from '@components/AppBackground';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@navigation/stacks/HomeStack';
import { RootStackParamList } from '@navigation/types';
import {
  useFetchuserchatQuery,
  useGetUserStatusQuery,
} from 'src/app/features/user/userApi';
import ChatHeader from '@components/ChatHeader';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeMain'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<HomeStackParamList, 'HomeMain'>;
};

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { receiverId, receiverName } = route.params || {};

  const { data, isLoading, refetch } = useFetchuserchatQuery(
    Number(receiverId),
  );

  const { data: userStatusData, refetch: fetchUserStatus } =
    useGetUserStatusQuery(Number(receiverId));

  useEffect(() => {
    setIsOnline(userStatusData?.data);
  }, [userStatusData]);

  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const [isOnline, setIsOnline] = useState<userStatustype>();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    setChatMessages(data?.messages || []);
    refetch();
    fetchUserStatus();
  }, [data,isOnline]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [chatMessages]);

  const scrollToBottom = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  useEffect(() => {
    updateSendertoMessageReaded(receiverId);
    onUserStatusChanged(data => {
      if (data.userId == receiverId) {
        setIsOnline(data);
      }
    });
    onReceiveMessage(async msg => {
      if (msg?.senderId === receiverId) {
        setChatMessages(prev => [...prev, { ...msg }]);
        updateSendertoMessageReaded(receiverId);
      }
    });

    // Listen for ack
    onMessageSent(msg => {
      setChatMessages(prev => [...prev, { ...msg }]);
    });
    onGetReadeMessagesid(id => {
     
      setChatMessages(prev => {
        const data = prev.map(item =>
          id.includes(item.id) ? { ...item, isRead: true } : item,
        );
        return data;
      });
    });
    // Cleanup on unmount
    return () => {
      offReceiveMessage();
      offMessageSent();
      offUserStatusChanged();
      offGetReadMessagesId();
    };
  }, [receiverId]);

  const handleLinkPress = (linkInfo: LinkInfo) => {
    console.log('Link pressed:', linkInfo);
  };

  const handleMessageAction = (action: MessageAction) => {
    switch (action.id) {
      case 'copy':
        Clipboard.setString(action.label);
        Alert.alert('Copied', 'Message copied to clipboard');
        break;
      case 'share':
        Share.share({ message: action.label });
        break;
      case 'delete':
        Alert.alert('Delete Message', 'Are you sure?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              // Handle delete
            },
          },
        ]);
        break;
    }
  };

  const getMessageActions = (message: ChatMessage): MessageAction[] => {
    const baseActions: MessageAction[] = [
      {
        id: 'copy',
        label: message.message,
        icon: '📋',
        action: () => {},
        color: theme.colors.surface,
      },
      {
        id: 'share',
        label: message.message,
        icon: '📤',
        action: () => {},
        color: theme.colors.surface,
      },
    ];

    if (message.senderId.toString() === getUserId()) {
      baseActions.push({
        id: 'delete',
        label: message.message,
        icon: '🗑️',
        action: () => {},
        color: theme.colors.error,
      });
    }

    return baseActions;
  };

  const messageGroups = groupMessages(chatMessages);
  const handleChatSend = async () => {
    const user_id = getUserId() || '';
    if (!chatInput.trim()) return;
    sendMessage({
      receiverId: receiverId || '',
      message: chatInput.trim(),
    });
    setChatInput('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        userStatus={isOnline}
        title={receiverName}
        text={isOnline ? 'Online' : 'Offline'}
      />
      <AppBackground>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={[styles.container]}>
            {/* Chat Messages */}
            <ScrollView
              style={styles.chatContainer}
              ref={scrollViewRef}
              // onContentSizeChange={() => scrollToBottom()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.chatContent,
                { padding: theme.spacing.md },
              ]}
            >
              {messageGroups.map((group, groupIndex) => (
                <View key={groupIndex.toString()}>
                  {group.messages.map((message, messageIndex) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      recever={Number(receiverId)}
                      sender={Number(getUserId())}
                      theme={theme}
                      isGrouped={group.isConsecutive && messageIndex > 0}
                      showAvatar={shouldShowAvatar(group, messageIndex)}
                      onLinkPress={handleLinkPress}
                      onActionPress={handleMessageAction}
                      actions={getMessageActions(message)}
                    />
                  ))}
                </View>
              ))}

              {/* Typing Indicator */}
              {isGenerating && (
                <TypingIndicator
                  theme={theme}
                  isVisible={isGenerating}
                  text="AI is thinking..."
                  sender="ai"
                />
              )}
            </ScrollView>

            {/* Input Section */}
            <View style={[styles.inputContainer]}>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius.xl,
                  },
                ]}
              >
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: theme.colors.text,
                      fontSize: 16,
                    },
                  ]}
                  placeholder="Type your message here..."
                  placeholderTextColor={theme.colors.textSecondary}
                  value={chatInput}
                  onChangeText={setChatInput}
                  onSubmitEditing={handleChatSend}
                  returnKeyType="send"
                  editable={!isLoading}
                  multiline
                  maxLength={1000}
                />
                <TouchableOpacity
                  onPress={handleChatSend}
                  style={[
                    styles.sendButton,
                    {
                      backgroundColor:
                        !chatInput.trim() || isLoading
                          ? theme.colors.border
                          : theme.colors.primary,
                      borderRadius: theme.borderRadius.xl,
                    },
                  ]}
                  disabled={!chatInput.trim() || isLoading}
                  accessibilityRole="button"
                  accessibilityLabel="Send message"
                >
                  {isLoading ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.userText}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.sendButtonText,
                        { color: theme.colors.userText },
                      ]}
                    >
                      Send
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </AppBackground>
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: screenWidth * 0.8,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    maxHeight: 120,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 8,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
