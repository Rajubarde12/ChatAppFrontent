import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Svg, { Path, Rect, Circle, LinearGradient, Stop, Defs } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const ArrowBackIcon = ({ size = 24, color = '#1e293b' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      fill={color}
    />
  </Svg>
);

const FavoriteIcon = ({ size = 20, color = '#64748b', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={filled ? '#f9f506' : color}
      fillOpacity={filled ? 1 : 0}
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

const DiversityIcon = ({ size = 20, color = '#64748b', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"
      fill={filled ? '#f9f506' : 'none'}
      stroke={color}
      strokeWidth={1.5}
    />
    <Circle
      cx="9"
      cy="7"
      r="4"
      fill={filled ? '#f9f506' : 'none'}
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M15 11c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.08-1.34.23C14.5 4.17 15 5.03 15 6s-.5 1.83-1.34 2.77c.43.15.87.23 1.34.23z"
      fill={filled ? '#f9f506' : 'none'}
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M9 11c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
      fill={filled ? '#f9f506' : 'none'}
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

const AddPhotoIcon = ({ size = 24, color = '#a1a1aa' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 5h3V4h2v1h3v2h-3v1H7V7H4V5z"
      fill={color}
    />
    <Path
      d="M19 5h-3V4h-2v1h-3v2h3v1h2V7h3V5z"
      fill={color}
    />
    <Path
      d="M4 19h16V9H4v10zm16-14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h4.18C8.6 3.84 9.7 3 11 3s2.4.84 2.82 2H20z"
      fill={color}
    />
    <Path
      d="M12 16c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
      fill={color}
    />
  </Svg>
);

const RECEIVED_LIKES = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    occupation: 'Designer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTNIjCHYDDwe6tSik0yRDKENz7AkqtnwnZrWgyRDjvEUAsUlP-rs_jcXaLeaiGFnNXg3uSmINCBAUkk1NestcvUneKHoSr-OmYiiQNt-xPvnLpSxXMLqU7D6ifYjsH8tAz-UH82HHSDPV9O4UBOeixE99-Kw4kpfTcBhdVv0Zutvt1xdurfJRk7qiHRwQ8op5Xy8G_aEaFQ9NnqbJ0rL3pV11wojJQBOfWj4vZKgN22UfjWIfVdtXHdqDC5CTVpVKMzsBUdli2Yaz9',
    isNew: true,
  },
  {
    id: '2',
    name: 'Jessica',
    age: 22,
    occupation: 'Student',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-dQZ7qm0OI3GF4IDvlLK3n3WNmuaUOyL02sV7kYhvbixp721iv0jOpP6iSecBrD1Un9aQUBgLPp6vxiYSevnIBVbfODgHiGhBxw__6uyRC3nkf0j1rKn0t6jJxDYQlzKivp5LHqMnGW1jZvFMVxp-0ayz13M3vOk1O50pMXVHj3UolInLOc3vsLZUMl4-9OiiCUd8w-lYY46pEd216VCTxF55jb9BqHStl1lCP8FSDEZN8vmjM0S6OAElDzIcqH7JMGF6zsR-HyBP',
    isNew: false,
  },
  {
    id: '3',
    name: 'Emily',
    age: 25,
    occupation: 'Artist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZL6mpb66GSaIW6rOvKRU6hmeQ6lsRBi8YbJz9Tv0sUQqxevRCSAsr2j3TybMQ23Ac6TodBeAUQBNcYml3eT6e4KD-p_tJyq4UwCk-RbcFqZhZRHe-hA-vkfMLzHMbW3XQbDybaVy9bs6tBRtaPYdj3uU7v5uL27DnEVRBjDkwm54AcTPsb0ho25qxU2kngUeyj2CepoWHT8KLxY1DA016YFZ1LI7lahmZvq5tAnd4KjVnYNjEUGPfbj71Oxm9Rv0-IiwbgUca3q7s',
    isNew: false,
  },
];

// Dummy data for sent likes (You Liked)
const SENT_LIKES = [
  {
    id: 's1',
    name: 'Alex',
    age: 26,
    occupation: 'Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop',
    isNew: false,
  },
  {
    id: 's2',
    name: 'Michael',
    age: 28,
    occupation: 'Photographer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w-400&h=533&fit=crop',
    isNew: false,
  },
  {
    id: 's3',
    name: 'David',
    age: 24,
    occupation: 'Musician',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop',
    isNew: false,
  },
  {
    id: 's4',
    name: 'James',
    age: 27,
    occupation: 'Teacher',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop',
    isNew: false,
  },
  {
    id: 's5',
    name: 'Robert',
    age: 29,
    occupation: 'Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop',
    isNew: false,
  },
  {
    id: 's6',
    name: 'John',
    age: 25,
    occupation: 'Developer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop',
    isNew: false,
  },
];

// Stats Cards Component
const StatsCard = ({ title, count, icon, isHighlighted }) => (
  <View style={[
    styles.statsCard,
    isHighlighted && styles.highlightedCard,
  ]}>
    {isHighlighted && (
      <View style={styles.highlightCircle} />
    )}
    <View style={styles.statsHeader}>
      {icon}
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
    <Text style={[
      styles.statsCount,
      isHighlighted && styles.highlightedCount,
    ]}>
      {count}
    </Text>
  </View>
);

// Tab Button Component
const TabButton = ({ label, count, isActive, onPress }) => (
  <TouchableOpacity
    style={styles.tabButton}
    onPress={onPress}
  >
    <View style={[
      styles.tabBackground,
      isActive && styles.activeTabBackground,
    ]} />
    <Text style={[
      styles.tabLabel,
      isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
    ]}>
      {label}
      {count !== undefined && (
        <Text style={styles.tabCount}> ({count})</Text>
      )}
    </Text>
  </TouchableOpacity>
);


const ProfileCard = ({ profile, isTeaser = false }) => {
  if (isTeaser) {
    return (
      <View style={styles.teaserCard}>
        <View style={styles.teaserIcon}>
          <AddPhotoIcon />
        </View>
        <Text style={styles.teaserText}>
          Boost your profile to get more likes!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.profileCard}>
      <Image
        source={{ uri: profile.image }}
        style={styles.profileImage}
      />
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="rgba(0,0,0,0.2)" stopOpacity="0.2" />
            <Stop offset="0.5" stopColor="rgba(0,0,0,0.5)" stopOpacity="0.5" />
            <Stop offset="1" stopColor="rgba(0,0,0,0.8)" stopOpacity="0.8" />
          </LinearGradient>
        </Defs>
        <Rect
          width="100%"
          height="100%"
          fill="url(#gradient)"
        />
      </Svg>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.profileOccupation}>
          {profile.occupation}
        </Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <FavoriteIcon size={20} color="#181811" filled={true} />
      </TouchableOpacity>
      {profile.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
    </View>
  );
};

// Main Component
const LikesOverviewScreen = () => {
  const [activeTab, setActiveTab] = useState('received');
  
  const renderItem = ({ item }) => (
    <ProfileCard profile={item} />
  );

  const renderFooter = () => {
    if (activeTab === 'received') {
      return <ProfileCard isTeaser={true} />;
    }
    return null;
  };

  const getData = () => {
    if (activeTab === 'received') {
      return [...RECEIVED_LIKES];
    }
    return SENT_LIKES;
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowBackIcon color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Likes</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <StatsCard
            title="You Liked"
            count="14"
            icon={<FavoriteIcon color="#64748b" />}
            isHighlighted={false}
          />
          <StatsCard
            title="Liked You"
            count="3"
            icon={<DiversityIcon color="#64748b" filled={true} />}
            isHighlighted={true}
          />
        </View>

        {/* Segmented Control */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsBackground}>
            <TabButton
              label="Received"
              count={3}
              isActive={activeTab === 'received'}
              onPress={() => setActiveTab('received')}
            />
            <TabButton
              label="Sent"
              isActive={activeTab === 'sent'}
              onPress={() => setActiveTab('sent')}
            />
          </View>
        </View>

        {/* Profile Grid */}
        <View style={styles.profileGrid}>
          <FlatList
            data={getData()}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            // ListFooterComponent={renderFooter}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
    textAlign: 'center',
    flex: 1,
    marginRight: 40,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  highlightedCard: {
    position: 'relative',
  },
  highlightCircle: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(249, 245, 6, 0.1)',
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  statsCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  highlightedCount: {
    color: '#f9f506',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f8f8f5',
  },
  tabsBackground: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    flexDirection: 'row',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  activeTabBackground: {
    backgroundColor: '#f9f506',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    borderRadius:20
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    position: 'relative',
    zIndex: 1,
  },
  activeTabLabel: {
    color: '#000000',
  },
  inactiveTabLabel: {
    color: '#64748b',
  },
  tabCount: {
    fontSize: 12,
    opacity: 0.8,
  },
  profileGrid: {
    paddingHorizontal: 16,
  },
  flatListContent: {
    paddingBottom: 32,
  },
  columnWrapper: {
    gap: 12,
    marginBottom: 12,
  },
  profileCard: {
    flex: 1,
    aspectRatio: 3/4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
  },
  profileOccupation: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9f506',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(249, 245, 6, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backdropFilter: 'blur(10px)',
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  teaserCard: {
    flex: 1,
    aspectRatio: 3/4,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  teaserIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f8f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  teaserText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default LikesOverviewScreen;