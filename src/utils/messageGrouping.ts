import { ChatMessage, MessageGroup } from '../types/chat';

export const groupMessages = (messages: ChatMessage[]): MessageGroup[] => {
  if (messages.length === 0) return [];

  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup;

  messages.forEach((message, index) => {
    const msgTimestamp = message.timestamp instanceof Date
      ? message.timestamp
      : new Date(message.timestamp);
  
    const isFirstMessage = index === 0;
    const isSameSender = currentGroup?.sender === message.sender;
  
    const groupTimestamp = currentGroup
      ? currentGroup.timestamp instanceof Date
        ? currentGroup.timestamp
        : new Date(currentGroup.timestamp)
      : null;
  
    const timeDiff = groupTimestamp ? msgTimestamp.getTime() - groupTimestamp.getTime() : 0;
    const isWithinTimeWindow = timeDiff < 5 * 60 * 1000;
  
    if (isFirstMessage || !isSameSender || !isWithinTimeWindow) {
      currentGroup = {
        sender: message.sender,
        messages: [message],
        timestamp: msgTimestamp,
        isConsecutive: false,
      };
      groups.push(currentGroup);
    } else {
      currentGroup.messages.push(message);
      currentGroup.isConsecutive = true;
      currentGroup.timestamp = msgTimestamp; // update group's timestamp
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
  const timeDiff = isLastMessage 
    ? Date.now() - message.timestamp.getTime()
    : group.messages[messageIndex + 1].timestamp.getTime() - message.timestamp.getTime();
  
  return isLastMessage || timeDiff > 2 * 60 * 1000; // 2 minutes
};

export const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
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
  return date.toLocaleDateString([], { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getMessageStatus = (message: ChatMessage): string => {
  switch (message.status) {
    case 'sending':
      return 'Sending...';
    case 'sent':
      return 'Sent';
    case 'delivered':
      return 'Delivered';
    case 'failed':
      return 'Failed to send';
    default:
      return '';
  }
};
