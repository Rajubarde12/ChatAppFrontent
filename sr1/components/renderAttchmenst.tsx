import Contstants from '@utils/Contstants';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatMessage, ChatTheme } from 'src/types/chat';

const RenderAttachments = ({
  message,
  isUser,
  theme,
}: {
  message: ChatMessage;
  isUser: boolean;
  theme: ChatTheme;
}) => {
  if (!message.attachments?.length) return null;
  return (
    <View style={styles.attachments}>
      {message.attachments.map((uri1, index) => {
        const uri = `${Contstants.MediaUrl}/${uri1}`;
        const isImage =
          message.messageType === 'image' ||
          /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(uri);
        const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(uri);
        const isAudio =
          message.messageType === 'audio' ||
          /\.(mp3|wav|m4a|aac|ogg)$/i.test(uri);

        // Common container style for all attachments
        const attachmentContainerStyle = [
          styles.attachmentContainer,
          {
            backgroundColor: isUser
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(0,0,0,0.05)',
            borderColor: isUser ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
          },
        ];

        if (isImage) {
          return (
            <View
              key={`${message.id}-attachment-${index}`}
              style={attachmentContainerStyle}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => console.log('Image pressed:', uri)}
                style={styles.imageTouchable}
              >
                <Image
                  source={{ uri }}
                  style={styles.attachmentImage}
                  resizeMode="cover"
                />
                {/* Image overlay with icon */}
                <View style={styles.imageOverlay}>
                  <Text style={styles.overlayIcon}>🔍</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        } else if (isVideo) {
          return (
            <View
              key={`${message.id}-attachment-${index}`}
              style={attachmentContainerStyle}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => console.log('Video pressed:', uri)}
                style={styles.videoTouchable}
              >
                {/* Video thumbnail placeholder */}
                <View style={styles.videoThumbnail}>
                  <View style={styles.videoPlayButton}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                  <Text
                    style={[
                      styles.videoText,
                      { color: isUser ? 'rgba(255,255,255,0.9)' : '#333' },
                    ]}
                  >
                    Video
                  </Text>
                </View>

                {/* Video info bar */}
                <View
                  style={[
                    styles.videoInfo,
                    {
                      backgroundColor: isUser
                        ? 'rgba(0,0,0,0.3)'
                        : 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.videoDuration,
                      { color: isUser ? '#fff' : '#666' },
                    ]}
                  >
                    🎥 2:30
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        } else if (isAudio) {
          return (
            <View
              key={`${message.id}-attachment-${index}`}
              style={[attachmentContainerStyle, styles.audioAttachment]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => console.log('Audio pressed:', uri)}
                style={styles.audioTouchable}
              >
                {/* Audio player UI */}
                <View style={styles.audioPlayer}>
                  <View style={styles.audioIconContainer}>
                    <Text style={styles.audioIcon}>🎵</Text>
                  </View>

                  <View style={styles.audioInfo}>
                    <Text
                      style={[
                        styles.audioTitle,
                        { color: isUser ? '#fff' : '#000' },
                      ]}
                    >
                      Audio Message
                    </Text>
                    <View style={styles.audioControls}>
                      <Text
                        style={[
                          styles.audioDuration,
                          { color: isUser ? 'rgba(255,255,255,0.7)' : '#666' },
                        ]}
                      >
                        1:45
                      </Text>
                      <View style={styles.audioWaveform}>
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.waveBar,
                              {
                                backgroundColor: isUser ? '#fff' : '#666',
                                height: Math.random() * 20 + 8,
                              },
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.playButton}>
                    <Text
                      style={[
                        styles.playButtonText,
                        {
                          color: isUser
                            ? theme.colors.userBubble
                            : theme.colors.primary,
                        },
                      ]}
                    >
                      ▶
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          );
        } else {
          // File attachment
          return (
            <View
              key={`${message.id}-attachment-${index}`}
              style={[attachmentContainerStyle, styles.fileAttachment]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => console.log('Open file:', uri)}
                style={styles.fileTouchable}
              >
                <View style={styles.fileIconContainer}>
                  <Text style={styles.fileIcon}>📄</Text>
                </View>

                <View style={styles.fileInfo}>
                  <Text
                    style={[
                      styles.fileName,
                      { color: isUser ? '#fff' : '#000' },
                    ]}
                  >
                    document.pdf
                  </Text>
                  <Text
                    style={[
                      styles.fileSize,
                      { color: isUser ? 'rgba(255,255,255,0.7)' : '#666' },
                    ]}
                  >
                    2.4 MB
                  </Text>
                </View>

                <View style={styles.downloadButton}>
                  <Text
                    style={[
                      styles.downloadIcon,
                      { color: isUser ? '#fff' : theme.colors.primary },
                    ]}
                  >
                    ⬇
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  attachments: {
    marginTop: 8,
    gap: 8,
  },
  attachmentContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },

  // Image Styles
  imageTouchable: {
    position: 'relative',
  },
  attachmentImage: {
    width: 240,
    height: 160,
  },
  imageOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    padding: 6,
  },
  overlayIcon: {
    fontSize: 12,
    color: '#fff',
  },

  // Video Styles
  videoTouchable: {
    position: 'relative',
  },
  videoThumbnail: {
    width: 240,
    height: 135,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  videoPlayButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playIcon: {
    fontSize: 16,
    marginLeft: 3,
  },
  videoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  videoDuration: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Audio Styles
  audioAttachment: {
    minWidth: 280,
  },
  audioTouchable: {
    padding: 12,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  audioIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioIcon: {
    fontSize: 18,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  audioDuration: {
    fontSize: 12,
    minWidth: 30,
  },
  audioWaveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 20,
  },
  waveBar: {
    width: 3,
    borderRadius: 1.5,
  },
  playButton: {
    padding: 8,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // File Styles
  fileAttachment: {
    minWidth: 260,
  },
  fileTouchable: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 20,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
  },
  downloadButton: {
    padding: 8,
  },
  downloadIcon: {
    fontSize: 16,
  },
});

export default RenderAttachments;
