import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, {
  Path,
  Circle,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientOverlay from './GeadientOvealy';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define all SVG icons as components
const TuneIcon = ({ size = 24, color = '#181811' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"
      fill={color}
    />
  </Svg>
);

const LocationIcon = ({ size = 14, color = '#f9f506' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35Z"
      fill={color}
    />
  </Svg>
);

const VerifiedIcon = ({ size = 18, color = '#93c5fd' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
      fill={color}
    />
  </Svg>
);

const CloseIcon = ({ size = 32, color = '#9ca3af' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill={color}
    />
  </Svg>
);

const StarIcon = ({ size = 24, color = '#f9f506' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
      fill={color}
    />
  </Svg>
);

const FavoriteIcon = ({ size = 32, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
      fill={color}
    />
  </Svg>
);

const StyleIcon = ({ size = 28, color = '#ff5e78' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 20H8V14H4V20ZM10 20H14V12H10V20ZM16 20H20V16H16V20ZM4 12H8V4H4V12ZM10 10H14V4H10V10ZM16 8H20V4H16V8Z"
      fill={color}
    />
  </Svg>
);

const FavoriteOutlineIcon = ({ size = 28, color = '#9ca3af' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z"
      fill={color}
    />
  </Svg>
);

const ChatBubbleIcon = ({ size = 28, color = '#9ca3af' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
      fill={color}
    />
  </Svg>
);

const PersonIcon = ({ size = 28, color = '#9ca3af' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill={color}
    />
  </Svg>
);

// Profile Card Component
const ProfileCard = ({ profile }) => (
  <View style={styles.cardContainer}>
    <ImageBackground
      source={{ uri: profile.image }}
      style={styles.cardImage}
      resizeMode="cover"
    >
      <GradientOverlay />

      
      <View style={styles.cardContent}>
        
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <LocationIcon />
            <Text style={styles.badgeText}>{profile.distance}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ Active now</Text>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {profile.name}, <Text style={styles.ageText}>{profile.age}</Text>
          </Text>
          <View style={styles.verifiedBadge}>
            <VerifiedIcon />
          </View>
        </View>

  
        <Text style={styles.bioText} numberOfLines={2}>
          {profile.bio}
        </Text>
      </View>
        <View style={styles.floatingActions}>
        <TouchableOpacity style={[styles.actionButton, styles.skipButton]}>
          <CloseIcon />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.superLikeButton]}>
          <StarIcon />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
          <FavoriteIcon />
        </TouchableOpacity>
      </View>
    </ImageBackground>
    
  </View>
);

// Main Screen Component
const DiscoveryScreen = () => {
  // Dummy data for profiles
  const profiles = [
    {
      id: '1',
      name: 'Sarah',
      age: 24,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNXs5LqxOxgnp8lixIOYJSYfxpsrieCrUsSMCfb9II1nzRD3jXa3sm5Da9tQWpGq4YrQ51s6GeE88IA0ISqx--Zuszehin940cpzWfhx9sTqvFewst9ynb8uMtvdAXjR_RmuUKvcglZkP_C5Sqo5rq4uyK48kw9bb-h0Y8BGs0tPQHx-5AQXbkgSM6Zr-L5UIayXCs5ufglvSp6NIsijC9C4RThdFuc_CA1nm3aaOFZnF6aWo7dvjpydfoDWt9-CkK8hzLt4XqLS5g',
      distance: '5 miles away',
      bio: "Architecture student who loves coffee, hiking, and exploring hidden gems in the city. Let's find the best latte in town! ☕️🌿",
    },
    {
      id: '2',
      name: 'Alex',
      age: 28,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      distance: '3 miles away',
      bio: 'Software engineer who loves photography and hiking. Always up for an adventure!',
    },
    {
      id: '3',
      name: 'Mia',
      age: 26,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      distance: '7 miles away',
      bio: "Graphic designer and coffee enthusiast. Let's explore art galleries together!",
    },
  ];

  const userImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAZFZYve31D6W6KEqtOI_QBCNxB6gW7LPDq3csZBCRLpevuQ6wNyWHqvpMW_WIhD7rk6TygcXf3Qf1Ui8aybIUI746RAnSA_VP-Rm_SoZl3nS1w-h3GWZenmTXsndHsnPU2MUsrFsoeEM8qTI_pu-jmJwvBzSFSLkk3HVMrIm1FRI0gktgEgJu4Ow12oeZVxhErJKMshSPXDPB1ISnXxVlEXrFN-bgr0mtq15Vj7yiNqN8Z6tm_STIPVzWCoEqPTR0mmjmSJI023pfS';

  const renderProfileCard = ({ item }) => <ProfileCard profile={item} />;

  return (
    <SafeAreaView style={styles.container}>
      
      
      <View style={styles.header}>
       
        <View style={styles.userProfile}>
          <ImageBackground
            source={{ uri: userImage }}
            style={styles.userImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>Discovery</Text>
        <TouchableOpacity style={styles.filterButton}>
          <TuneIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={profiles}
        renderItem={renderProfileCard}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />


    
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 0,
    zIndex: 10,

  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    padding: 1,
    overflow: 'hidden',
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 19,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181811',
    letterSpacing: -0.5,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  flatList: {
    flex: 1,
    // borderWidth:1
  },
  flatListContent: {
    alignItems: 'center',
  },
  cardContainer: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT * 0.75,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 8,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 96,
    gap: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  nameText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
  },
  ageText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#ffffff',
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  bioText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    maxWidth: '90%',
  },
  floatingActions: {
    position: 'absolute',
    bottom: '2%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    zIndex: 20,
    // borderWidth:1,
    borderColor:'#fff'
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 10,
  },
  skipButton: {
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  superLikeButton: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f9f506',
    marginTop: -16,
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#ff5e78',
    shadowColor: '#ff5e78',
    shadowOpacity: 0.3,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  activeDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff5e78',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
});

export default DiscoveryScreen;
