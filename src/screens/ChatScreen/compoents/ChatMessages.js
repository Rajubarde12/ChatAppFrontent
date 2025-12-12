import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { colors } from '../../../utils/colors';
import { formatMessageTime } from '../../../utils/timeFormattor';
import { preprocessMessages } from '../helper';
import { mainUrl } from '../../../constants';
import Video from 'react-native-video';
import AttachmentBubble from './AttachmentBuuble';
import { StatusIcon } from './StatusIcon';

const DateSeparator = ({ date }) => (
  <View style={styles.dateSeparator}>
    <Text style={styles.dateLabel}>{date}</Text>
  </View>
);

const ChatMessages = ({ messages: rawMessages, currentUserId }) => {
  const messages = useMemo(() => {
    if (!rawMessages || rawMessages.length === 0) return [];
    return preprocessMessages(rawMessages);
  }, [rawMessages]);
  const renderItem = ({ item, index }) => {
    const isMe = item.senderId === currentUserId;
    const isNextFromSameUser = messages[index + 1]?.senderId === item.senderId;
    const isPrevFromSameUser = messages[index - 1]?.senderId === item.senderId;

    return (
      <View
        style={{
          marginTop:
            item?.messageType !== 'text' && item?.attachments?.length > 0
              ? 10
              : 0,
        }}
      >
        {item.isNewDay && <DateSeparator date={item.dateHeader} />}

        <View
          style={[
            styles.messageContainer,
            isMe ? styles.rightAlign : styles.leftAlign,
            isNextFromSameUser ? { marginBottom: 2 } : { marginBottom: 10 },
          ]}
        >
          {item?.messageType !== 'text' && item?.attachments?.length > 0 ? (
            <AttachmentBubble isMe={isMe} message={item} onPress={() => {}} />
          ) : (
            <View
              style={[
                styles.bubble,
                isMe ? styles.myBubble : styles.otherBubble,
                // Corner rounding logic for grouped messages
                isMe && isNextFromSameUser && { borderTopRightRadius: 4 },
                isMe && isPrevFromSameUser && { borderBottomRightRadius: 4 },
                !isMe && isNextFromSameUser && { borderTopLeftRadius: 4 },
                !isMe && isPrevFromSameUser && { borderBottomLeftRadius: 4 },
              ]}
            >
              {item.messageType == 'image' && (
                <Image
                  source={{ uri: `${mainUrl}/${item.attachments[0]}` }}
                  style={styles.messageImage}
                />
              )}
              {item.messageType == 'video' && (
                <Video
                  paused
                  source={{ uri: `${mainUrl}/${item.attachments[0]}` }}
                  style={styles.messageImage}
                />
              )}

              <View style={styles.contentRow}>
                <Text
                  style={[
                    styles.messageText,
                    isMe ? { color: '#000' } : { color: '#e9edef' },
                  ]}
                >
                  {item?.message}
                </Text>

                {/* Time & SVG Status */}
                <View style={styles.metaContainer}>
                  <Text
                    style={[
                      styles.timeText,
                      isMe ? { color: '#e9edef' } : { color: '#8696a0' },
                    ]}
                  >
                    {formatMessageTime(item?.createdAt)}
                  </Text>
                  {isMe && (
                    <View style={{ marginLeft: 4, marginBottom: -2 }}>
                      <StatusIcon
                        status={
                          item?.isRead
                            ? 'read'
                            : item?.isDelivered
                            ? 'delivered'
                            : item?.pending
                            ? ''
                            : 'sent'
                        }
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.backgroundImage} resizeMode="cover">
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 10 }}
        inverted
      />
    </View>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#0b141a', // WhatsApp Dark Mode BG color fallback
  },
  dateSeparator: {
    alignSelf: 'center',
    backgroundColor: '#1f2c34', // Dark grey bubble for date
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 15,
    marginBottom: 20,
  },
  dateLabel: {
    color: '#8696a0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  leftAlign: {
    justifyContent: 'flex-start',
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    minWidth: 85,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 9,
    elevation: 1,
  },
  myBubble: {
    backgroundColor: colors.bubleColor, // WhatsApp Dark Green
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#202c33', // WhatsApp Dark Grey
    borderTopLeftRadius: 0,
  },
  messageImage: {
    width: 220,
    height: 160,
    borderRadius: 8,
    marginBottom: 4,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  contentRow: {
    // This allows text to wrap, but if there's space, time sits on the same line
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', // Pushes content to end
  },
  messageText: {
    fontSize: 15,
    marginRight: 8, // Space between text and time
    marginBottom: 4,
    lineHeight: 20,
    flexGrow: 1,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2, // Slight adjustment for bottom alignment
    marginLeft: 'auto', // Ensures time sticks to the right
  },
  timeText: {
    fontSize: 11,
    marginRight: 2,
  },
});
