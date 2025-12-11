import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

const MoreOptionsIcon = ({ width = 24, height = 24, color = '#ccc', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Circle cx="12" cy="12" r="2" fill={color} />
    <Circle cx="12" cy="19" r="2" fill={color} />
  </Svg>
);

export default MoreOptionsIcon;