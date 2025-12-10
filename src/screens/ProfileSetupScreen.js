import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import AppBar from '../components/common/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/common/Input';
import Camera from './../assets/svgIcon/camera.svg';
import Add from './../assets/svgIcon/add.svg';
import Button from '../components/common/Button';

const ProfileSetupScreen = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <AppBar showBackIcon title="Profile Setup" />
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
          <View
            style={{
              height: 90,
              width: 90,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginBottom: 20,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Camera height={35} width={35} />
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: colors.primary,
                borderRadius: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Add />
            </View>
          </View>
          <View style={{ width: '100%',marginTop:20 }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                marginVertical: 8,
                fontWeight: '500',
              }}
            >
              Full Name
            </Text>
            <Input  placeholder="Enter full name"/>
          </View>
          <View style={{ width: '100%',marginTop:10 }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
               marginVertical: 8,
                fontWeight: '500',
              }}
            >
              About (Optional)
            </Text>
            <Input  placeholder="Whats on your mind?"/>
            
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
            <Button onPress={()=>{
                navigation.navigate('OtpScreen')
            }} title="Continue" />
             <Text
              style={{
                color: colors.primary,
                fontSize: 16,
                marginVertical: 4,
                fontWeight: '500',
                marginTop:20
              }}
            >
             Skip for now
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
});
export default ProfileSetupScreen;
