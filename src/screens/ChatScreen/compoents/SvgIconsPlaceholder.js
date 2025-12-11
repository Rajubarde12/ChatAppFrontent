import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import CameraSvg from '../../../assets/svgIcon/camera.svg';
import Gallery from '../../../assets/svgIcon/gallary.svg';


const INPUT_ICON_COLOR = '#8696a0'; 
const FAB_ICON_COLOR = '#fff'; 
export const SendIcon = ({ size = 24, color = FAB_ICON_COLOR }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
    />
  </Svg>
);

export const MicIcon = ({ size = 24, color = FAB_ICON_COLOR }) => (
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
    <Path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <Path d="M19 10v2a7 7 0 01-14 0v-2" />
    <Path d="M12 19v3" />
  </Svg>
);


export const EmojiIcon = ({ size = 24, color = INPUT_ICON_COLOR }) => (
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
    <Path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <Path d="M9 9h.01" />
    <Path d="M15 9h.01" />
  </Svg>
);

export const ClipIcon = ({ size = 24, color = INPUT_ICON_COLOR }) => (
  <Gallery height={24} width={24}/>
);
export const CameraIcon = ({ size = 24, color = INPUT_ICON_COLOR }) => (
  <CameraSvg height={24} width={24} />
);
