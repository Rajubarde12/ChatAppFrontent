import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Initialize socket connection
export const initSocket = (token: string, baseUrl: string) => {
  if (!socket) {
    socket = io(baseUrl, {
      auth: { token },
      transports: ["websocket"], // important for React Native
    });

    socket.on("connect", () => {
      console.log("⚡ Connected to socket:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  }
  return socket;
};

// Emit message to backend
export const sendMessage = (data: {
  chatId: string;
  receiverId: string;
  message: string;
  messageType?: string;
}) => {
  if (!socket) throw new Error("Socket not initialized");
  socket.emit("sendMessage", data);
};

// Listen for incoming messages
export const onReceiveMessage = (callback: (msg: any) => void) => {
  if (!socket) throw new Error("Socket not initialized");
  socket.on("newMessage", callback);
};

// Listen for ack of sent messages
export const onMessageSent = (callback: (msg: any) => void) => {
  if (!socket) throw new Error("Socket not initialized");
  socket.on("messageSent", callback);
};

// Remove listeners (for cleanup)
export const offReceiveMessage = () => {
  if (!socket) return;
  socket.off("newMessage");
};

export const offMessageSent = () => {
  if (!socket) return;
  socket.off("messageSent");
};

// Get raw socket instance if needed
export const getSocket = () => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};
