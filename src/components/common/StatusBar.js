import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles, iconSizes } from '../../styles/theme';
import { colors, lightTheme, darkTheme } from '../../utils/colors';

const StatusIcon = ({ iconName, size = iconSizes.small, color }) => {
  const icons = {
    signal_cellular_alt: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 1L1 21M16 1L1 16M11 1L1 11M6 1L1 6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    wifi: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z"
          fill={color}
        />
        <Path
          d="M18.364 15.636C19.5142 14.4858 20.1818 12.9041 20.1818 11.25C20.1818 9.59591 19.5142 8.01423 18.364 6.86401M5.63604 6.86401C4.48583 8.01423 3.81818 9.59591 3.81818 11.25C3.81818 12.9041 4.48583 14.4858 5.63604 15.636"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M15.5355 12.4645C16.4404 11.5596 17 10.3152 17 9C17 7.68482 16.4404 6.44042 15.5355 5.53553M8.46447 5.53553C7.55958 6.44042 7 7.68482 7 9C7 10.3152 7.55958 11.5596 8.46447 12.4645"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    ),
    battery_full: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 7H17C18.1046 7 19 7.89543 19 9V15C19 16.1046 18.1046 17 17 17H5C3.89543 17 3 16.1046 3 15V9C3 7.89543 3.89543 7 5 7H6"
          stroke={color}
          strokeWidth="2"
        />
        <Path d="M20 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Path
          d="M7 10H16V14H7V10Z"
          fill={color}
        />
      </Svg>
    ),
  };

  return icons[iconName] || null;
};

const StatusBar = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const textColor = theme.text;

  return (
    <View style={styles.statusBar}>
      <Text style={[styles.statusBarLeft, { color: textColor }]}>9:41</Text>
      <View style={styles.statusBarRight}>
        <StatusIcon iconName="signal_cellular_alt" color={textColor} />
        <StatusIcon iconName="wifi" color={textColor} />
        <StatusIcon iconName="battery_full" color={textColor} />
      </View>
    </View>
  );
};

export default StatusBar;