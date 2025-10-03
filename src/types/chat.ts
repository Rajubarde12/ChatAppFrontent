export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'failed';
  isTyping?: boolean;
  reactions?: MessageReaction[];
  replyTo?: string; // ID of message being replied to
  attachments?: MessageAttachment[];
  metadata?: {
    model?: string;
    tokens?: number;
    processingTime?: number;
  };
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

export interface MessageGroup {
  sender: 'user' | 'ai';
  messages: ChatMessage[];
  timestamp: Date;
  isConsecutive: boolean;
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
