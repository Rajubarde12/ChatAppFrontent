import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AttachmentPreview = ({
  attachment,
  onRemove,
}: {
  attachment: { uri: string; name: string; type: string } | null;
  onRemove: () => void;
}) => {
  if (!attachment) return null;

  const isImage = attachment.type?.includes('image');
  const isVideo = attachment.type?.includes('video');
 

  return (
    <View style={styles.card}>
      {/* Thumbnail */}
      {isImage ? (
        <Image source={{ uri: attachment.uri }} style={styles.thumbnail} />
      ) : (
        <View
          style={[
            styles.thumbnail,
            {
              backgroundColor: isVideo ? '#E3F2FD' : '#FFF3E0',
            },
          ]}>
          <Text style={styles.icon}>{isVideo ? '🎬' : '📄'}</Text>
        </View>
      )}

      {/* File Info */}
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.fileName}>
          {attachment.name || 'Unnamed file'}
        </Text>
        <Text style={styles.fileType}>
          {isImage ? 'Image' : isVideo ? 'Video' : 'Document'}
        </Text>
      </View>

      {/* Remove Button */}
      <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
        <Text style={styles.removeText}>✖️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttachmentPreview;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 55,
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 26,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  fileType: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  removeBtn: {
    marginLeft: 10,
    padding: 6,
  },
  removeText: {
    fontSize: 16,
    color: '#E53935',
  },
});
