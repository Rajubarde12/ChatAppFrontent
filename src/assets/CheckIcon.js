import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = ({ size = 24, color = '#13c8ec', fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckIcon;