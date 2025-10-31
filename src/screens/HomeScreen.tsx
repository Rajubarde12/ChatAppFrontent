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
  UserStatusType,
  updateSenderToMessageRead,
  onGetReadMessagesId,
  offGetReadMessagesId,
  getSocket,
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
import AttachmentModal from '@components/AttchmentModal';
import { pickAttachment } from '@utils/pickAttachment';
import AttachmentPreview from '@components/attchmentsPreview';
import { uploadFile } from '@utils/fileUpload';

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
  const [attachments, setAtachments] = useState<{
    name: string;
    type: string;
    uri: string;
  } | null>(null);
  const [attachmentType, setAttchmenttype] = useState('');

  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const handleAttachmentSelect = async (types: 'image' | 'video' | 'file') => {
    setShowAttachmentModal(false);
    const respopnse = await pickAttachment(types);
    if (respopnse) {
      const { name, type, uri } = respopnse;
      if (name && uri) setAtachments({ name, type, uri });
      setAttchmenttype(types);
    }
  };
  const { data, isLoading, refetch } = useFetchuserchatQuery(receiverId);

  const { data: userStatusData, refetch: fetchUserStatus } =
    useGetUserStatusQuery(receiverId);

  useEffect(() => {
    setIsOnline(userStatusData?.data);
  }, [userStatusData]);

  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const [isOnline, setIsOnline] = useState<UserStatusType>();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    setChatMessages(data?.messages || []);
    refetch();
  }, [data]);
  useEffect(() => {
    fetchUserStatus();
  }, [isOnline]);

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
  const focused = useIsFocused();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.log('socket not connected');
      return;
    }
    const handleNewMessage = (msg: any) => {
      console.log('📩 New message received:', msg);
      if (msg.senderId === receiverId) {
        setChatMessages(prev => [...prev, msg]);
        updateSenderToMessageRead(receiverId);
      }
    };
    socket.on('newMessage', handleNewMessage);
    socket.emit('chatOpened', { receiverId });

    return () => {
      socket.emit('chatClosed', { receiverId });
      socket.off('newMessage', handleNewMessage);
    };
  }, [receiverId, focused]);

  useEffect(() => {
    if (!receiverId) return;

    const socket = getSocket();
    if (!socket) {
      console.warn('Socket not available from getSocket()');
      return;
    }

    console.log(
      'Socket instance id:',
      socket.id,
      'connected:',
      socket.connected,
    );

    // stable handlers (use callbacks if they use state setters outside)

    const handleMessageSent = (msg: any) => {
      console.log('✅ message sent event:', msg);
      setChatMessages(prev => [...prev, msg]);
    };

    const handleReadIds = (ids: number[]) => {
      console.log('🔁 read ids:', ids);
      setChatMessages(prev =>
        prev.map(p => (ids.includes(p.id) ? { ...p, isRead: true } : p)),
      );
    };

    const handleUserStatus = (data: any) => {
      if (data?.userId === receiverId) {
        if (data?.undeliveredIds?.length > 0) {
          setChatMessages(prev =>
            prev.map(p =>
              data?.undeliveredIds.includes(p.id)
                ? { ...p, isDelivered: true }
                : p,
            ),
          );
        }
        setIsOnline(data);
      }
    };

    // Helper to (re)attach all listeners once
    const attachListeners = () => {
      console.log('Attaching socket listeners');
      // onReceiveMessage(handleNewMessage);
      onMessageSent(handleMessageSent);
      onGetReadMessagesId(handleReadIds);
      onUserStatusChanged(handleUserStatus);
    };

    // Helper to remove them
    const detachListeners = () => {
      console.log('Detaching socket listeners');
      // offReceiveMessage(handleNewMessage);
      offMessageSent(handleMessageSent);
      offGetReadMessagesId(handleReadIds);
      offUserStatusChanged(handleUserStatus);
    };

    // Always attach listeners (socket.on will queue them even if not connected),
    // and also attach on connect to ensure server-side authorization/rooms happen.
    attachListeners();

    // If socket already connected, inform server (join room / auth)
    if (socket.connected) {
      console.log('Socket already connected — sending presence/join message');
      updateSenderToMessageRead(receiverId); // or emit join-room event if your server expects
    }

    // On connect/reconnect, ensure server recognizes this socket (auth/join room)
    const onConnect = () => {
      console.log('Socket connected (event)');
      // re-emit any handshake/room join required by your server
      updateSenderToMessageRead(receiverId);
    };
    socket.on('connect', onConnect);

    // cleanup when effect unmounts or receiverId changes
    return () => {
      socket.off('connect', onConnect);
      detachListeners();
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
    let file = '';
    if (attachments) {
      const files = await uploadFile('chat', attachments, { tk: 12 });
      file = files?.fileUrl;
    }

    sendMessage({
      receiverId: receiverId || '',
      message: chatInput.trim() || '',
      messageType: attachmentType ?? 'text',
      attachments: file ? [file] : null,
    });
    setChatInput('');
    setAtachments(null);
    setAttchmenttype('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        userStatus={isOnline}
        title={receiverName}
        text={isOnline ? 'Online' : 'Offline'}
      />
      <AttachmentPreview
        onRemove={() => {
          setAtachments(null);
          setAttchmenttype('');
        }}
        attachment={attachments}
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
                      recever={receiverId}
                      sender={getUserId() ?? ''}
                      theme={theme}
                      isGrouped={group.isConsecutive && messageIndex > 0}
                      // showAvatar={shouldShowAvatar(group, messageIndex)}
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
                <TouchableOpacity onPress={() => setShowAttachmentModal(true)}>
                  <Text style={{ fontSize: 22, marginRight: 10 }}>📎</Text>
                </TouchableOpacity>
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
                        (!chatInput.trim() && !attachments?.uri) || isLoading
                          ? theme.colors.border
                          : theme.colors.primary,
                      borderRadius: theme.borderRadius.xl,
                    },
                  ]}
                  disabled={
                    (!chatInput.trim() && !attachments?.uri) || isLoading
                  }
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
        <AttachmentModal
          visible={showAttachmentModal}
          onClose={() => {
            setShowAttachmentModal(false);
          }}
          onSelect={handleAttachmentSelect}
        />
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
