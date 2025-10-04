import { MMKV } from "react-native-mmkv";

// Create MMKV storage instance
export const storage = new MMKV();

export const setToken = (token: string) => storage.set("token", token);
export const getToken = () => storage.getString("token");
export const removeToken = () => storage.delete("token");
export const setUserId = (userId: string) => storage.set("userId", userId);
export const getUserId = () => storage.getString("userId");
export const removeUserId = () => storage.delete("userId");

export const clearStorage = () => storage.clearAll();