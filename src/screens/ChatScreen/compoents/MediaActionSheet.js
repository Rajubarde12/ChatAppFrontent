import React, { memo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from 'react-native';
import {
  DocumentIcon,
  CameraIcon,
  GalleryIcon,
  AudioIcon,
  LocationIcon,
  ContactIcon,
} from './SvgIconsPlaceholder';
import { colors } from '../../../utils/colors';
import {
  pickDocument,
  openCamera,
  openGallery,
  pickAudio,
  pickLocation,
  pickContact,
} from '../helper/mediaActions';

const mediaActions = {
  document: pickDocument,
  camera: openCamera,
  gallery: openGallery,
  audio: pickAudio,
  location: pickLocation,
  contact: pickContact,
};

const mediaOptions = [
  { icon: DocumentIcon, label: 'Document', key: 'document', color: '#8F3CDC' },
  { icon: CameraIcon, label: 'Camera', key: 'camera', color: '#D3396D' },
  { icon: GalleryIcon, label: 'Gallery', key: 'gallery', color: '#3DA7F5' },
  { icon: AudioIcon, label: 'Audio', key: 'audio', color: '#078C7E' },
  { icon: LocationIcon, label: 'Location', key: 'location', color: '#E5AF2A' },
  { icon: ContactIcon, label: 'Contact', key: 'contact', color: '#5A8DEE' },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MediaActionSheet = ({ isVisible, onClose, onMedifiles = () => {} }) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 25,
        stiffness: 150,
        mass: 0.5,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const onSelectMedia = async key => {
    const result = await mediaActions[key]();
    if (['document', 'gallery', 'audio', 'camera'].includes(key) && result) {
      onClose()
      onMedifiles(result);
    }
  };

  if (!isVisible) return null;

  return (
    <Pressable
      onPress={() => {onClose()}}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        borderWidth: 1,
      
      }}
    >
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.actionSheetContainer}>
          <View style={styles.gridContainer}>
            {mediaOptions.map(option => (
              <TouchableOpacity
                key={option.key}
                style={styles.optionButton}
                onPress={() => onSelectMedia(option.key)}
              >
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: option.color + '33' /* 20% opacity */ },
                  ]}
                >
                  <option.icon color={option.color} />
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default memo(MediaActionSheet);

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: 'flex-end',
    backgroundColor: colors.backgroundDark,
    height: 230,
  },
  sheet: {
    width: '100%',
    position: 'absolute',
    bottom: 90,
  },
  actionSheetContainer: {
    backgroundColor: '#0b141a',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  optionButton: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 12,
    color: colors.neutral[400],
    textAlign: 'center',
    fontWeight: '500',
  },
});
