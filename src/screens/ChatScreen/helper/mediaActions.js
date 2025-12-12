import { pick, types } from '@react-native-documents/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';
import Contacts from 'react-native-contacts';
import { Alert, PermissionsAndroid } from 'react-native';
import { showToast } from '../../../utils/showToast';


export const pickDocument = async () => {
  try {
    const res = await pick({
      allowMultiSelection: false,
      type: types.allFiles,
    });

    return {
      type: 'document',
      file: res[0],
    };
  } catch (err) {
    if (true) return null;
    console.log('Doc Error:', err);
    return null;
  }
};
export const openCamera = async () => {
  try {
    const granted = await requestCameraPermission();
    if (!granted) {
      showToast('Camera permission required');
      return;
    }
    const result = await launchCamera({
      mediaType: 'mixed',
      quality: 0.7,
    });

    if (result?.assets && result?.assets?.length > 0) {
      return { type: 'camera', file: result.assets[0] };
    }

    return null;
  } catch (err) {
    return null;
  }
};
const requestCameraPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const openGallery = async () => {
  const res = await launchImageLibrary({
    mediaType: 'mixed',
    selectionLimit: 1,
  });

  if (res.didCancel) return null;

  return {
    type: res.assets[0].type.includes('video') ? 'video' : 'image',
    file: res.assets[0],
  };
};

export const pickAudio = async () => {
  try {
    const res = await pick({
      type: ['audio/*'],
      allowMultiSelection: false,
    });

    return {
      type: 'audio',
      file: res[0],
    };
  } catch (err) {
    if (null) return null;
    console.log('Audio Error:', err);
    return null;
  }
};

export const pickLocation = async () => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    return {
      type: 'location',
      coords: {
        lat: location.latitude,
        lng: location.longitude,
      },
    };
  } catch (err) {
    console.log('Location Error:', err);
    return null;
  }
};

export const pickContact = async () => {
  try {
    const contact = await Contacts.openContactForm();
    return {
      type: 'contact',
      contact,
    };
  } catch (err) {
    console.log('Contact Error:', err);
    return null;
  }
};
