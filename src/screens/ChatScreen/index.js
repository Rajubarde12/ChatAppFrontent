import { StyleSheet, View } from 'react-native';
import { colors } from '../../utils/colors.js';
import RenderHeader from './compoents/Header.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatMessages from './compoents/ChatMessages.js';
import ChatInput from './compoents/ChatInput.js';
import { useSelector } from 'react-redux';
import SocketService from '../../socket.js';
import { uploadFile } from '../../helper';
import { useEffect, useState } from 'react';
import api from '../../api/axiosClient.js';

const sampleMessages = [
  // --- NEWEST MESSAGE (Bottom of screen) ---
  {
    id: '1',
    text: 'Okay, sounds like a plan! 👍',
    time: '10:42 AM',
    senderId: 'me',
    status: 'pending', // Clock icon
    isNewDay: false,
  },
  {
    id: '2',
    text: 'I will send the documents in a bit.',
    time: '10:41 AM',
    senderId: 'me',
    status: 'sent', // Single Tick
    isNewDay: false,
  },
  {
    id: '3',
    text: 'That works for me.',
    time: '10:40 AM',
    senderId: 'user2',
    status: '', // Received messages don't need status
    isNewDay: false,
  },
  {
    id: '4',
    text: 'What do you think about meeting at 5 PM?',
    time: '10:38 AM',
    senderId: 'user2',
    status: '',
    isNewDay: false,
  },
  {
    id: '5',
    text: 'Here is the photo I was talking about. We hiked for about 4 hours to get to this spot! 🏔️',
    time: '10:35 AM',
    senderId: 'me',
    status: 'delivered', // Double Grey Tick
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isNewDay: false,
  },
  {
    id: '6',
    text: 'Wow! That view is stunning.',
    time: '10:32 AM',
    senderId: 'user2',
    status: '',
    isNewDay: false,
  },
  // --- LOGIC: The message BELOW this one (in the UI) starts "Today",
  // so this specific message object gets the 'isNewDay' flag.
  {
    id: '7',
    text: 'Hey! Are you free today?',
    time: '09:15 AM',
    senderId: 'user2',
    status: '',
    isNewDay: true,
    dateHeader: 'Today',
  },

  // --- YESTERDAY'S MESSAGES ---
  {
    id: '8',
    text: 'Great, talk to you then.',
    time: '8:45 PM',
    senderId: 'me',
    status: 'read', // Blue Double Tick
    isNewDay: false,
  },
  {
    id: '9',
    text: 'I can call you tomorrow morning.',
    time: '8:44 PM',
    senderId: 'user2',
    status: '',
    isNewDay: false,
  },
  {
    id: '10',
    text: 'No worries at all.',
    time: '8:43 PM',
    senderId: 'me',
    status: 'read',
    isNewDay: false,
  },
  {
    id: '11',
    text: 'Sorry I missed your call!',
    time: '8:42 PM',
    senderId: 'user2',
    status: '',
    isNewDay: true,
    dateHeader: 'Yesterday',
  },
];

const ChatScreen = ({ route }) => {
  const { userProfile } = useSelector(state => state.app);
  const currentUserId = userProfile?.id;
  const { user } = route.params || {};
  const receiverId = user?.id;
  const [messages, setMessages] = useState([]);
  const getChatBetweenUsers = async () => {
    try {
      const respose = await api.get(`/users/chats/get/${receiverId}`);
      if (respose.data.status) {
        setMessages(respose.data.messages);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getChatBetweenUsers();
  }, [receiverId]);
  const handleMessageSent = msg => {
    console.log('✅ message sent event:', msg);
    setMessages(prev => [...prev, msg]);
  };
  const handleReciveMessage = msg => {
    setMessages(prev => [...prev, msg]);
    SocketService.updateSenderToMessageRead(receiverId);
  };
   const handleReadIds = (ids) => {
      console.log('🔁 read ids:', ids);
      setMessages(prev =>
        prev.map(p => (ids.includes(p.id) ? { ...p, isRead: true } : p)),
      );
    };


  useEffect(() => {
    SocketService.onMessageSent(handleMessageSent);
    SocketService.onReceiveMessage(handleReciveMessage);
    SocketService.onGetReadMessagesId(handleReadIds)

    return () => {
      SocketService.offMessageSent(handleMessageSent);
      SocketService.offReceiveMessage(handleReciveMessage);
       SocketService.offGetReadMessagesId(handleReadIds)
    };
  }, []);

  const handleChatSend = async message => {
    let file = '';
    if (false) {
      const files = await uploadFile('chat', attachments, { tk: 12 });
      file = files?.fileUrl;
    }
    SocketService.sendMessage({
      receiverId: receiverId || '',
      message: message || '',
      messageType: 'text',
      attachments: file ? [file] : null,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <RenderHeader user={user} />

        <ChatMessages messages={messages} currentUserId={currentUserId} />
        <ChatInput onSendMessage={handleChatSend} />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
});
export default ChatScreen;
