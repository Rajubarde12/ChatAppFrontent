import { ChatMessage } from "./chat";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  lastMessage: ChatMessage;
  unreadCount: number;
}