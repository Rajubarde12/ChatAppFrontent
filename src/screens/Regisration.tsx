import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Contstants from '@utils/Contstants';
import AppBackground from '@components/AppBackground';
import AppInput from '@components/AppInput';
import AppButton from '@components/AppButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { RouteProp } from '@react-navigation/native';
import { showToast } from '@components/CustomToast';
import { useRegisterMutation } from 'src/app/features/user/userApi';

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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});   
  const [register, { isLoading, isError, error, data }] = useRegisterMutation();

  const validate = () => {
  
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (!confirmPassword.trim())
      newErrors.confirmPassword = 'Confirm your password';
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;


    try {
      const result = await register({ name, email, password }).unwrap();

      // ✅ Show message from API if exists
      if (result.message) {
        showToast(result.message);
      } else {
        showToast('Registration successful!');
      }

      // Navigate to main app screen  
      navigation.replace('Main');
    } catch (err: any) {
      console.error(err);
      showToast(
        err.response?.data?.message || err?.message || 'Something went wrong',
      );
    } finally {
      
    }
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
          onPress={() => navigation.navigate('RegistrationScreen')}
        >
          <Text style={styles.registerText}>
            Already have account? <Text style={styles.registerLink}>Login</Text>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 24,
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
});
