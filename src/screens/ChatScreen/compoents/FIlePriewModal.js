import React, { useState } from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';

import { SendIcon } from './SvgIconsPlaceholder';
import { FileIcon } from './FileTypeIcons'; // Import the FileIcon component
import { SafeAreaView } from 'react-native-safe-area-context';
import BackArrowe from '../../../assets/BackIcon';
import BackArrowIcon from '../icons/BackArrowIcon';
import { colors } from '../../../utils/colors';

const FilePreviewModal = ({
  visible,
  file,
  onClose,
  onSend,
  loading = false,
}) => {
  const [caption, setCaption] = useState('');

  if (!file) return null;

  const isImage = file.type?.startsWith('image/');
  const isVideo = file.type?.startsWith('video/');
  const isPdf = file.type?.includes('pdf');
  const isOtherFile = !isImage && !isVideo && !isPdf;

  // Get file extension for display
  const getFileExtension = () => {
    if (file.fileName) {
      const parts = file.fileName.split('.');
      return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
    }
    return 'FILE';
  };

  // Get file size for display
  const getFileSize = () => {
    if (file.size) {
      const sizeInKB = file.size / 1024;
      if (sizeInKB < 1024) {
        return `${sizeInKB.toFixed(1)} KB`;
      }
      return `${(sizeInKB / 1024).toFixed(1)} MB`;
    }
    return 'Unknown size';
  };

  const handleSend = () => {
    onSend(caption.trim());
    setCaption('');
  
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={()=>{onClose()}}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000', }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.mediaContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <BackArrowIcon />
            </TouchableOpacity>

            {isImage && (
              <Image
                source={{ uri: file.uri }}
                resizeMode="contain"
                style={styles.fullMedia}
              />
            )}

            {isVideo && (
              <Video
                source={{ uri: file.uri }}
                style={styles.fullMedia}
                controls
                resizeMode="contain"
              />
            )}

            {isPdf && (
              <View style={styles.otherFileContainer}>
                <View style={styles.fileIconContainer}>
                  <FileIcon type={file.type || file.name} size={120} />
                </View>
                <Text style={styles.fileName} numberOfLines={2}>
                  {file.fileName || 'File'}
                </Text>
                <View style={styles.fileInfoContainer}>
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileType}>{getFileExtension()}</Text>
                    <Text style={styles.fileSize}>{getFileSize()}</Text>
                  </View>
                </View>
              </View>
            )}

            {isOtherFile && (
              <View style={styles.otherFileContainer}>
                <View style={styles.fileIconContainer}>
                  <FileIcon type={file.type || file.fileName} size={120} />
                </View>

                <View style={styles.fileInfoContainer}>
                  <Text style={styles.fileName} numberOfLines={2}>
                    {file.fileName || 'File'}
                  </Text>

                  <View style={styles.fileDetails}>
                    <Text style={styles.fileType}>{getFileExtension()}</Text>
                    <Text style={styles.fileSize}>{getFileSize()}</Text>
                  </View>

                  <Text style={styles.filePreviewText}>
                    No preview available
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.inputBar}>
            <TextInput
              style={styles.captionInput}
              value={caption}
              onChangeText={setCaption}
              placeholder="Add a caption..."
              placeholderTextColor="#a0a0a0"
              multiline
              maxLength={250}
            />
            <TouchableOpacity disabled={loading} style={styles.sendButton} onPress={handleSend}>
              {!loading ? (
                <SendIcon color="#FFFFFF" />
              ) : (
                <ActivityIndicator size={'small'} color={'#fff'} />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default FilePreviewModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 5,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  fullMedia: {
    width: '100%',
    height: '100%',
  },
  fileBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filePreview: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  fileInfoOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  fileInfoText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 15,
    left: 10,
    zIndex: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'normal',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  captionInput: {
    flex: 1,
    paddingVertical: 20,
    minHeight: 50,
    maxHeight: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 8,
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  // Other file styles
  otherFileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  fileIconContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  fileInfoContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  fileName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
    textAlign: 'center',
    maxWidth: '90%',
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fileType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00a884',
    backgroundColor: 'rgba(0, 168, 132, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  fileSize: {
    fontSize: 16,
    color: '#aaa',
  },
  filePreviewText: {
    fontSize: 16,
    color: '#aaa',
    fontStyle: 'italic',
  },
});
