export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  messageType: 'text' | 'image' | 'file' | 'audio';
  attachments?: string[];
  isRead: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'; // Optional status field
  isDelivered:boolean
}

export interface MessageGroup {
  senderId: number;
  messages: ChatMessage[];
  timestamp: Date | string;
  isConsecutive: boolean;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  name: string;
  size?: number;
  mimeType?: string;
}


export interface ChatTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    userBubble: string;
    aiBubble: string;
    userText: string;
    aiText: string;
    link: string;
    error: string;
    success: string;
    warning: string;
  };
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface MessageAction {
  id: string;
  label: string;
  icon: string;
  action: (message: ChatMessage) => void;
  color?: string;
}

export interface TypingIndicator {
  isTyping: boolean;
  text?: string;
  dots?: number;
}
