import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const WhatsAppLoginScreen = () => {
  // Phone & OTP States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [callingCode, setCallingCode] = useState('1');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  
  // Profile States
  const [isProfileSetup, setIsProfileSetup] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const otpInputRefs = useRef<Array<TextInput>>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Timer for OTP resend
  useEffect(() => {
    if (isOtpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
  }, [isOtpSent, timer]);

  // Animation when OTP screen appears
  useEffect(() => {
    if (isOtpSent) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isOtpSent]);

  // Animation when Profile setup appears
  useEffect(() => {
    if (isProfileSetup) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isProfileSetup]);

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountryPickerVisible(false);
  };

  const handleSendOtp = () => {
    if (phoneNumber.length < 7) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number');
      return;
    }

    // Simulate OTP sending
    console.log(`Sending OTP to +${callingCode}${phoneNumber}`);
    setIsOtpSent(true);
    setTimer(30);
    setIsResendEnabled(false);
    
    // Auto-focus first OTP input
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 500);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (enteredOtp: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (enteredOtp === '123456') { // Demo OTP
        setIsProfileSetup(true);
        setOtp(['', '', '', '', '', '']);
      } else {
        Alert.alert('Invalid OTP', 'Please enter the correct OTP');
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    if (!isResendEnabled) return;
    
    // Simulate OTP resend
    console.log(`Resending OTP to +${callingCode}${phoneNumber}`);
    setTimer(30);
    setIsResendEnabled(false);
    setOtp(['', '', '', '', '', '']);
    otpInputRefs.current[0]?.focus();
  };

  const handleEditPhoneNumber = () => {
    setIsOtpSent(false);
    setOtp(['', '', '', '', '', '']);
  };

  const handleChoosePhoto = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets[0].uri) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Failed to take photo');
      } else if (response.assets && response.assets[0].uri) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
  };

  const handleCompleteProfile = async () => {
    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (userName.trim().length < 2) {
      Alert.alert('Error', 'Name must be at least 2 characters long');
      return;
    }

    setIsLoading(true);

    // Simulate API call to complete profile
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Welcome to WhatsApp!',
        `Hi ${userName}, your profile has been setup successfully!`,
        [{ text: 'Get Started', onPress: () => console.log('Navigate to main app') }]
      );
    }, 2000);
  };

  // Profile Setup Screen
  if (isProfileSetup) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Animated.View style={[
              styles.profileContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }] 
              }
            ]}>
              {/* Header */}
              <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}>Profile Info</Text>
                <Text style={styles.profileSubtitle}>
                  Please provide your name and an optional profile photo
                </Text>
              </View>

              {/* Profile Photo Section */}
              <View style={styles.photoSection}>
                <TouchableOpacity 
                  style={styles.photoContainer}
                  onPress={handleChoosePhoto}
                >
                  {profileImage ? (
                    <View style={styles.imageContainer}>
                      <Image 
                        source={{ uri: profileImage }} 
                        style={styles.profileImage}
                      />
                      <TouchableOpacity 
                        style={styles.removePhotoButton}
                        onPress={handleRemovePhoto}
                      >
                        {/* <Icon name="close" size={16} color="#fff" /> */}
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.placeholderContainer}>
                      {/* <Icon name="camera-alt" size={40} color="rgba(255,255,255,0.5)" /> */}
                      <Text style={styles.placeholderText}>ADD PHOTO</Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Photo Options */}
                <View style={styles.photoOptions}>
                  <TouchableOpacity 
                    style={styles.photoOptionButton}
                    onPress={handleChoosePhoto}
                  >
                    {/* <Icon name="photo-library" size={20} color="#25d366" /> */}
                    <Text style={styles.photoOptionText}>Gallery</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.photoOptionButton}
                    onPress={handleTakePhoto}
                  >
                    {/* <Icon name="photo-camera" size={20} color="#25d366" /> */}
                    <Text style={styles.photoOptionText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name Input */}
              <View style={styles.nameSection}>
                <Text style={styles.inputLabel}>Your Name</Text>
                <TextInput
                  style={styles.nameInput}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Enter your name"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  autoFocus
                  maxLength={25}
                  autoCapitalize="words"
                />
                <Text style={styles.charCount}>
                  {userName.length}/25
                </Text>
              </View>

              {/* Complete Button */}
              <TouchableOpacity 
                style={[
                  styles.completeButton,
                  { 
                    opacity: userName.trim().length >= 2 ? 1 : 0.6,
                    backgroundColor: userName.trim().length >= 2 ? '#25d366' : 'rgba(37, 211, 102, 0.6)'
                  }
                ]}
                disabled={userName.trim().length < 2 || isLoading}
                onPress={handleCompleteProfile}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.completeButtonText}>Complete Profile</Text>
                )}
              </TouchableOpacity>

              {/* Skip for now (optional) */}
              <TouchableOpacity style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // OTP Screen
  if (isOtpSent) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <Animated.View style={[styles.otpContainer, { opacity: fadeAnim }]}>
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleEditPhoneNumber}
            >
              {/* <Icon name="arrow-back" size={24} color="#fff" /> */}
            </TouchableOpacity>

            {/* OTP Header */}
            <View style={styles.otpHeader}>
              <Text style={styles.otpTitle}>Verification</Text>
              <Text style={styles.otpSubtitle}>
                We have sent the code verification to{'\n'}
                your mobile number +{callingCode} {phoneNumber}
              </Text>
            </View>

            {/* OTP Inputs */}
            <View style={styles.otpInputsContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => otpInputRefs.current[index] = ref!}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleOtpKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {/* Timer and Resend */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                {isResendEnabled ? "Didn't receive code? " : `Resend code in ${timer}s`}
              </Text>
              {isResendEnabled && (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendText}>Resend</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              style={[
                styles.verifyButton,
                { 
                  opacity: otp.every(digit => digit !== '') ? 1 : 0.6,
                  backgroundColor: otp.every(digit => digit !== '') ? '#25d366' : 'rgba(37, 211, 102, 0.6)'
                }
              ]}
              disabled={!otp.every(digit => digit !== '') || isLoading}
              onPress={() => handleVerifyOtp(otp.join(''))}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Phone Number Screen
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          {/* WhatsApp Logo/Header */}
          <View style={styles.header}>
            <Text style={styles.whatsappLogo}>WhatsApp</Text>
            <Text style={styles.subtitle}>
              Enter your phone number to get started
            </Text>
          </View>

          {/* Phone Input Section */}
          <View style={styles.phoneSection}>
            <Text style={styles.sectionLabel}>Phone Number</Text>
            
            <View style={styles.phoneInputContainer}>
              {/* Country Picker */}
              <TouchableOpacity 
                style={styles.countrySelector}
                onPress={() => setCountryPickerVisible(true)}
              >
                <Text style={styles.flag}>
                  {String.fromCodePoint(...getFlagEmoji(countryCode))}
                </Text>
                <Text style={styles.callingCode}>+{callingCode}</Text>
                {/* <Icon name="arrow-drop-down" size={20} color="rgba(255,255,255,0.5)" /> */}
              </TouchableOpacity>

              {/* Phone Number Input */}
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone number"
                placeholderTextColor="rgba(255,255,255,0.6)"
                keyboardType="phone-pad"
                autoFocus
              />
            </View>

            <Text style={styles.helperText}>
              We'll call or text you to confirm your number.{'\n'}
              Standard carrier charges may apply.
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            style={[
              styles.continueButton,
              { 
                opacity: phoneNumber.length >= 7 ? 1 : 0.6,
                backgroundColor: phoneNumber.length >= 7 ? '#25d366' : 'rgba(37, 211, 102, 0.6)'
              }
            ]}
            disabled={phoneNumber.length < 7}
            onPress={handleSendOtp}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Country Picker Modal */}
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          withAlphaFilter
          withEmoji
          visible={countryPickerVisible}
          onSelect={handleCountrySelect}
          onClose={() => setCountryPickerVisible(false)}
          translation="eng"
          theme={{
            onBackgroundTextColor: 'white',
            backgroundColor: '#1f2c34',
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Helper function to get flag emoji
const getFlagEmoji = (countryCode: CountryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return codePoints;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2c34',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  whatsappLogo: {
    fontSize: 32,
    fontWeight: '300',
    color: '#25d366',
    marginBottom: 16,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneSection: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
    fontWeight: '500',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.2)',
    gap: 8,
  },
  flag: {
    fontSize: 20,
  },
  callingCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  helperText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 18,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // OTP Screen Styles
  otpContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  otpHeader: {
    marginBottom: 50,
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 12,
  },
  otpSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  resendText: {
    color: '#25d366',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  verifyButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Profile Setup Styles
  profileContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 50,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 12,
  },
  profileSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  photoContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  photoOptions: {
    flexDirection: 'row',
    gap: 30,
  },
  photoOptionButton: {
    alignItems: 'center',
    gap: 8,
  },
  photoOptionText: {
    color: '#25d366',
    fontSize: 14,
    fontWeight: '500',
  },
  nameSection: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
    fontWeight: '500',
  },
  nameInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  charCount: {
    textAlign: 'right',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 4,
  },
  completeButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
});

export default WhatsAppLoginScreen;