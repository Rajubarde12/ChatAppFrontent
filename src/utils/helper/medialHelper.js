import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

/**
 * Normalize media picked from camera, gallery, document, or audio
 * Converts content:// URIs to file:// on Android
 */
export const normalizeMedia = async (media) => {
  if (!media || !media?.file) return null;

  let { file, type } = media||{};
  let uri = file?.uri || file?.originalPath || file?.filePath;
  if (uri.startsWith('content://')) {
    try {
      const destPath = `${RNFS.TemporaryDirectoryPath}/${file?.name ||  file?.fileName||`tmp_${Date.now()}`}`;
      await RNFS.copyFile(uri, destPath);
      uri = 'file://' + destPath;
    } catch (err) {
      console.log('Failed to convert content URI', err);
      return null;
    }
  }

  return {
    name: file?.name || file?.fileName || `file_${Date.now()}`,
    type:  file.type || file.mimeType || 'application/octet-stream',
    size: file.size || file.fileSize || 0,
    uri,
  };
};
