import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SendIcon = ({ width = 24, height = 24, color = '#007AFF', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M21.5 12L3.5 3.5L8.75 12L3.5 20.5L21.5 12Z"
      fill={color}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SendIcon;