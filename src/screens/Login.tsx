import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import axios from "axios";
import { setToken, setUserId } from "@utils/storage";
import { initSocket } from "@utils/socket";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { RouteProp } from "@react-navigation/native";
import Contstants from "@utils/Contstants";
type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "LoginScreen">;

type Props = {
  navigation: SplashScreenNavigationProp;
  route: RouteProp<RootStackParamList, "LoginScreen">;
};


const  LoginScreen:React.FC<Props>= ({ navigation }) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${Contstants.MainUrl}/users/login`, {
        email,
        password,
      });

      const token = res.data.token;
      if (!token) throw new Error("Token not received");

      // 1️⃣ Store token in MMKV
      setToken(token);
      setUserId(res.data?.["_id"]);

      // 2️⃣ Initialize socket with token
      initSocket(token, "http://10.0.2.2:5000");

      Alert.alert("Login Successful");
      // Navigate to Home/Chat screen
      navigation.replace("Main");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Login Failed", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 12, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 12, borderWidth: 1, padding: 10 }}
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
    </View>
  );
}
export default LoginScreen;