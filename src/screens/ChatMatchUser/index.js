import React from 'react';
import {
  View,
  Text,
  StyleSheet,

  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// SVG Icon Components
const ArrowBackIcon = ({ size = 24, color = '#181811' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.5 19l-7-7 7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MoreVertIcon = ({ size = 24, color = '#181811' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 13c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0-4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 8c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
      fill={color}
    />
  </Svg>
);

const AddCircleIcon = ({ size = 24, color = '#8c8b5f' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
      fill={color}
    />
  </Svg>
);

const MoodIcon = ({ size = 20, color = '#8c8b5f' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
      fill={color}
    />
  </Svg>
);

const SendIcon = ({ size = 20, color = '#181811' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      fill={color}
    />
  </Svg>
);

const DoneAllIcon = ({ size = 14, color = '#8c8b5f' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"
      fill={color}
    />
  </Svg>
);

// Dummy data for messages
const MESSAGES = [
  { id: 'system', type: 'system', text: 'You matched with Sarah! Say hello.', time: '' },
  { id: 'timestamp', type: 'timestamp', text: 'Today', time: '' },
  { id: '1', type: 'receiver', text: 'Hey! I saw you like hiking too? 🌲', time: '10:42 AM' },
  { id: '2', type: 'sender', text: 'Yeah, absolutely. Have you been to the ridge trail yet? It\'s amazing this time of year.', time: '10:45 AM', status: 'read' },
  { id: '3', type: 'receiver', text: 'Not yet! I\'ve been meaning to go. Is it difficult?', time: '10:46 AM' },
  { id: '4', type: 'sender', text: 'It\'s pretty chill actually! Here\'s a pic I took last week.', time: '10:48 AM', status: 'read', hasImage: true },
];

// Profile images (using the same URLs from HTML)
const SARAH_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMFgv0B-P1lJkRSQZ230cLvudWiC4ltsVKcRE7gX7-5dSurLu3yIgCWM2VBROVychH-4Vp5MQWb_Zev7SkXiHE6ImrJKSmXKrEBzEXXioaATE61VYeNDXDHLlOoxVZQ3KISWaRB4QzaAbVCqg21lOdWZD5DbuOfxIw90ld_b8OuEJc2XOvEWsSWJyqy6rKeZjdrw-JfZWCKQdfOoe8wYoO3TBJfbAppkZOTXpI4CGB6pqcjM-Ve6MsReLEVlednja7BW8oDjaq2G5N';
const USER_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqVokdAxEc0rD9_5ooPDuYs0Tp2XQ1rB9yT3L8WV-jhacd0RBwByB2VkeyjflilDD32_q0zypfFId0hSQNDbORXhVlbk5f8IfhHOLLjyxEoRbz0a0V8o9IUDRjCJQ-lnAGbY8u83FMNEFYwx-lFhLMO4-yK1YWaTkkS1c6b3jfvGK6RI6SnqFy9AzvK3ao3DqN0PqHyJ7_gZVzMqDToOSyTe2izrlyIHqIlQ-m0vc44tHxDl26ndSRx3k4bfi063GPT6t1YYTXxZqU';
const TRAIL_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAzttcMysDCBrOFp81fjqOZbAUFTHPbMXC-37VqrrZHTNxjmezmj9uQ2F03MZbqOYKemOd8xDBlErTP8oKIrG5rW6Ovwq3MWSiV-AAXj0yPCXZN36fiBQVgMKVHJDHdXz2y2KjTvdNZnW9hvPlVnRhxtEiGr-HpFohmPFNVWa-_6ZYKLlXPxyqTpOrB7LBYbfoNMGLELWipmOBNVbSjUiHcmg8bru73Qdv6plDrvhUAQBv_30qQiMjj0aKGEPbQ7Mkaj7tdc_LwbsL';

// Message Item Component
const MessageItem = ({ item }) => {
  if (item.type === 'system') {
    return (
      <View style={styles.systemMessageContainer}>
        <View style={styles.systemMessage}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
        </View>
      </View>
    );
  }

  if (item.type === 'timestamp') {
    return (
      <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>{item.text}</Text>
      </View>
    );
  }

  if (item.type === 'receiver') {
    return (
      <View style={styles.receiverContainer}>
        <Image source={{ uri: SARAH_IMAGE }} style={styles.receiverAvatar} />
        <View style={styles.receiverMessageWrapper}>
          <View style={styles.receiverBubble}>
            <Text style={styles.receiverText}>{item.text}</Text>
          </View>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
  }

  if (item.type === 'sender') {
    return (
      <View style={styles.senderContainer}>
        <View style={styles.senderMessageWrapper}>
          {item.hasImage ? (
            <View style={styles.senderImageBubble}>
              <Image source={{ uri: TRAIL_IMAGE }} style={styles.messageImage} />
              <Text style={styles.senderText}>{item.text}</Text>
            </View>
          ) : (
            <View style={styles.senderBubble}>
              <Text style={styles.senderText}>{item.text}</Text>
            </View>
          )}
          <View style={styles.senderTimeContainer}>
            <Text style={styles.messageTime}>{item.time}</Text>
            {item.status === 'read' && <DoneAllIcon />}
          </View>
        </View>
      </View>
    );
  }

  return null;
};
const ChatMatchUser = () => {
  const renderItem = ({ item }) => <MessageItem item={item} />;
  
  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={{flexDirection:"row",gap:10}}>
        <TouchableOpacity style={styles.headerButton}>
          <ArrowBackIcon />
        </TouchableOpacity>
        
        <View style={styles.headerProfile}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: SARAH_IMAGE }} style={styles.avatar} />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sarah, 24</Text>
            <Text style={styles.profileStatus}>Active now</Text>
          </View>
        </View>
        </View>
        
        <TouchableOpacity style={styles.headerButton}>
          <MoreVertIcon />
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={MESSAGES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />

      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.inputButton}>
          <AddCircleIcon />
        </TouchableOpacity>
        
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#8c8b5f"
          />
          <TouchableOpacity style={styles.emojiButton}>
            <MoodIcon />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.sendButton}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,

  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#f8f8f5',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181811',
  },
  profileStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8c8b5f',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  systemMessageContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  systemMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  systemMessageText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8c8b5f',
  },
  timestampContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  timestampText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(140, 139, 95, 0.6)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 8,
  },
  receiverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  receiverMessageWrapper: {
    flexDirection: 'column',
    maxWidth: '75%',
  },
  receiverBubble: {
    backgroundColor: '#f0f0eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  receiverText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#181811',
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  senderMessageWrapper: {
    flexDirection: 'column',
    maxWidth: '75%',
    alignItems: 'flex-end',
  },
  senderBubble: {
    backgroundColor: '#f9f506',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderBottomRightRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  senderImageBubble: {
    backgroundColor: '#f9f506',
    borderRadius: 24,
    borderBottomRightRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
    padding: 4,
  },
  messageImage: {
    width: 192,
    height: 128,
    borderRadius: 16,
    marginBottom: 4,
  },
  senderText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#181811',
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 4,
  },
  senderTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  messageTime: {
    fontSize: 11,
    color: '#8c8b5f',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 24,
    paddingTop: 8,
    maxWidth: width,
    alignSelf: 'center',
    gap: 8,
  },
  inputButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: 48,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#181811',
    paddingVertical: 12,
  },
  emojiButton: {
    padding: 8,
    borderRadius: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f9f506',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ChatMatchUser;