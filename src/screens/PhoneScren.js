import { Text, View } from 'react-native';
import { colors } from '../utils/colors';
import AppBar from '../components/common/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useState } from 'react';
import { showToast } from '../utils/showToast';
import axiosClient from '../api/axiosClient';

const PhoneScreen = ({ route, navigation }) => {
  const { item } = route?.params || {};
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      if (!phoneNumber || phoneNumber.trim().length === 0) {
        showToast('Please enter a valid mobile number');
        return;
      }

      const data = {
        mobile: phoneNumber.trim(),
        // countryCode: item?.dial || '+91', // default if not selected
      };

      setLoading(true);

      const res = await axiosClient.post('/send-otp', data);
      console.log("riiei",res.data)
      showToast(res.data?.message || 'OTP sent successfully');
      navigation.navigate('OtpScreen', {
        phoneNumber: phoneNumber,
        countryCode: item?.dial,
      });
    } catch (error) {
      console.log('errr',error)
      showToast(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderRightIcon = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderRightWidth: 1,
          paddingRight: 5,
          marginRight: 5,
          gap: 3,
          borderColor: '#6b7280',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>{item?.emoji}</Text>
        <Text style={{ color: '#fff', fontSize: 16 }}>{item?.dial}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppBar showBackIcon={true} title="Enter your phone number" />

        <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
              marginBottom: 2,
            }}
          >
            What's your mobile number?
          </Text>
          <Text
            style={{
              color: colors.neutral[500],
              fontSize: 14,
              fontWeight: '400',
              marginBottom: 25,
            }}
          >
            Your will recieve SMS for verification
          </Text>
          <Input
            setValue={setPhoneNumber}
            RigtIcon={renderRightIcon}
            placeholder={'Phone number'}
          />
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
                onSubmit();
                // navigation.navigate('OtpScreen');
              }}
              title="Send Otp"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default PhoneScreen;
