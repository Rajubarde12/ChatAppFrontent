import React from 'react';
import { View, useColorScheme } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../utils/colors';
import { iconSizes } from '../../styles/theme';

const ForumIcon = () => (
  <Svg width={iconSizes.large} height={iconSizes.large} viewBox="0 0 24 24" fill={colors.primary}>
    <Path d="M21 6H19V15H6V17C6 17.55 6.45 18 7 18H18L22 22V7C22 6.45 21.55 6 21 6ZM17 12V3C17 2.45 16.55 2 16 2H3C2.45 2 2 2.45 2 3V18L6 14H16C16.55 14 17 13.55 17 13Z"/>
  </Svg>
);

const SplashLogo = () => {
  const colorScheme = useColorScheme();
  const iconColor = colors.primary;

  return (
    <View style={{ marginBottom: 40 }}>
      <ForumIcon />
    </View>
  );
};

export default SplashLogo;