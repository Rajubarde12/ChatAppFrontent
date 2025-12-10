import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  isRegistered: boolean;
  lastSeen?: string;
  avatar?: string;
}

interface Chat {
  id: string;
  contactId: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const ContactsChatScreen = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');

  // Simulate loading contacts and chats
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockContacts: Contact[] = [
        {
          id: '1',
          name: 'John Doe',
          phoneNumber: '+1 234 567 8900',
          isRegistered: true,
          lastSeen: '2 hours ago',
          avatar: 'https://via.placeholder.com/60',
        },
        {
          id: '2',
          name: 'Jane Smith',
          phoneNumber: '+1 234 567 8901',
          isRegistered: true,
          lastSeen: 'online',
          avatar: 'https://via.placeholder.com/60',
        },
        {
          id: '3',
          name: '+1 234 567 8902',
          phoneNumber: '+1 234 567 8902',
          isRegistered: false,
          avatar: 'https://via.placeholder.com/60',
        },
        {
          id: '4',
          name: 'Mike Johnson',
          phoneNumber: '+1 234 567 8903',
          isRegistered: true,
          lastSeen: '5 minutes ago',
          avatar: 'https://via.placeholder.com/60',
        },
        {
          id: '5',
          name: '+1 234 567 8904',
          phoneNumber: '+1 234 567 8904',
          isRegistered: false,
          avatar: 'https://via.placeholder.com/60',
        },
        {
          id: '6',
          name: 'Sarah Wilson',
          phoneNumber: '+1 234 567 8905',
          isRegistered: true,
          lastSeen: 'yesterday',
          avatar: 'https://via.placeholder.com/60',
        },
      ];

      const mockChats: Chat[] = [
        {
          id: '1',
          contactId: '1',
          lastMessage: 'Hey there! How are you doing?',
          timestamp: '10:30 AM',
          unreadCount: 2,
        },
        {
          id: '2',
          contactId: '2',
          lastMessage: 'See you tomorrow!',
          timestamp: '9:15 AM',
          unreadCount: 0,
        },
        {
          id: '3',
          contactId: '4',
          lastMessage: 'Thanks for your help!',
          timestamp: 'Yesterday',
          unreadCount: 1,
        },
        {
          id: '4',
          contactId: '6',
          lastMessage: 'Did you see the new update?',
          timestamp: '12/15/23',
          unreadCount: 0,
        },
      ];

      setContacts(mockContacts);
      setChats(mockChats);
      setIsLoading(false);
    }, 1500);
  };

  const getContactById = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };

  const handleInviteContact = (contact: Contact) => {
    Alert.alert(
      'Invite to WhatsApp',
      `Invite ${contact.name} to join WhatsApp?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Invite',
          onPress: () => sendInvite(contact),
        },
      ]
    );
  };

  const sendInvite = (contact: Contact) => {
    // Simulate sending invite
    Alert.alert('Invite Sent', `Invitation sent to ${contact.phoneNumber}`);
  };

  const handleStartChat = (contact: Contact) => {
    if (contact.isRegistered) {
      navigation.navigate('Chat', { contact });
    } else {
      handleInviteContact(contact);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber.includes(searchQuery)
  );

  const filteredChats = chats.filter(chat => {
    const contact = getContactById(chat.contactId);
    return contact && (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.includes(searchQuery)
    );
  });

  const renderChatItem = ({ item }: { item: Chat }) => {
    const contact = getContactById(item.contactId);
    if (!contact) return null;

    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => handleStartChat(contact)}
      >
        <Image source={{ uri: contact.avatar }} style={styles.avatar} />
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          <View style={styles.chatFooter}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContactItem = ({ item }: { item: Contact }) => {
    return (
      <TouchableOpacity 
        style={styles.contactItem}
        onPress={() => handleStartChat(item)}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.contactContent}>
          <Text style={styles.contactName}>{item.name}</Text>
          <View style={styles.contactStatus}>
            {item.isRegistered ? (
              <Text style={styles.registeredText}>
                {item.lastSeen ? `Last seen ${item.lastSeen}` : 'WhatsApp user'}
              </Text>
            ) : (
              <View style={styles.inviteContainer}>
                <Text style={styles.notRegisteredText}>Not on WhatsApp</Text>
                <TouchableOpacity 
                  style={styles.inviteButton}
                  onPress={() => handleInviteContact(item)}
                >
                  <Text style={styles.inviteButtonText}>Invite</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25d366" />
          <Text style={styles.loadingText}>Loading contacts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            {/* <Icon name="camera-alt" size={24} color="rgba(255,255,255,0.8)" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* <Icon name="search" size={24} color="rgba(255,255,255,0.8)" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* <Icon name="more-vert" size={24} color="rgba(255,255,255,0.8)" /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* <Icon name="search" size={20} color="rgba(255,255,255,0.6)" /> */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'chats' && styles.activeTab]}
          onPress={() => setActiveTab('chats')}
        >
          <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>
            CHATS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
          onPress={() => setActiveTab('contacts')}
        >
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>
            CONTACTS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'chats' ? (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {/* <Icon name="chat" size={60} color="rgba(255,255,255,0.3)" /> */}
              <Text style={styles.emptyText}>No chats yet</Text>
              <Text style={styles.emptySubtext}>Start a conversation with your contacts</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.contactsHeader}>
              <Text style={styles.contactsCount}>
                {filteredContacts.length} contacts
              </Text>
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        {/* <Icon name="chat" size={24} color="#fff" /> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2c34',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1f2c34',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 4,
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 16,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2c34',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#25d366',
  },
  tabText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#25d366',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  chatContent: {
    flex: 1,
    marginLeft: 16,
  },
  contactContent: {
    flex: 1,
    marginLeft: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  timestamp: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#25d366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contactStatus: {
    marginTop: 4,
  },
  registeredText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  notRegisteredText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
  },
  inviteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteButton: {
    backgroundColor: 'rgba(37, 211, 102, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  inviteButtonText: {
    color: '#25d366',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    marginTop: 16,
  },
  emptySubtext: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  contactsHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  contactsCount: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25d366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default ContactsChatScreen;