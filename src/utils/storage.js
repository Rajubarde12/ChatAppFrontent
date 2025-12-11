import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();
export const setString=(key,value)=>{storage.set(key,value)}
export const getString=(key,value)=>{return storage.getString(key)}