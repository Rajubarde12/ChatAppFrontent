 import Svg, { Path, Circle, Polyline } from 'react-native-svg'; // Import SVG components
export const SingleTickIcon = ({ color = '#fff', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="20 6 9 17 4 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const DoubleTickIcon = ({ color = '#fff', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* First Tick */}
    <Polyline
      points="20 6 9 17 4 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Second Tick (Offset) */}
    <Polyline
      points="20 6 9 17 4 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(5, -5)" // Moves the second tick slightly up-right
      opacity={0.8}
    />
  </Svg>
);

export const ClockIcon = ({ color = '#fff', size = 14 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10" />
    <Polyline points="12 6 12 12 16 14" />
  </Svg>
);