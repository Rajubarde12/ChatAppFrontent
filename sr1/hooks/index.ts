// useChatSocket.ts
import { useEffect } from "react";
import {
  getSocket,
  onReceiveMessage,
  offReceiveMessage,
  onMessageSent,
  offMessageSent,
  onGetReadMessagesId,
  offGetReadMessagesId,
  onUserStatusChanged,
  offUserStatusChanged,
  updateSenderToMessageRead,
} from "../utils/socket"; // adjust path to your socket.ts

interface UseChatSocketProps {
  receiverId: string;
  focused: boolean;
  onNewMessage: (msg: any) => void;
  onMessageSentAck?: (msg: any) => void;
  onMessagesRead?: (ids: number[]) => void;
  onUserStatus?: (status: any) => void;
}

export const useChatSocket = ({
  receiverId,
  focused,
  onNewMessage,
  onMessageSentAck,
  onMessagesRead,
  onUserStatus,
}: UseChatSocketProps) => {
  useEffect(() => {
    let socket;
    try {
      socket = getSocket();
    } catch {
      console.warn("⚠️ Socket not initialized yet");
      return;
    }

    if (!socket.connected) {
      console.log("⏳ Waiting for socket connection...");
      socket.connect();
    }

    console.log("🟢 Setting up socket listeners for receiver:", receiverId);

    // ✅ handle new incoming messages
    const handleNewMessage = (msg: any) => {
      console.log("💬 New message received:", msg);
      if (msg.senderId === receiverId) {
        onNewMessage(msg);
        updateSenderToMessageRead(receiverId);
      }
    };

    // ✅ handle ack when current user sends message
    const handleMessageSent = (msg: any) => {
      console.log("📤 Message sent ack:", msg);
      onMessageSentAck?.(msg);
    };

    // ✅ handle message read updates
    const handleReadMessages = (ids: number[]) => {
      console.log("📖 Messages marked as read:", ids);
      onMessagesRead?.(ids);
    };

    // ✅ handle user online/offline
    const handleUserStatus = (status: any) => {
      console.log("🟠 User status changed:", status);
      if (status.userId === receiverId) {
        onUserStatus?.(status);
      }
    };

    // 🧷 attach listeners
    onReceiveMessage(handleNewMessage);
    onMessageSent(handleMessageSent);
    onGetReadMessagesId(handleReadMessages);
    onUserStatusChanged(handleUserStatus);

    // ✅ update read messages when chat screen opens
    if (focused) {
      updateSenderToMessageRead(receiverId);
    }

    // 🧹 cleanup on unmount or dependency change
    return () => {
      console.log("🧹 Cleaning up socket listeners for", receiverId);
      offReceiveMessage(handleNewMessage);
      offMessageSent(handleMessageSent);
      offGetReadMessagesId(handleReadMessages);
      offUserStatusChanged(handleUserStatus);
    };
  }, [receiverId, focused]);
};
