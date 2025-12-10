import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type Props = { size?: number; color?: string };

const UserIcon: React.FC<Props> = ({ size = 22, color = '#9CA3AF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} />
    <Path d="M4 21c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export default UserIcon;


