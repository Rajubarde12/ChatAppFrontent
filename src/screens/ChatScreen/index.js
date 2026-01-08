import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { colors } from '../../utils/colors.js';
import RenderHeader from './compoents/Header.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatMessages from './compoents/ChatMessages.js';
import ChatInput from './compoents/ChatInput.js';
import { useSelector } from 'react-redux';
import { uploadFile } from '../../helper';
import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosClient.js';
import MediaActionSheet from './compoents/MediaActionSheet.js';
import { openCamera } from './helper/mediaActions.js';
import { normalizeMedia } from '../../utils/helper/medialHelper';
import FilePreviewModal from './compoents/FIlePriewModal.js';
import echo from '../../echo.js';

const ChatScreen = ({ route }) => {
  const { userProfile } = useSelector(state => state.app);
  const channelRef = useRef(null);
  const currentUserId = userProfile?.id;
  const { user } = route.params || {};
  const receiverId = user?.id??user?.receiver_id;
  console.log("this is user",user)

  const [messages, setMessages] = useState([]);
  const [isonLine, setIsOnline] = useState(null);
  const [medivisible, setMedivisible] = useState(false);
  const [attachments, setAtachments] = useState(null);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageLoagin, setMessageLoading] = useState(false);
 useEffect(() => {
    const fetchChatMessages = async () => {
      if (!user?.chat_id) return;

      setMessageLoading(true);
      try {
        const response = await api.get(`/user-chat-message?chat_id=${user.chat_id}`);
        if (response.data.status && response.data.data) {
          const normalizedMsgs = response.data.data.map(normalizeBackendMsg);
          setMessages(normalizedMsgs);
        }
      } catch (error) {
        console.log('❌ Fetch chat messages error:', error);
      } finally {
        setMessageLoading(false);
      }
    };

    fetchChatMessages();
  }, [user?.chat_id]);


  const createStaticMessage = ({ senderId, receiverId, message }) => ({
    id: Date.now(),
    senderId,
    receiverId,
    message,
    messageType: 'text',
    isRead: false,
    isDelivered: false,
    attachments: null,
    chatId: null,
    pending: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
const normalizeBackendMsg = backendMsg => {
  const safeDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date() : d; // agar invalid ho to current date use karo
  };

  return {
    id: backendMsg.id,
    senderId: backendMsg.sender_id,
    receiverId: backendMsg.receiver_id,
    message: backendMsg.message,
    messageType: backendMsg.message_type,
    attachments: backendMsg.attachment ? [backendMsg.attachment] : [],
    isRead: !!backendMsg.is_read,
    isDelivered: !!backendMsg.is_delivered,
    chatId: backendMsg.chat_id,
    createdAt: safeDate(backendMsg.created_at).toISOString(),
    updatedAt: safeDate(backendMsg.updated_at).toISOString(),
    pending: false,
  };
};



  // ✅ properly match and update pending message
const handleMessageSent = backendMsg => {
  const normalized = normalizeBackendMsg(backendMsg);
  setMessages(prev => {
    const foundIndex = prev.findIndex(
      m =>
        (m.pending && m.message.trim() === normalized.message.trim() && m.senderId === normalized.senderId) ||
        m.id === normalized.id
    );

    if (foundIndex === -1) return [...prev, normalized];

    const updated = [...prev];
    updated[foundIndex] = normalized;
    return updated;
  });
};


  useEffect(() => {
    //  if (channelRef.current) return;
  const channel = echo.channel('chat-channel');
   channelRef.current = channel;

  channel.subscribed(() => {
    console.log('📡 Subscribed to chat-channel');
  });

channel.listen('.message.sent', e => {
  const msg = e.data;
  if (msg.sender_id === currentUserId) return;
  console.log("exits",msg)
  let normalized=null
try{
   normalized = normalizeBackendMsg(msg);
}catch(err){
  Alert.alert('errr');
  console.log("exits1",err)
}
   console.log("exits",normalized)

  setMessages(prev => {
    const exists = prev.some(m => m.id === normalized?.id);
    console.log("exits",exists)
    if (exists) return prev;
    return [...prev, normalized];
  });
});

  channel.error(err => {
    console.log('❌ Channel error', err);
  });

  return () => {
    echo.leave('chat-channel');
  };
}, [receiverId, currentUserId]);

  // ✅ send message to API
const handleChatSend = async message => {
  try {
    const staticMsg = createStaticMessage({
      senderId: currentUserId,
      receiverId,
      message,
    });
    setMessages(prev => [...prev, staticMsg]);
    console.log("static message",staticMsg)

    const formData = new FormData();
    formData.append('receiver_id', receiverId);
    formData.append('message', message);
    if (attachments) {
      formData.append('attachment', {
        uri: attachments.uri,
        name: attachments.name,
        type: attachments.type,
      });
    }

    const response = await api.post('/send-message', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data?.data) {
        console.log("messafe send api respone ",response.data?.data)
      handleMessageSent(response.data.data);
    }
  } catch (error) {
    console.log('❌ Send message error', error);
  }
};
  console.log("this is messages",messages)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <RenderHeader isonLine={isonLine} user={user} />
        {messageLoagin ? (
          <View style={{ paddingTop: '70%', backgroundColor: '#0b141a' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : null}

        <ChatMessages messages={messages} currentUserId={currentUserId} />

        {medivisible && (
          <MediaActionSheet
            onMedifiles={async file => {
              const normlizedFile = await normalizeMedia(file);
              if (normlizedFile)
                setAtachments({
                  name: normlizedFile?.name,
                  type: normlizedFile?.type,
                  uri: normlizedFile?.uri,
                });
              setSize(file?.file?.size);
            }}
            onClose={() => setMedivisible(false)}
            isVisible={medivisible}
          />
        )}

        <ChatInput
          onSendMedia={() => setMedivisible(prev => !prev)}
          onSendMessage={handleChatSend}
          onCameraClick={async () => {
            setMedivisible(false);
            const file = await openCamera();
            const normlizedFile = await normalizeMedia(file);
            if (normlizedFile)
              setAtachments({
                name: normlizedFile?.name,
                type: normlizedFile?.type,
                uri: normlizedFile?.uri,
              });
            setSize(file?.file?.size);
          }}
        />

        <FilePreviewModal
          loading={loading}
          onClose={() => setAtachments(null)}
          visible={!!attachments?.uri}
          onSend={handleChatSend}
          file={{ size, ...attachments }}
        />
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
