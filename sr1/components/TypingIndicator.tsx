import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { ChatTheme } from '../types/chat';
import Avatar from './Avatar';

interface TypingIndicatorProps {
  theme: ChatTheme;
  isVisible: boolean;
  text?: string;
  sender?: 'user' | 'ai';
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  theme,
  isVisible,
  text = 'AI is typing',
  sender = 'ai',
}) => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isVisible) {
      const createAnimation = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0.3,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const animation1 = createAnimation(dot1, 0);
      const animation2 = createAnimation(dot2, 200);
      const animation3 = createAnimation(dot3, 400);

      animation1.start();
      animation2.start();
      animation3.start();

      return () => {
        animation1.stop();
        animation2.stop();
        animation3.stop();
      };
    }
  }, [isVisible, dot1, dot2, dot3]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.container, { flexDirection: sender === 'user' ? 'row-reverse' : 'row' }]}>
      <Avatar
        sender={sender}
        size="small"
        theme={theme}
        showOnlineStatus={sender === 'user'}
        isOnline={sender === 'user'}
      />
      
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: sender === 'user' ? theme.colors.userBubble : theme.colors.aiBubble,
            borderRadius: theme.borderRadius.lg,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            marginVertical: theme.spacing.sm,
            marginHorizontal: theme.spacing.sm,
            maxWidth: '80%',
            alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
            borderBottomLeftRadius: sender === 'user' ? theme.borderRadius.lg : theme.borderRadius.sm,
            borderBottomRightRadius: sender === 'user' ? theme.borderRadius.sm : theme.borderRadius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: sender === 'user' ? theme.colors.userText : theme.colors.aiText,
              fontSize: 16,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          {text}
        </Text>
        
        <View style={styles.dotsContainer}>
          <Animated.Text
            style={[
              styles.dot,
              {
                color: sender === 'user' ? theme.colors.userText : theme.colors.aiText,
                opacity: dot1,
              },
            ]}
          >
            ●
          </Animated.Text>
          <Animated.Text
            style={[
              styles.dot,
              {
                color: sender === 'user' ? theme.colors.userText : theme.colors.aiText,
                opacity: dot2,
              },
            ]}
          >
            ●
          </Animated.Text>
          <Animated.Text
            style={[
              styles.dot,
              {
                color: sender === 'user' ? theme.colors.userText : theme.colors.aiText,
                opacity: dot3,
              },
            ]}
          >
            ●
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  bubble: {
    // Styles applied dynamically
  },
  text: {
    // Styles applied dynamically
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    fontSize: 12,
    marginHorizontal: 2,
  },
});

export default TypingIndicator;
