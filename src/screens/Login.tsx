import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { setToken, setUserId } from '@utils/storage';
import Contstants from '@utils/Contstants';
import AppBackground from '@components/AppBackground';
import AppInput from '@components/AppInput';
import AppButton from '@components/AppButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { RouteProp } from '@react-navigation/native';
import { showToast } from '@components/CustomToast';
import { useLoginMutation } from '../app/features/user/userApi';
import { initSocket } from '@utils/socket';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('email@gmail.com');
  const [password, setPassword] = useState('123456');

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const result = await login({ email, password }).unwrap();
      await initSocket(result.token, Contstants.SocketUrl);
      // ✅ Show message from API if exists
      if (result.message) {
        showToast(result.message);
      } else {
        showToast('Login successful!');
      }

      navigation.replace('Main');
    } catch (err: any) {
      console.error(err);

      // RTK Query errors can be complex, check different shapes
      let errorMessage = 'Something went wrong';

      if (err.data?.message) {
        // If backend sent a message
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      showToast(errorMessage);
    }
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

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

        <AppButton title="Login" onPress={handleLogin} loading={false} />

        {/* Registration Button / Link */}
        <TouchableOpacity
          style={styles.registerContainer}
          onPress={() => navigation.navigate('RegistrationScreen')}
        >
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default LoginScreen;

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
