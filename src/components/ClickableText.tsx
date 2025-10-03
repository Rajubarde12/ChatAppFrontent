import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  View,
} from 'react-native';
import { TextSegment, LinkInfo, detectLinks, getLinkDisplayText } from '../utils/linkDetector';
import ImageDisplay from './ImageDisplay';
import CodeBlock from './CodeBlock';

interface ClickableTextProps {
  text: string;
  textStyle?: any;
  linkStyle?: any;
  onLinkPress?: (linkInfo: LinkInfo) => void;
  onCodeCopy?: (code: string) => void;
  theme?: any; // ChatTheme type
}

const ClickableText: React.FC<ClickableTextProps> = ({
  text,
  textStyle,
  linkStyle,
  onLinkPress,
  onCodeCopy,
  theme,
}) => {
  const handleLinkPress = async (linkInfo: LinkInfo) => {
    try {
      console.log('Attempting to open link:', linkInfo.url);
      
      if (onLinkPress) {
        onLinkPress(linkInfo);
        return;
      }

      const canOpen = await Linking.canOpenURL(linkInfo.url);
      console.log('Can open URL:', canOpen);
      
      if (canOpen) {
        await Linking.openURL(linkInfo.url);
        console.log('Link opened successfully');
      } else {
        Alert.alert(
          'Cannot Open Link',
          `Unable to open: ${linkInfo.url}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening link:', error);
      Alert.alert(
        'Error',
        'Failed to open link',
        [{ text: 'OK' }]
      );
    }
  };

  const segments = detectLinks(text);
  console.log('Text segments for:', text, segments);
  

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => {
        if (segment.isCodeBlock && segment.codeInfo) {
          return (
            <View key={index} style={{ width: '100%', marginVertical: 4 }}>
              <CodeBlock
                code={segment.codeInfo.code}
                language={segment.codeInfo.language}
                theme={theme}
                onCopy={onCodeCopy}
              />
            </View>
          );
        }
  
        if (segment.isLink && segment.linkInfo) {
          if (segment.linkInfo.type === 'image') {
            return (
              <View key={index} style={{ width: '100%', marginVertical: 4 }}>
                <ImageDisplay
                  imageUrl={segment.linkInfo.url}
                  altText={segment.linkInfo.text}
                />
              </View>
            );
          }
  
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleLinkPress(segment.linkInfo!)}
              activeOpacity={0.7}
            >
              <Text style={[styles.linkText, linkStyle]}>
                {getLinkDisplayText(segment.linkInfo)}
              </Text>
            </TouchableOpacity>
          );
        }
  
        return (
          <Text key={index} style={[styles.regularText, textStyle]}>
            {segment.text}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
   
  },
  regularText: {
    // Default text styling will be inherited from parent
  },
  linkText: {
    color: '#1E40AF',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  linkContainer: {
    // Container for touchable links
  },
  imageDisplay: {
    marginVertical: 4,
  },
});

export default ClickableText;
