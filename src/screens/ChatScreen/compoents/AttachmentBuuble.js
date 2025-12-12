import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { mainUrl } from '../../../constants';
import { colors } from '../../../utils/colors';
import { formatMessageTime } from '../../../utils/timeFormattor';
import { SingleTickIcon, DoubleTickIcon, ClockIcon } from './SvgIcons';
import { FileIcon } from './FileTypeIcons';

// --- 1. Helper: Status Icon (Kept same) ---
const StatusIcon = ({ status, isMe }) => {
  const iconColor = isMe ? '#000' : colors.neutral[400]; // Status in media is usually white, but outside should be bubble-based.

  if (status === 'read') {
    return <DoubleTickIcon color="#34B7F1" size={16} />;
  }
  if (status === 'delivered') {
    return <DoubleTickIcon color={iconColor} size={16} />;
  }
  if (status === 'sent') {
    return <SingleTickIcon color={iconColor} size={16} />;
  }
  return <ClockIcon color={iconColor} size={12} />;
};

// --- 2. Helper: Time and Status Render ---
const RenderTimeAndStatus = ({ message, isMe, isMedia }) => {
  const { createdAt, isRead, isDelivered } = message;
  const timeColor = isMedia
    ? 'rgba(255,255,255,0.8)'
    : isMe
    ? '#666'
    : 'rgba(255,255,255,0.6)';
  const statusColor = isMedia
    ? '#fff'
    : isMe
    ? '#666'
    : 'rgba(255,255,255,0.6)';
  const metaStyle = isMedia
    ? attachmentStyles.mediaMetaContainer
    : attachmentStyles.documentMetaContainer;

  return (
    <View style={metaStyle}>
      <Text style={[attachmentStyles.timeText, { color: timeColor }]}>
        {formatMessageTime(createdAt)}
      </Text>
      {isMe && (
        <View style={{ marginLeft: 4, marginBottom: -2 }}>
          <StatusIcon
            status={isRead ? 'read' : isDelivered ? 'delivered' : 'sent'}
            isMe={isMe}
          />
        </View>
      )}
    </View>
  );
};

const MediaContent = ({
  message,
  isMe,
  attachmentUrl,
  onPress,
  isVideo,
  paused,
}) => {
  const mediaElement = isVideo ? (
    <Video
      source={{ uri: attachmentUrl }}
      style={attachmentStyles.media}
      resizeMode="cover"
      paused={paused}
      muted={true}
      repeat={true}
    />
  ) : (
    <Image
      source={{ uri: attachmentUrl }}
      style={attachmentStyles.media}
      resizeMode="cover"
    />
  );

  const PlayOrZoomIcon = isVideo ? PlayIcon : ZoomIcon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={attachmentStyles.mediaContainer}
    >
      {mediaElement}

      <View style={attachmentStyles.mediaOverlay}>
        <PlayOrZoomIcon />
        {isVideo && !paused && (
          <View style={attachmentStyles.playingIndicator}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </View>

      

      {message?.message ? (
        <View style={attachmentStyles.captionWrapper}>
          <Text
            style={[
              attachmentStyles.captionText,
              isMe
                ? attachmentStyles.myCaptionText
                : attachmentStyles.otherCaptionText,
            ]}
          >
            {message.message}
          </Text>
        </View>
      ) : null}
      <View style={attachmentStyles.mediaTimeOverlay}>
        <RenderTimeAndStatus message={message} isMe={isMe} isMedia={true} />
      </View>
    </TouchableOpacity>
  );
};

const DocumentContent = ({ message, isMe, onPress, filename, fileExt }) => (
  <View style={attachmentStyles.documentWrapper}>
    <TouchableOpacity
      onPress={onPress}
      style={attachmentStyles.documentInnerContainer}
      activeOpacity={0.8}
    >
      <FileIcon type={fileExt || 'file'} size={40} />
      <View style={attachmentStyles.documentInfo}>
        <Text
          style={[
            attachmentStyles.documentTitle,
            isMe
              ? attachmentStyles.myDocumentTitle
              : attachmentStyles.otherDocumentTitle,
          ]}
          numberOfLines={1}
        >
          {filename || 'Document'}
        </Text>
        <Text
          style={[
            attachmentStyles.documentSubtitle,
            isMe
              ? attachmentStyles.myDocumentSubtitle
              : attachmentStyles.otherDocumentSubtitle,
          ]}
        >
          {fileExt?.toUpperCase() || 'FILE'} • Tap to open
        </Text>
      </View>
      <DownloadIcon />
    </TouchableOpacity>

    {message.text ? (
      <Text
        style={[
          attachmentStyles.captionText,
          isMe
            ? attachmentStyles.myCaptionText
            : attachmentStyles.otherCaptionText,
          { paddingHorizontal: 12 },
        ]}
      >
        {message.text}
      </Text>
    ) : null}

    <View style={attachmentStyles.documentMetaContainer}>
      <RenderTimeAndStatus message={message} isMe={isMe} isMedia={false} />
    </View>
  </View>
);

// --- 5. Main AttachmentBubble Component ---
const AttachmentBubble = ({ isMe, message, onPress, paused = true }) => {
  const { attachments, messageType, text } = message;

  const attachment = attachments?.[0];
  const attachmentUrl = attachment ? `${mainUrl}/${attachment}` : null;
  const filename = attachment ? attachment.split('/').pop() : null;
  const fileExt = filename?.split('.').pop()?.toLowerCase();

  const isImageVideo = messageType === 'image' || messageType === 'video';
  const isDocument = messageType === 'file' || messageType === 'document';

  const bubbleStyle = isMe
    ? attachmentStyles.myBubble
    : attachmentStyles.otherBubble;
  const contentStyle = isImageVideo
    ? attachmentStyles.mediaContentContainer
    : attachmentStyles.documentContentContainer;

  const renderContent = () => {
    if (isImageVideo) {
      return (
        <MediaContent
          message={message}
          isMe={isMe}
          attachmentUrl={attachmentUrl}
          onPress={onPress}
          isVideo={messageType === 'video'}
          paused={paused}
        />
      );
    }

    if (isDocument) {
      return (
        <DocumentContent
          message={message}
          isMe={isMe}
          onPress={onPress}
          filename={filename}
          fileExt={fileExt}
        />
      );
    }

    // Fallback or Audio
    return (
      <Text style={{ padding: 10, color: isMe ? '#000' : '#fff' }}>
        Unsupported Attachment Type ({messageType})
      </Text>
    );
  };

  return (
    <View style={[attachmentStyles.container, bubbleStyle, contentStyle]}>
      {renderContent()}
    </View>
  );
};

export default AttachmentBubble;
const PlayIcon = () => (
  <View style={attachmentStyles.playIcon}>
    <View style={attachmentStyles.playIconInner}>
      <View style={attachmentStyles.playTriangle} />
    </View>
  </View>
);

const ZoomIcon = () => (
  <View style={attachmentStyles.playIcon}>
    <View style={attachmentStyles.playIconInner}>
      <View style={attachmentStyles.zoomIcon}>
        <View style={attachmentStyles.zoomLine1} />
        <View style={attachmentStyles.zoomLine2} />
      </View>
    </View>
  </View>
);

const DownloadIcon = () => (
  <View style={attachmentStyles.downloadIcon}>
    <View style={attachmentStyles.downloadArrow} />
  </View>
);

const attachmentStyles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    minWidth: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  myBubble: {
    backgroundColor: colors.bubleColor || '#D9FDD3',
  },
  otherBubble: {
    backgroundColor: '#202c33',
  },

  mediaContentContainer: {
    padding: 0,
    minWidth: 220,
    borderRadius: 12,
  },

  documentContentContainer: {
    padding: 0, // Padding handled by the inner wrapper
  },

  mediaContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  media: {
    width: 260, 
    height: 180,
  },
  mediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)', // Subtle overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaTimeOverlay: {
     alignSelf:'flex-end',
     marginRight:10,
     marginBottom:5
  },
  playIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconInner: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#fff',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  zoomIcon: {
    // Reused for image preview (tap to zoom)
    width: 20,
    height: 20,
    position: 'relative',
  },
  zoomLine1: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: '#fff',
    top: 9,
    left: 4,
  },
  zoomLine2: {
    position: 'absolute',
    width: 2,
    height: 12,
    backgroundColor: '#fff',
    top: 4,
    left: 9,
  },
  playingIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 10,
  },

  documentWrapper: {
    height: 100,
    width: Dimensions.get('window').width * 0.65,
    backgroundColor: '#ccc',
  },
  documentInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  myDocumentTitle: {
    color: '#000',
  },
  otherDocumentTitle: {
    color: '#fff',
  },
  documentSubtitle: {
    fontSize: 12,
  },
  myDocumentSubtitle: {
    color: '#666',
  },
  otherDocumentSubtitle: {
    color: '#ccc',
  },
  downloadIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)', // Subtle dark background
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  downloadArrow: {
    // Simple down arrow
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 6,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderTopColor: '#666',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },

  // --- 3. Caption and Meta Styles (Shared) ---
  captionWrapper: {
    width: '80%',
    paddingVertical: 4,


  },
  captionText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    marginVertical: 1,

    marginLeft:5,


  },
  myCaptionText: {
    color: '#000',
  },
  otherCaptionText: {
    color: '#fff',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mediaMetaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  documentMetaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 4,
    paddingTop: 4,
    alignSelf: 'flex-end',
  },
  timeText: {
    fontSize: 11,
    marginRight: 2,
  },
});
