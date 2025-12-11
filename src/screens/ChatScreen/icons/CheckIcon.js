import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = ({ width = 16, height = 16, color = '#34C759', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M13.3334 4L6.00002 11.3333L2.66669 8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckIcon;