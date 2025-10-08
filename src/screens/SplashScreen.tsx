import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { getToken } from "@utils/storage";
import { initSocket } from "@utils/socket";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@navigation/types";
import Contstants from "@utils/Contstants";



type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SplashScreen">;

type Props = {
  navigation: SplashScreenNavigationProp;
  route: RouteProp<RootStackParamList, "SplashScreen">;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = getToken();
        console.log("this is token from storage", token);
        

        if (token) {
          initSocket(token, Contstants.SocketUrl);
        }

        setTimeout(() => {
          if (token) {
            navigation.replace("Main");
          } else {
            navigation.replace("LoginScreen");
          }
        }, 1500);
      } catch (err) {
        console.error(err);
        navigation.replace("LoginScreen");
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyChat App</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
});

export default SplashScreen;
