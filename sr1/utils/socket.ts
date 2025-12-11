// socket.ts
import { io, Socket } from "socket.io-client";
import { ChatMessage } from "src/types/chat";
import { IUser } from "src/types/user";

export interface UserStatusType {
  userId: string;
  isActive: boolean;
  lastLogin?: string | Date;
}

let socket: Socket | null = null;
export interface messageNotificationType{
  newMessage:ChatMessage,
  User:IUser
}

/**
 * Initialize socket once (global singleton)
 */
export const initSocket = (token: string, baseUrl: string): Socket => {
  if (socket) return socket; // prevent re-initialization

  socket = io(baseUrl, {
    auth: { token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("⚡ Socket connected:", socket?.id);
  });

  socket.on("disconnect", reason => {
    console.warn("Socket disconnected:", reason);
  });

  socket.on("connect_error", err => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

/**
 * Get socket instance (after initialization)
 */
export const getSocket = (): Socket => {
  if (!socket) throw new Error("Socket not initialized. Call initSocket() first.");
  return socket;
};

/**
 * Clear and disconnect socket (optional logout)
 */
export const destroySocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};

/**
 * Emit / on / off wrappers
 */
export const sendMessage = (data: {
  receiverId: string;
  message: string;
  messageType?: string;
  attachments:any[]|null
}) => {
  const s = getSocket();
  s.emit("sendMessage", data);
};

export const onReceiveMessage = (callback: (msg: any) => void) => {
  const s = getSocket();
  s.off("newMessage", callback);
  s.on("newMessage", callback);
};

export const offReceiveMessage = (callback?: (msg: any) => void) => {
  const s = getSocket();
  if (callback) s.off("newMessage", callback);
  else s.off("newMessage");
};

export const onMessageSent = (callback: (msg: any) => void) => {
  const s = getSocket();
  s.off("messageSent", callback);
  s.on("messageSent", callback);
};

export const offMessageSent = (callback?: (msg: any) => void) => {
  const s = getSocket();
  if (callback) s.off("messageSent", callback);
  else s.off("messageSent");
};

export const updateSenderToMessageRead = (receiverId: string) => {
  const s = getSocket();
  s.emit("readMessage", { receiverId });
};

export const onGetReadMessagesId = (callback: (data: number[]) => void) => {
  const s = getSocket();
  s.off("readMessagesid", callback);
  s.on("readMessagesid", callback);
};

export const offGetReadMessagesId = (callback?: (data: number[]) => void) => {
  const s = getSocket();
  if (callback) s.off("readMessagesid", callback);
  else s.off("readMessagesid");
};

export const onUserStatusChanged = (callback: (data: UserStatusType) => void) => {
  const s = getSocket();
  s.off("userStatusChanged", callback);
  s.on("userStatusChanged", callback);
};

export const offUserStatusChanged = (callback?: (data: UserStatusType) => void) => {
  const s = getSocket();
  if (callback) s.off("userStatusChanged", callback);
  else s.off("userStatusChanged");
};
export const onSocketNotification=(callBack?:(data:messageNotificationType)=>void)=>{
  const s=getSocket()
  if(callBack) s.on("pushNotification",callBack)
    else s.off('pushNotification')
}

export const offSocketNotification = (callback?: (data: UserStatusType) => void) => {
  const s = getSocket();
  if (callback) s.off("pushNotification", callback);
  else s.off("pushNotification");
};