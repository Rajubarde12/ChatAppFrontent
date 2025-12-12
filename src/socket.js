import { io } from 'socket.io-client';
import { getString } from './utils/storage';
import { mainUrl } from './constants';

class SocketService {
  socket = null;

  constructor() {
    const token = getString('token');
    if (token) {
      this.initSocket(token, mainUrl);
    } else {
      console.warn('⚠️ No token found. Socket not connected.');
    }
  }

  initSocket(token, baseUrl) {
    if (this.socket) return this.socket;

    this.socket = io(baseUrl, {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('⚡ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', reason => {
      console.warn('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', err => {
      console.error('Socket error:', err.message);
    });

    return this.socket;
  }

  destroySocket() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      console.log('🧹 Socket destroyed');
    }
  }

  sendMessage({
    receiverId = '',
    message = '',
    messageType = 'text',
    attachments = '',
  }) {
    if (!this.socket) return console.warn('Socket not initialized!');
    const data = { receiverId, message, messageType, attachments };
    this.socket.emit('sendMessage', data);
  }

  onReceiveMessage(callback = () => {}) {
    if (!this.socket) return;
    this.socket.on('newMessage', callback);
  }

  offReceiveMessage() {
    if (!this.socket) return;
    this.socket.off('newMessage');
  }

  onMessageSent(callback = () => {}) {
    if (!this.socket) return;
    this.socket.on('messageSent', callback);
  }

  offMessageSent() {
    if (!this.socket) return;
    this.socket.off('messageSent');
  }

  updateSenderToMessageRead = receiverId => {
    if (!this.socket) return;
    this.socket.emit('readMessage', { receiverId });
  };
  onGetReadMessagesId = (callback = () => {}) => {
    if (!this.socket) return;
    this.socket.on('readMessagesid', callback);
  };
  offGetReadMessagesId = (callback = () => {}) => {
    if (!this.socket) return;
    else this.socket.off('readMessagesid', callback);
  };

  onUserStatusChanged = (callback = () => {}) => {
    if (!this.socket) return;

    this.socket.on('userStatusChanged', callback);
  };

  offUserStatusChanged = (callback = () => {}) => {
    if (!this.socket) return;
    this.socket.off('userStatusChanged', callback);
  };
  onRefressUserList = (callback = () => {}) => {
    if (!this.socket) return;
    this.socket.on('refreshUserList', callback);
  };
  offRefressUserList = (callback = () => {}) => {
    if (!this.socket) return;
    this.socket.off('refreshUserList', callback);
  };
  userListOpened = () => {
    if (!this.socket) return;
    this.socket.emit('userListOpened');
  };

  userListClosed = () => {
    if (!this.socket) return;
    this.socket.emit('userListClosed');
  };
}

export default new SocketService();
