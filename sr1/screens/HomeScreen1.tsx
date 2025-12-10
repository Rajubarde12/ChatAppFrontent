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
import { useNavigation } from '@react-navigation/native';
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

const HomeScreen: React.FC = () => {
  const storage = new MMKV({
    id: 'chatStorage',
  });
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

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

  // Generate unique ID for messages
  const generateMessageId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Gemini API function
  const getBotResponse = async (
    userInput: string,
    onStream: (chunk: string) => void,
  ) => {
    const API_KEY = 'AIzaSyAHfiuc37z2muho_5dTQ_2inqDj1L3bMcQ';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const requestData = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: userInput,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    try {
      const response = await axios.post(API_URL, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData: GeminiResponse = response.data;
      console.log('Gemini Response:', responseData);

      if (responseData.candidates && responseData.candidates.length > 0) {
        const candidate = responseData.candidates[0];
        if (
          candidate.content &&
          candidate.content.parts &&
          candidate.content.parts.length > 0
        ) {
          const text = candidate.content.parts[0].text;
          if (text) {
            onStream(text);
          } else {
            onStream('Sorry, I could not generate a response.');
          }
        } else {
          onStream('Sorry, I could not generate a response.');
        }
      } else {
        onStream('Sorry, I could not generate a response.');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to get response from the bot.');
    }
  };
  useEffect(() => {
    const savedMessages = storage.getString('chatMessages');
    console.log('thse saved messages are:', savedMessages);

    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);
  // Chat send handler
  const handleChatSend = async () => {
    if (chatInput.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      sender: 'user',
      message: chatInput.trim(),
      timestamp: new Date(),
      status: 'sending',
    };

    const currentInput = chatInput.trim();
    setChatInput('');
    setIsLoading(true);
    setIsGenerating(true);

    // Add user message
    setChatMessages(prev => {
      storage.set('chatMessages', JSON.stringify([...prev, userMessage]));
      return [...prev, userMessage];
    });
    // storage.set('chatMessages', JSON.stringify([...chatMessages, userMessage]));

    // Update user message status to sent
    setTimeout(() => {
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg,
        ),
      );
    }, 500);

    try {
      // Add empty bot message
      const botMessageId = generateMessageId();
      const emptyBotMessage: ChatMessage = {
        id: botMessageId,
        sender: 'ai',
        message: '',
        timestamp: new Date(),
        status: 'sending',
        isTyping: true,
      };

      setChatMessages(prev => [...prev, emptyBotMessage]);

      await getBotResponse(currentInput, response => {
        setChatMessages(prev => {
          const updated = [...prev];
          const botMessageIndex = updated.findIndex(
            msg => msg.id === botMessageId,
          );
          if (botMessageIndex !== -1) {
            updated[botMessageIndex] = {
              ...updated[botMessageIndex],
              message: response,
              isTyping: false,
              status: 'delivered',
            };
          }
          storage.set('chatMessages', JSON.stringify(updated));
          return updated;
        });
      });
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages(prev => {
        const updated = [...prev];
        const lastBotMessage = updated.filter(msg => msg.sender === 'ai').pop();
        if (lastBotMessage) {
          const index = updated.findIndex(msg => msg.id === lastBotMessage.id);
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              message: 'Failed to get response from the bot.',
              isTyping: false,
              status: 'failed',
            };
          }
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleBellPress = () => {
    console.log('Bell pressed');
  };

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

    if (message.sender === 'user') {
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

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <CustomHeader
        title="AI Assistant"
        onMenuPress={handleMenuPress}
        onBellPress={handleBellPress}
        backgroundColor={theme.colors.primary}
        textColor={theme.colors.userText}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          {/* Welcome Section */}
          {chatMessages.length === 0 && (
            <View
              style={[styles.welcomeContainer, { padding: theme.spacing.lg }]}
            >
              <Text style={[styles.welcomeTitle, { color: theme.colors.text }]}>
                Welcome to AI Assistant
              </Text>
              <Text
                style={[
                  styles.welcomeSubtitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Ask me anything! I'm here to help you with questions, provide
                information, or just have a conversation.
              </Text>
            </View>
          )}

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
              <View key={groupIndex}>
                {group.messages.map((message, messageIndex) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
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
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme.colors.surface,
                borderTopColor: theme.colors.border,
              },
            ]}
          >
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
