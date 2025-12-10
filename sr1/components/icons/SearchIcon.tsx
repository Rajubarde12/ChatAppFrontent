import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type Props = { size?: number; color?: string };

const SearchIcon: React.FC<Props> = ({ size = 22, color = '#9CA3AF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
    <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export default SearchIcon;


