import { Text, View } from 'react-native';
import { colors } from '../utils/colors';
import AppBar from '../components/common/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const PhoneScreen = ({route,navigation}) => {
  const {item}=route?.params||{}
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
          <Input RigtIcon={renderRightIcon} placeholder={'Phone number'} />
          <View
            style={{
              position: 'absolute',
              bottom: 60,
              alignSelf: 'center',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Button onPress={()=>{
                navigation.navigate('OtpScreen')
            }} title="Send Otp" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default PhoneScreen;
