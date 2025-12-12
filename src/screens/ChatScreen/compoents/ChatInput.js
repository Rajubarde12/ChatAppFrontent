import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// Note: Replace these with your actual SVG components (like the StatusIcon)
import {
  SendIcon,
  MicIcon,
  EmojiIcon,
  ClipIcon,
  CameraIcon,
} from './SvgIconsPlaceholder';
import { colors } from '../../../utils/colors';
import MediaActionSheet from './MediaActionSheet';



const ChatInput = ({ onSendMessage, onSendMedia,onCameraClick }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };
  const [visible,setVisible]=useState(false)

  const isTextEmpty = inputText.trim().length === 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0} // Adjust this value if you have a header
    >
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          {/* Emoji Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <EmojiIcon />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message"
            placeholderTextColor={colors.neutral[500] || '#8696a0'}
            multiline
            maxHeight={120} // Prevent the input from growing too large
          />

          {/* Right Attachment Icons (Conditional) */}
          {isTextEmpty && (
            <View style={styles.attachmentContainer}>
              <TouchableOpacity  style={styles.iconButton} onPress={onSendMedia}>
                <ClipIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{onCameraClick()}} style={[styles.iconButton, { marginRight: 4 }]}>
                <CameraIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={
            isTextEmpty ? () => console.log('Record Voice Note') : handleSend
          }
          activeOpacity={0.7}
        >
          {isTextEmpty ? <MicIcon /> : <SendIcon />}
        </TouchableOpacity>
      </View>
  
    </KeyboardAvoidingView>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#0b141a', // Dark Mode background
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#202c33', // Input bubble background
    borderRadius: 30,
    paddingHorizontal: 8,
    marginRight: 8,
    maxHeight: 120, 
    overflow: 'hidden',
    paddingVertical: 8,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'flex-end',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#e9edef', // Light text color
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 20,
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary, // WhatsApp Teal/Green FAB color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // Aligns button visually with input area
  },
});
