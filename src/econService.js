import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import echo from './src/echo';

const AUTH_USER_ID = 19;

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    echo.connect();

    const pusher = echo.connector.pusher;

    pusher.connection.bind('connected', () => {
      console.log('✅ Echo connected');
    });

    pusher.connection.bind('disconnected', () => {
      console.log('❌ Echo disconnected');
    });

    pusher.connection.bind('error', (err) => {
      console.log('⚠️ Echo error', err);
    });

    return () => {
      pusher.connection.unbind_all();
    };
  }, []);

  // 🔹 Private Chat Listener
  useEffect(() => {
    const channel = echo.private(`chat.${AUTH_USER_ID}`);

    channel.subscribed(() => {
      console.log('📡 Subscribed to private chat');
    });

    channel.listen('.message.sent', (event) => {
      console.log('📩 New Message:', event);
      setMessages(prev => [...prev, event]);
    });

    channel.error((err) => {
      console.log('❌ Channel error', err);
    });

    return () => {
      echo.leave(`private-chat.${AUTH_USER_ID}`);
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {messages.map((msg, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold',color:'black' }}>
            From: {msg.senderId}
          </Text>
          <Text style={{color:'black'}}>{msg.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
