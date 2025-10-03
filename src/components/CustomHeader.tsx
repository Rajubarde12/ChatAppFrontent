import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  
} from 'react-native';
import { useSafeAreaInsets,SafeAreaView } from 'react-native-safe-area-context';
import MenuSvg from '@assets/icons/menu.svg';
import BellSvg from '@assets/icons/bell.svg';

interface CustomHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onBellPress?: () => void;
  showMenu?: boolean;
  showBell?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onMenuPress,
  onBellPress,
  showMenu = true,
  showBell = true,
  backgroundColor = '#1E40AF',
  textColor = '#FFFFFF',
}) => {
 

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
        translucent={Platform.OS === 'android'}
      />
      <View style={[styles.container, { backgroundColor }]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.leftSection}>
              {showMenu && (
                <TouchableOpacity
                  onPress={onMenuPress}
                  style={styles.iconButton}
                  accessibilityRole="button"
                  accessibilityLabel="Open menu"
                >
                  <MenuSvg width={24} height={24} color={textColor} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.centerSection}>
              <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
                {title}
              </Text>
            </View>

            <View style={styles.rightSection}>
              {showBell && (
                <TouchableOpacity
                  onPress={onBellPress}
                  style={styles.iconButton}
                  accessibilityRole="button"
                  accessibilityLabel="Open notifications"
                >
                  <BellSvg width={24} height={24} color={textColor} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomHeader;
