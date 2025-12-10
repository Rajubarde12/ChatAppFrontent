import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBackground from '@components/AppBackground';
import AppInput from '@components/AppInput';
import AppButton from '@components/AppButton';
import { showToast } from '@components/CustomToast';
import {
  useGetCountryMetaQuery,
  useRegisterMutation,
} from 'src/app/features/user/userApi';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { RouteProp } from '@react-navigation/native';
import PhoneNumberField from '@components/PhoneInput';

type RegistrationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RegistrationScreen'
>;

type Props = {
  navigation: RegistrationNavigationProp;
  route: RouteProp<RootStackParamList, 'RegistrationScreen'>;
};

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [countryName, setCountryName] = useState('India');
  const [callingCode, setCallingCode] = useState('+91');
  const [visible, setVisible] = useState(false);

  const [errors, setErrors] = useState<any>({});
  const [register, { isLoading }] = useRegisterMutation();
  const { data: countryMeta } = useGetCountryMetaQuery();

  // ✅ FIX: ensure we only use ISO code in countryCode
  useEffect(() => {
    if (countryMeta?.data) {
      const { data } = countryMeta;
      setCallingCode(`+${data.expectedExample.countryCallingCode}`);
      setCountryCode(data.expectedExample.country as CountryCode); // 'US' not '+1'
      setCountryName(data.countryName);
    }
  }, [countryMeta]);

  const validate = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email';
    if (!mobileNumber.trim())
      newErrors.mobileNumber = 'Mobile number is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (!confirmPassword.trim())
      newErrors.confirmPassword = 'Confirm your password';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name,
        email,
        password,
        mobileNumber,
        countryCode: callingCode, // ex: +1
        countryName,
      };
      const result = await register(payload).unwrap();
      showToast(result.message || 'Registration successful!');
      navigation.replace('Main');
    } catch (err: any) {
      console.error(err);
      showToast(err?.data?.message || 'Something went wrong');
    }
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountryName(country.name);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Register to get started</Text>

        <AppInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <AppInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />

     
      
        <PhoneNumberField
          onChange={value => {
            setMobileNumber(value);
          }}
          value={mobileNumber}
          handleCountrySelect={(data)=>{
            setCallingCode(data.callingCode[0]);
            setCountryCode(data.cca2)
             setCountryName(data.name as string)
            
            // setCountryName()
          }}
          error={errors.mobileNumber}
        />

        <AppInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        <AppInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <AppButton
          title="Register"
          onPress={handleRegister}
          loading={isLoading}
        />

        <TouchableOpacity
          style={styles.registerContainer}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.registerText}>
            Already have an account?{' '}
            <Text style={styles.registerLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 24,
    textAlign: 'center',
  },

  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    borderRightWidth: 1,
    borderColor: '#555',
  },

  phoneInput: {
    flex: 1,
    marginLeft: 10,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#ccc',
    fontSize: 14,
  },
  registerLink: {
    color: '#56ab2f',
    fontWeight: '600',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  countryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    borderRightWidth: 1,
    borderColor: '#555',
  },
  countryPickerButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  callingCode: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
});
