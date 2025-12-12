import { ActivityIndicator, StyleSheet, View } from 'react-native';
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
import MediaActionSheet from './compoents/MediaActionSheet.js';
import { openCamera } from './helper/mediaActions.js';
import { normalizeMedia } from '../../utils/helper/medialHelper';
import FilePreviewModal from './compoents/FIlePriewModal.js';

const ChatScreen = ({ route }) => {
  const { userProfile } = useSelector(state => state.app);
  const [isonLine, setIsOnline] = useState(null);
  const currentUserId = userProfile?.id;
  const { user } = route.params || {};
  const receiverId = user?.id;
  const [messages, setMessages] = useState([]);
  const [medivisible, setMedivisible] = useState(false);
  const [attachments, setAtachments] = useState(null);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageLoagin, setMessageLoading] = useState(false);
  const getChatBetweenUsers = async () => {
    try {
      setMessageLoading(true);
      const respose = await api.get(`/users/chats/get/${receiverId}`);
      if (respose.data.status) {
        setMessages(respose.data.messages);
      }
    } catch (error) {
    } finally {
      setMessageLoading(false);
    }
  };
  const getUserStatus = async () => {
    try {
      const respose = await api.get(`/users/userStatus/${receiverId}`);
      if (respose.data.status) {
        setIsOnline(respose.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getChatBetweenUsers();
    getUserStatus();
  }, [receiverId]);
  // const handleMessageSent = msg => {
  //   console.log("mees",msg)
  //   setMessages(prev => [...prev, msg]);
  // };
  const handleMessageSent = backendMsg => {
    setMessages(prev =>
      prev.map(m =>
        m.pending &&
        m.senderId === backendMsg.senderId &&
        m.message === backendMsg.message
          ? { ...backendMsg, pending: false }
          : m,
      ),
    );
  };
  const handleReciveMessage = msg => {
      if (msg.senderId !== receiverId) {
        return
      }
    setMessages(prev => [...prev, msg]);
    SocketService.updateSenderToMessageRead(receiverId);
  };
  const handleReadIds = ids => {
    if (!ids) return;
    setMessages(prev =>
      prev.map(p => (ids?.includes(p?.id) ? { ...p, isRead: true } : p)),
    );
  };

  const handleUserStatus = data => {
    if (!data) return;
    if (data?.userId === receiverId) {
      if (data?.undeliveredIds?.length > 0) {
        setMessages(prev =>
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
  useEffect(() => {
    SocketService.onMessageSent(handleMessageSent);
    SocketService.onReceiveMessage(handleReciveMessage);
    SocketService.onGetReadMessagesId(handleReadIds);
    SocketService.onUserStatusChanged(handleUserStatus);
    SocketService.updateSenderToMessageRead(receiverId);
    return () => {
      SocketService.offMessageSent(handleMessageSent);
      SocketService.offReceiveMessage(handleReciveMessage);
      SocketService.offGetReadMessagesId(handleReadIds);
      SocketService.offUserStatusChanged(handleUserStatus);
    };
  }, []);

  const createStaticMessage = ({ senderId, receiverId, message }) => {
    return {
      id: Date.now(), // unique & stable ID
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
    };
  };

  const handleChatSend = async message => {
    try {
      const msg = createStaticMessage({
        senderId: currentUserId,
        receiverId: receiverId,
        message,
      });
  
      setMessages(prev => [...prev, msg]);

      setLoading(true);

      let file = '';
      let messageType = ' ';

      if (attachments) {
        const files = await uploadFile('chat', attachments, { tk: 12 });
        file = files?.fileUrl;
      }
      if (attachments?.type?.startsWith('image/')) {
        messageType = 'image';
      } else if (attachments?.type?.startsWith('video/')) {
        messageType = 'video';
      } else {
        messageType = 'file';
      }

      SocketService.sendMessage({
        receiverId: receiverId || '',
        message: message || '',
        messageType: attachments ? messageType : 'text',
        attachments: file ? [file] : null,
      });
      setAtachments(null);
    } catch (error) {
      console.log('this is erroro', error?.respose || 'sososo');

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <RenderHeader isonLine={isonLine} user={user} />
        {messageLoagin ? (
          <View style={{ paddingTop: '70%', backgroundColor: '#0b141a' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : null}
        <ChatMessages
          medivisible={medivisible}
          messages={messages}
          currentUserId={currentUserId}
        />

        {medivisible ? (
          <MediaActionSheet
            onMedifiles={async file => {
              const normlizedFile = await normalizeMedia(file);
              console.log('file', normlizedFile);
              if (normlizedFile)
                setAtachments({
                  name: normlizedFile?.name,
                  type: normlizedFile?.type,
                  uri: normlizedFile?.uri,
                });
              setSize(file?.file?.size);
            }}
            onClose={() => {
              setMedivisible(false);
            }}
            isVisible={medivisible}
          />
        ) : null}
        <ChatInput
          onSendMedia={() => {
            setMedivisible(prev => !prev);
          }}
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
          onClose={() => {
            setAtachments(null);
          }}
          visible={attachments?.uri ? true : false}
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
