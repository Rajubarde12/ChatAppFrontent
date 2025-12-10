import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { styles } from '../../styles/theme';
import { colors, lightTheme, darkTheme } from '../../utils/colors';

const Tagline = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const textColor = colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[600];

  return (
    <Text style={[styles.tagline, { color: textColor }]}>
      Connect instantly.
    </Text>
  );
};

export default Tagline;