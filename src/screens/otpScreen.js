import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { colors } from './../utils/colors';
import { fonts } from './../utils/fonts';
import AppBar from '../components/common/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/common/Button';
import api from '../api/axiosClient';
import { setString } from '../utils/storage';
import { showToast } from '../utils/showToast';

const OtpScreen = ({ navigation, route }) => {
  const { phoneNumber, countryCode } = route?.params||{};
  const otpInput = useRef(null);
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading,setLoading]=useState(false)
  const verifyOtp = async () => {
    try {
      if (!phoneNumber || phoneNumber.trim().length === 0) {
        showToast('Please enter your mobile number');
        return;
      }
      if (!code || code.trim().length === 0) {
        showToast('Please enter the OTP');
        return;
      }

      const data = {
        mobileNumber: phoneNumber.trim(),
        countryCode:countryCode || '+91',
        otp: code.trim(),
      };

      setLoading(true);

      const res = await api.post('/users/verify-otp', data);
      setString('token', res.data?.user?.token);
      setString('userid', res.data?.user?.id);
      console.log(res.data?.user?.id,res.data?.user?.token),

      showToast(res.data?.message || 'OTP verified successfully');
      navigation.navigate('ProfileSetupScreen');
    } catch (error) {
      showToast(error.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <AppBar showBackIcon title="Verify Otp" />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <View>
            <Text style={styles.title}>Enter the 6-digit otp code</Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.neutral[500],
              }}
            >
              We sent to {countryCode+phoneNumber}
            </Text>
          </View>
          <View style={styles.otpWrapper}>
            <OTPTextInput
              ref={otpInput}
              inputCount={6}
              handleTextChange={setCode}
              containerStyle={styles.otpContainer}
              textInputStyle={styles.otpBox}
              tintColor={colors.primary[500]}
              offTintColor={colors.neutral[300]}
            />
          </View>

          {/* Timer & Resend */}
          <View style={styles.timerRow}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend in 00:{timer}s</Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(30)}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 60,
              alignSelf: 'center',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Button
              onPress={() => {
                verifyOtp();
              }}
              title="Verify  Otp"
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081014',
  },

  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: fonts['Lato-Bold'],
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#999',
    fontFamily: fonts['Lato-Regular'],
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  otpContainer: {
    width: '80%',
    marginTop: 20,
  },

  otpBox: {
    backgroundColor: '#fff',
    borderRadius: 0,
    color: '#000',
    fontSize: 22,
    fontFamily: fonts['Lato-Bold'],
  },

  timerRow: {
    marginTop: 15,
    alignItems: 'center',
  },

  timerText: {
    color: colors.neutral[400],
    fontSize: 14,
  },

  resendText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: fonts['Lato-Regular'],
  },

  button: {
    backgroundColor: colors.primary[500],
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts['Lato-Bold'],
  },
});
