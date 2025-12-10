import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';

interface ImageDisplayProps {
  imageUrl: string;
  altText?: string;
  style?: any;
  onError?: (error: any) => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  imageUrl,
  altText = 'Image',
  style,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = (error: any) => {
    console.error('Image load error:', error);
    setLoading(false);
    setError(true);
    if (onError) {
      onError(error);
    }
  };

  const openImageModal = () => {
    if (!error) {
      setModalVisible(true);
    }
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  if (error) {
    return (
      <View style={[styles.errorContainer, style]}>
        <Text style={styles.errorText}>Failed to load image</Text>
        <TouchableOpacity
          onPress={() => {
            setError(false);
            setLoading(true);
          }}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={openImageModal}
        style={[styles.imageContainer, style]}
        activeOpacity={0.8}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#1E40AF" />
            <Text style={styles.loadingText}>Loading image...</Text>
          </View>
        )}
        
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
          resizeMode="cover"
        />
        
        <View style={styles.imageOverlay}>
          <Text style={styles.tapToViewText}>Tap to view full size</Text>
        </View>
      </TouchableOpacity>

      {/* Full Screen Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeImageModal}
            activeOpacity={1}
          >
            <View style={styles.modalContent}>
              <ScrollView
                maximumZoomScale={3}
                minimumZoomScale={1}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
              </ScrollView>
              
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={closeImageModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tapToViewText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  errorContainer: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: screenWidth,
    height: screenHeight,
  },
  modalHeader: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageDisplay;
