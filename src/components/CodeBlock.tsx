import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ChatTheme } from '../types/chat';
import { tokenize } from '@utils/tokenize';

interface CodeBlockProps {
  code: string;
  language?: string;
  theme: ChatTheme;
  onCopy?: (code: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  theme,
  onCopy,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const jsColors: { [key: string]: string } = {
    keyword: '#569CD6',
    string: '#D69D85',
    comment: '#6A9955',
    function: '#DCDCAA',
    number: '#B5CEA8',
    default: '#FFFFFF',
  };
  const tokenizeJS = (code: string) => {
    const regex =
      /(\/\/.*$)|('(?:\\'|[^'])*'|"(?:\\"|[^"])*")|(\b(?:const|let|var|function|if|else|return|for|while|switch|case|break|new|this)\b)|(\b\d+\b)/gm;

    const segments: { text: string; type: string }[] = [];
    let lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(code)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          text: code.substring(lastIndex, match.index),
          type: 'default',
        });
      }

      if (match[1]) segments.push({ text: match[1], type: 'comment' });
      else if (match[2]) segments.push({ text: match[2], type: 'string' });
      else if (match[3]) segments.push({ text: match[3], type: 'keyword' });
      else if (match[4]) segments.push({ text: match[4], type: 'number' });

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < code.length) {
      segments.push({ text: code.substring(lastIndex), type: 'default' });
    }

    return segments;
  };

  const handleCopy = async () => {
    try {
      Clipboard.setString(code);
      setIsCopied(true);

      if (onCopy) {
        onCopy(code);
      } else {
        Alert.alert('Copied', 'Code copied to clipboard');
      }

      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying code:', error);
      Alert.alert('Error', 'Failed to copy code');
    }
  };

  const displayCode = code;

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      javascript: '#F7DF1E',
      typescript: '#3178C6',
      python: '#3776AB',
      java: '#ED8B00',
      cpp: '#00599C',
      c: '#A8B9CC',
      html: '#E34F26',
      css: '#1572B6',
      json: '#000000',
      sql: '#CC2927',
      bash: '#4EAA25',
      shell: '#4EAA25',
      text: theme.colors.textSecondary,
    };
    return colors[lang.toLowerCase()] || theme.colors.textSecondary;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.languageIndicator,
              { backgroundColor: getLanguageColor(language) },
            ]}
          />
          <Text
            style={[styles.languageText, { color: theme.colors.textSecondary }]}
          >
            {language.toUpperCase()}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={handleCopy}
            style={[
              styles.copyButton,
              {
                backgroundColor: isCopied
                  ? theme.colors.success
                  : theme.colors.primary,
              },
            ]}
          >
            <Text style={[styles.copyText, { color: theme.colors.userText }]}>
              {isCopied ? '✓ Copied' : '📋 Copy'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Code Content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        style={styles.codeContainer}
        contentContainerStyle={styles.codeContent}
      >
        <Text
          style={{
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
            fontSize: 14,
          }}
        >
          {tokenize(language, code).map((seg, i) => (
            <Text
              key={i}
              style={{ color: jsColors[seg.type] || jsColors.default }}
            >
              {seg.text}
            </Text>
          ))}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  expandText: {
    fontSize: 12,
    fontWeight: '500',
  },
  copyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  codeContainer: {
    // maxHeight: 300,
    backgroundColor: '#1E1E1E',
  },
  codeContent: {
    padding: 12,
  },
  codeText: {
    fontSize: 14,
    lineHeight: 20,
    // minWidth: '100%',
    color: '#FFFFFF',
  },
});

export default CodeBlock;
