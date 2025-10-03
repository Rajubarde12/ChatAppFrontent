/**
 * @format
 */

import { AppRegistry, PermissionsAndroid, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
async function requestNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Notification Permission",
          message: "App needs permission to show notifications",
          buttonPositive: "Allow",
          buttonNegative: "Deny",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // below Android 13, no permission needed
  }
requestNotificationPermission()
AppRegistry.registerComponent(appName, () => App);

