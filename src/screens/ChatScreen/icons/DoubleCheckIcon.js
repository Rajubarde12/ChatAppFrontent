import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DoubleCheckIcon = ({ width = 16, height = 16, color = '#34C759', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M2 8.66667L5.33333 12L14 3.33333"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 8.66667L9.33333 12L18 3.33333"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(-4 0)"
    />
  </Svg>
);

export default DoubleCheckIcon;