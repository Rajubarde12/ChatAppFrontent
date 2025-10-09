import { ChatMessage, MessageGroup } from '../types/chat';

export const groupMessages = (messages: ChatMessage[]): MessageGroup[] => {
  if (messages.length === 0) return [];

  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup | undefined;

  messages.forEach((message, index) => {
    // Ensure timestamp is a Date object
    const msgTimestamp = message.createdAt instanceof Date 
      ? message.createdAt 
      : new Date(message.createdAt);

    const isFirstMessage = index === 0;
    const isSameSender = currentGroup?.senderId === message.senderId;

    // Calculate time difference
    let timeDiff = 0;
    if (currentGroup) {
      const groupTimestamp = currentGroup.timestamp instanceof Date 
        ? currentGroup.timestamp 
        : new Date(currentGroup.timestamp);
      timeDiff = msgTimestamp.getTime() - groupTimestamp.getTime();
    }

    const isWithinTimeWindow = timeDiff < 5 * 60 * 1000; // 5 minutes

    if (isFirstMessage || !isSameSender || !isWithinTimeWindow) {
      currentGroup = {
        senderId: message.senderId,
        messages: [message],
        timestamp: msgTimestamp,
        isConsecutive: false,
      };
      groups.push(currentGroup);
    } else {
      // We know currentGroup exists here because of the conditions above
      currentGroup?.messages.push(message);
      currentGroup!.isConsecutive = true;
      currentGroup!.timestamp = msgTimestamp;
    }
  });

  return groups;
};

export const shouldShowAvatar = (group: MessageGroup, messageIndex: number): boolean => {
  return messageIndex === 0 || !group.isConsecutive;
};

export const shouldShowTimestamp = (group: MessageGroup, messageIndex: number): boolean => {
  const message = group.messages[messageIndex];
  const isLastMessage = messageIndex === group.messages.length - 1;
  
  // Ensure timestamp is a Date object
  const messageTimestamp = message.createdAt instanceof Date 
    ? message.createdAt 
    : new Date(message.createdAt);
  
  let timeDiff = 0;
  
  if (isLastMessage) {
    timeDiff = Date.now() - messageTimestamp.getTime();
  } else {
    const nextMessage = group.messages[messageIndex + 1];
    const nextMessageTimestamp = nextMessage.createdAt instanceof Date 
      ? nextMessage.createdAt 
      : new Date(nextMessage.createdAt);
    timeDiff = nextMessageTimestamp.getTime() - messageTimestamp.getTime();
  }
  
  return isLastMessage || timeDiff > 2 * 60 * 1000; // 2 minutes
};

export const formatMessageTime = (date: Date | string): string => {
  // Ensure we have a Date object
  const messageDate = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diff = now.getTime() - messageDate.getTime();
  
  // Less than 1 minute
  if (diff < 60 * 1000) {
    return 'Just now';
  }
  
  // Less than 1 hour
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}m ago`;
  }
  
  // Less than 24 hours
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}h ago`;
  }
  
  // More than 24 hours
  return messageDate.toLocaleDateString([], { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getMessageStatus = (message: ChatMessage): string => {
  // Handle different status property names that might exist
  const status = (message as any).status || (message as any).messageStatus;
  
  switch (status) {
    case 'sending':
      return 'Sending...';
    case 'sent':
      return 'Sent';
    case 'delivered':
      return 'Delivered';
    case 'read':
      return 'Read';
    case 'failed':
      return 'Failed to send';
    default:
      return message.isRead ? 'Read' : 'Delivered';
  }
};