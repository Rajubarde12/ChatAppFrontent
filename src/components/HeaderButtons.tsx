import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import MenuSvg from '@assets/icons/menu.svg';
import BackSvg from '@assets/icons/back.svg';
import BellSvg from '@assets/icons/bell.svg';

type HeaderButtonProps = {
  onPress?: () => void;
  accessibilityLabel?: string;
};

export const HeaderMenuButton: React.FC<HeaderButtonProps> = ({ onPress, accessibilityLabel = 'Open menu' }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={styles.button} hitSlop={10}>
      <MenuSvg width={22} height={22} color="#fff" />
    </Pressable>
  );
};

export const HeaderBackButton: React.FC<HeaderButtonProps> = ({ onPress, accessibilityLabel = 'Go back' }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={styles.button} hitSlop={10}>
      <BackSvg width={22} height={22} color="#fff" />
    </Pressable>
  );
};

export const HeaderBellButton: React.FC<HeaderButtonProps> = ({ onPress, accessibilityLabel = 'Open notifications' }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
  };
  return (
    <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={styles.button} hitSlop={10}>
      <BellSvg width={22} height={22} color="#fff" />
    </Pressable>
  );
};

export const HeaderRightGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.rightGroup}>{children}</View>;
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default {};


