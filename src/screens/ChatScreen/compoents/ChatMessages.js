import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import Svg, { Path, Circle, Polyline } from 'react-native-svg'; // Import SVG components
import { colors } from '../../../utils/colors';
import { formatMessageTime } from '../../../utils/timeFormattor';
import { preprocessMessages } from '../helper';

// --- SVG Icon Components ---

const SingleTickIcon = ({ color = '#fff', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="20 6 9 17 4 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DoubleTickIcon = ({ color = '#fff', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* First Tick */}
    <Polyline
      points="20 6 9 17 4 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Second Tick (Offset) */}
    <Polyline
      points="20 6 9 17 4 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(5, -5)" // Moves the second tick slightly up-right
      opacity={0.8}
    />
  </Svg>
);

const ClockIcon = ({ color = '#fff', size = 14 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10" />
    <Polyline points="12 6 12 12 16 14" />
  </Svg>
);

// --- Helper Components ---

const DateSeparator = ({ date }) => (
  <View style={styles.dateSeparator}>
    <Text style={styles.dateLabel}>{date}</Text>
  </View>
);

const StatusIcon = ({ status }) => {
  if (status === 'read') {
    return <DoubleTickIcon color="#34B7F1" size={16} />;
  }

  if (status === 'delivered') {
    return <DoubleTickIcon color={colors.neutral[400] || '#ccc'} size={16} />;
  }

  if (status === 'sent') {
    return <SingleTickIcon color={colors.neutral[400] || '#ccc'} size={16} />;
  }
  return <ClockIcon color={colors.neutral[400] || '#ccc'} size={12} />;
};



const ChatMessages = ({ messages:rawMessages, currentUserId }) => {

  const messages = useMemo(() => {
    if (!rawMessages || rawMessages.length === 0) return [];
    return preprocessMessages(rawMessages);
  }, [rawMessages]);
  const renderItem = ({ item, index }) => {
    const isMe = item.senderId === currentUserId;
    const isNextFromSameUser = messages[index + 1]?.senderId === item.senderId;
    const isPrevFromSameUser = messages[index - 1]?.senderId === item.senderId;

    return (
      <View>
        {item.isNewDay && <DateSeparator date={item.dateHeader} />}

        <View
          style={[
            styles.messageContainer,
            isMe ? styles.rightAlign : styles.leftAlign,
            isNextFromSameUser ? { marginBottom: 2 } : { marginBottom: 10 },
          ]}
        >
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
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
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
                          : 'sent'
                      }
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
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
        inverted // WhatsApp default: Scroll from bottom
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
    backgroundColor: colors.primary, // WhatsApp Dark Green
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
