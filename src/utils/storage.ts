import { Alert } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { User } from 'src/app/features/auth/authSlice';

// Create MMKV storage instance
export const storage = new MMKV();

export const setToken = (token: string) => storage.set('token', token);
export const getToken = () => storage.getString('token');
export const removeToken = () => storage.delete('token');
export const setUserId = (userId: string) =>{
  Alert.alert('is',userId)
  storage.set('userId', userId.toString());
}
export const getUserId = () => storage.getString('userId');
export const removeUserId = () => storage.delete('userId');

export const clearStorage = () => storage.clearAll();
export const setAuth = (token: string, user: User) => {
  storage.set('token', token);
  storage.set('userId', JSON.stringify(user));
};

export const getAuth = () => {
  const token = storage.getString('token');
  const userIdStr = storage.getString('userId');
  const userId = userIdStr ?? null;
  return { token, userId };
};
export const removeAuth = () => {
  storage.delete('token');
  storage.delete('userId');
}