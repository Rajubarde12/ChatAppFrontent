import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GradientOverlay = () => (
  <View style={styles.gradientContainer}>
    <Svg width="100%" height="100%" style={styles.svgOverlay}>
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <Stop offset="40%" stopColor="#000000" stopOpacity="0.1" />
          <Stop offset="70%" stopColor="#000000" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#gradient)"
        rx={16}
        ry={16}
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  svgOverlay: {
    width: '100%',
    height: '100%',
  },
});

export default GradientOverlay;