import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const MatchCelebrationScreen = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const matchImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCcZvxRdrCqdZGGQIdFpPhfM--PxfCn_j6Zg8GDEZ2KlbN6EfYTtlIZRy-JLNAW909IUbGyUQowvJfQM0mbhrSHZv0GL64S85hlleiRaelmn-nqDZE2STFYwN7R_cp2WpgRf1_GOvpNVIUszyq0sVuWga6NZn6qc9TIj1vaHyL5vHxKtFd9xRnjUzA67n4iCYBLleL7awzEBwIKN-bkQJnv9ZM-X9CIScWx3KZvC5yw_fBlagCDi9ip2W3aBnQNyzKOyIs3cKi5R8a';
  const userImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqVokdAxEc0rD9_5ooPDuYs0Tp2XQ1rB9yT3L8WV-jhacd0RBwByB2VkeyjflilDD32_q0zypfFId0hSQNDbORXhVlbk5f8IfhHOLLjyxEoRbz0a0V8o9IUDRjCJQ-lnAGbY8u83FMNEFYwx-lFhLMO4-yK1YWaTkkS1c6b3jfvGK6RI6SnqFy9AzvK3ao3DqN0PqHyJ7_gZVzMqDToOSyTe2izrlyIHqIlQ-m0vc44tHxDl26ndSRx3k4bfi063GPT6t1YYTXxZqU';
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  const DecorativeDot = ({ top, left, right, bottom, size, color, opacity, style }) => (
    <View style={[
      styles.decorativeDot,
      {
        top: top ? `${top}%` : undefined,
        left: left ? `${left}%` : undefined,
        right: right ? `${right}%` : undefined,
        bottom: bottom ? `${bottom}%` : undefined,
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
      },
      style,
    ]} />
  );
  const HeartIcon = ({ size = 32, color = '#f43f5e' }) => (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <Path fill={color} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </Svg>
    </View>
  );

  const ChatIcon = ({ size = 24, color = '#181811' }) => (
    <View style={{ width: size, height: size, marginRight: 8 }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <Path fill={color} d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </Svg>
    </View>
  );
  const CloseIcon = ({ size = 24, color = '#181811' }) => (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <Path fill={color} d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </Svg>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.decorativeBackground}>
        <Animated.View style={[
          styles.animatedDot,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}>
          <DecorativeDot 
            top={15} 
            left={10} 
            size={12} 
            color="#f9f506" 
            opacity={0.6} 
          />
        </Animated.View>
        
        <DecorativeDot 
          top={20} 
          right={15} 
          size={16} 
          color="#fb7185" 
          opacity={0.4} 
        />
        
        <DecorativeDot 
          bottom={40} 
          left={20} 
          size={8} 
          color="#60a5fa" 
          opacity={0.5} 
        />
        
        <DecorativeDot 
          top={30} 
          left={80} 
          size={8} 
          color="#4ade80" 
          opacity={0.3} 
        />
        
        <DecorativeDot 
          top={18} 
          left={45} 
          size={6} 
          color="#ca8a04" 
          opacity={0.4} 
        />
      </View>

      {/* Top Bar / Close Action */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeButton}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Visual Content */}
        <View style={styles.mainContent}>
          {/* Overlapping Avatars Section */}
          <View style={styles.avatarsContainer}>
            {/* Floating Heart Icon */}
            <Animated.View style={[
              styles.floatingHeart,
              {
                transform: [{ translateY: bounceAnim }],
              },
            ]}>
              <View style={styles.heartContainer}>
                <HeartIcon size={32} />
              </View>
            </Animated.View>

            {/* Match Profile Image */}
            <View style={[styles.profileImage, styles.matchImage]}>
              <Image 
                source={{ uri: matchImage }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            {/* User Profile Image */}
            <View style={[styles.profileImage, styles.userImage]}>
              <Image 
                source={{ uri: userImage }}
                style={[styles.image, styles.userImageStyle]}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Text Content */}
          <Animated.View 
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.title}>It's a Match!</Text>
            <Text style={styles.subtitle}>
              You and Sarah like each other!{"\n"}
              Don't keep her waiting.
            </Text>
          </Animated.View>
        </View>

        {/* Action Area */}
        <View style={styles.actionArea}>
          {/* Primary CTA */}
          <TouchableOpacity style={styles.primaryButton}>
            <ChatIcon />
            <Text style={styles.primaryButtonText}>Start Chat</Text>
          </TouchableOpacity>

          {/* Secondary CTA */}
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Keep Browsing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f5',
    minHeight: height,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  decorativeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
  },
  decorativeDot: {
    position: 'absolute',
    borderRadius: 9999,
  },
  animatedDot: {
    position: 'absolute',
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingHorizontal: 4,
    zIndex: 50,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 448,
    width: '100%',
    alignSelf: 'center',
    marginTop: -40,
  },
  avatarsContainer: {
    height: 192,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  floatingHeart: {
    position: 'absolute',
    top: -16,
    zIndex: 30,
  },
  heartContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  profileImage: {
    borderRadius: 9999,
    borderWidth: 6,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  matchImage: {
    width: 144,
    height: 144,
    marginRight: -24,
    transform: [{ rotate: '3deg' }],
  },
  userImage: {
    width: 144,
    height: 144,
    marginLeft: -24,
    transform: [{ rotate: '-3deg' }],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  userImageStyle: {
    opacity: 0.9,
    filter: 'brightness(0.9) contrast(0.95)',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 36,
    fontFamily: 'SplineSans-Bold',
    fontWeight: '700',
    color: '#181811',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'NotoSans-Regular',
    fontWeight: '400',
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  actionArea: {
    width: '100%',
    maxWidth: 448,
    alignSelf: 'center',
    paddingHorizontal: 8,
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#f9f506',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f9f506',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'SplineSans-Bold',
    fontWeight: '700',
    color: '#181811',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'SplineSans-SemiBold',
    fontWeight: '600',
    color: '#6b7280',
    letterSpacing: 0.5,
  },
});

export default MatchCelebrationScreen;