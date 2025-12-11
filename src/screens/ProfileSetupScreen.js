import React, { useState, useRef, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomActionSheet from '../components/ActionSheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

import { colors } from '../utils/colors';
import AppBar from '../components/common/AppBar';
import Input from '../components/common/Input';
import Camera from './../assets/svgIcon/camera.svg';
import Gallery from './../assets/svgIcon/gallary.svg';
import Add from './../assets/svgIcon/add.svg';
import Button from '../components/common/Button';
import { API_URL, mainUrl } from '../constants';
import { showToast } from '../utils/showToast';
import { getString } from '../utils/storage';
import api from '../api/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/reducers';

const ProfileSetupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const dispatch = useDispatch();
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userProfile } = useSelector(state => state.app);
  const actionSheetRef = useRef();
  useEffect(() => {
    setFullName(userProfile?.name);
    setBio(userProfile?.bio);
  }, [userProfile]);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };
  const options = [
    {
      id: 'camera',
      title: 'Take Photo',
      icon: Camera,
      onPress: () => {
        openCamera();
      },
    },
    {
      id: 'gallery',
      title: 'Choose from Gallery',
      icon: Gallery,
      onPress: () => {
        openGallery();
      },
    },
  ];

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
    });

    if (result.assets && result.assets.length > 0) {
      setProfileImage({
        name: result.assets[0]?.fileName,
        type: result.assets[0].type,
        uri: result.assets[0]?.uri,
      });
      handleProfileImageUpdate({
        name: result.assets[0]?.fileName,
        type: result.assets[0].type,
        uri: result.assets[0]?.uri,
      });
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });

    if (result.assets && result.assets.length > 0) {
      setProfileImage({
        name: result.assets[0]?.fileName,
        type: result.assets[0].type,
        uri: result.assets[0]?.uri,
      });
      handleProfileImageUpdate({
        name: result.assets[0]?.fileName,
        type: result.assets[0].type,
        uri: result.assets[0]?.uri,
      });
    }
  };

  const handleProfileImageUpdate = async profileImage => {
    setLoading(true);
    try {
      const token = getString('token');
      const formData = new FormData();
      formData.append('profileImage', {
        uri: profileImage?.uri,
        name: profileImage?.name,
        type: profileImage?.type,
      });

      const response = await axios.post(
        `${API_URL}/users/profile/updateImage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status) {
        showToast(response.data?.message);
      } else {
        showToast(response.data?.message);
      }
    } catch (error) {
      showToast(error?.response?.data?.message || 'Someting went wrong');
    } finally {
      setLoading(false);
    }
  };
  const updateUserProfile = async () => {
    try {
      const data = {
        name: fullName,
        bio: bio,
      };
      const response = await api.post('/users/profile/update', data);
      if (response.data.status) {
        showToast(response.data.message);
        dispatch(fetchUserProfile());
        navigation.reset({index:0,routes:[{name:"HomeScreen"}]})
      }
    } catch (error) {
      showToast(error?.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <AppBar showBackIcon title="Profile Setup" />
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={showActionSheet}>
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
                // overflow: 'hidden',
              }}
            >
              {profileImage?.uri || userProfile?.avatar ? (
                <Image
                  source={{
                    uri:
                      profileImage?.uri ?? `${mainUrl}/${userProfile?.avatar}`,
                  }}
                  style={{ height: 90, width: 90, borderRadius: 50 }}
                />
              ) : (
                <Camera height={35} width={35} />
              )}
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
          </TouchableOpacity>

          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={styles.label}>Full Name</Text>
            <Input
              value={fullName}
              setValue={setFullName}
              placeholder="Enter full name"
            />
          </View>

          <View style={{ width: '100%', marginTop: 10 }}>
            <Text style={styles.label}>About (Optional)</Text>
            <Input
              value={bio}
              setValue={setBio}
              placeholder="What's on your mind?"
            />
          </View>
          <CustomActionSheet
            ref={actionSheetRef}
            title="Choose Image From"
            options={options}
            destructiveIndex={3} // Makes the 4th option red (index 3)
            cancelText="Cancel"
            onCancel={() => console.log('Cancelled')}
          />

          <View style={styles.bottomContainer}>
            <Button
              onPress={() => {
                updateUserProfile();
              }}
              title={loading ? 'Updating...' : 'Continue'}
            />
            <Text style={styles.skipText}>Skip for now</Text>
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
  label: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 8,
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  skipText: {
    color: colors.primary,
    fontSize: 16,
    marginVertical: 4,
    fontWeight: '500',
    marginTop: 20,
  },
});

export default ProfileSetupScreen;
