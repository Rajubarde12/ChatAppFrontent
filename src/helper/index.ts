import axios from 'axios';
import { getString } from '../utils/storage';
import { UploadUrl } from '../constants';


interface FileObject {
  uri: string;
  type: string;
  name: string;
}

export const uploadFile = async (
  endPoint: string,
  file: FileObject,
  extraData: Record<string, any> = {},
) => {
  try {
    const token = getString('token');
    const formData = new FormData();

   
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    } as any);

    // ✅ Append any extra fields if provided
    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(
      `${UploadUrl}/${endPoint}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    // Let the caller handle errors
    throw error;
  }
};
