import { launchImageLibrary } from 'react-native-image-picker';
import { pick, types,errorCodes } from '@react-native-documents/picker';
import { showToast } from '@components/CustomToast';
export const pickAttachment = async (type: 'image' | 'video' | 'file') => {
  try {
    if (type === 'image' || type === 'video') {
      const result = await launchImageLibrary({
        mediaType: type === 'image' ? 'photo' : 'video',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) return null;
      if (result.errorMessage) throw new Error(result.errorMessage);

      const asset = result.assets?.[0];
      if (!asset) return null;

      return {
        uri: asset.uri,
        name: asset.fileName || 'media',
        type: asset.type || (type === 'image' ? 'image/jpeg' : 'video/mp4'),
        size: asset.fileSize || 0,
      };
    } else {
      // 📄 For documents
      const result = await pick({
        type: [types.allFiles],
        allowMultiSelection: false,
      });
      const res = result[0];
      if (res.error) {
        showToast(res.error);
        return;
      }
      return {
        uri: res.uri,
        name: res.name,
        type: res.type || 'application/octet-stream',
        size: res.size || 0,
      };
    }
  } catch (err: any) {
    if (errorCodes) {
      console.log('User cancelled document picker');
      return null;
    } else {
      console.error('Attachment picker error:', err);
      return null;
    }
  }
};
