import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string };

const HomeIcon: React.FC<Props> = ({ size = 22, color = '#9CA3AF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.75 12 3l9 6.75V21a1 1 0 0 1-1 1h-5.5a.5.5 0 0 1-.5-.5V16a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v5.5a.5.5 0 0 1-.5.5H4a1 1 0 0 1-1-1V9.75Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeIcon;


