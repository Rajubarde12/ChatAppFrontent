import { formatMessageTime } from '../../../utils/timeFormattor';
// You'll need a utility to format dates for the header, e.g., 'Yesterday', 'Dec 11, 2025'

/**
 * Pre-processes raw message data for display in a FlatList.
 * @param {Array<Object>} rawMessages - The unsorted or raw messages array.
 * @returns {Array<Object>} The processed, sorted, and formatted messages array.
 */
export const preprocessMessages = (rawMessages) => {

  const sortedMessages = [...rawMessages].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });


  const processedMessages = sortedMessages.map((message, index) => {
    const nextMessage = sortedMessages[index + 1];
    const prevMessage = sortedMessages[index - 1];


    const isNextFromSameUser = nextMessage
      ? nextMessage.senderId === message.senderId
      : false;
    

    const isNextInvertedFromSameUser = prevMessage
        ? prevMessage.senderId === message.senderId
        : false;


    let isNewDay = false;
    let dateHeader = null;
    const currentMessageDate = new Date(message.createdAt).toDateString();

    if (!prevMessage) {

      isNewDay = true;
      dateHeader = formatDateForHeader(message.createdAt); 
    } else {
      const prevMessageDate = new Date(prevMessage.createdAt).toDateString();
      if (currentMessageDate !== prevMessageDate) {
        isNewDay = true;
        dateHeader = formatDateForHeader(message.createdAt); 
      }
    }

    return {
      ...message,
    
      isNextFromSameUser: isNextInvertedFromSameUser, 
      isPrevFromSameUser: isNextFromSameUser, 
      
      isNewDay,
      dateHeader,
    };
  });
  
  
  return processedMessages.reverse();
};


const formatDateForHeader = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};