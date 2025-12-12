import React from 'react';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';
import CameraSvg from '../../../assets/svgIcon/camera.svg';
import Gallery from '../../../assets/svgIcon/gallary.svg';
import MediaIcon from '../../../assets/svgIcon/mediaIcon.svg'


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
  <MediaIcon height={24} width={24}/>
);
export const CameraIcon = ({ size = 24, color = INPUT_ICON_COLOR }) => (
  <CameraSvg height={24} width={24} />
);



export const DocumentIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8 17h8M8 13h8M14.5 9h-4V4.5L14.5 9z"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
// export const CameraIcon = (props) => (
//   <Svg
//     width={24}
//     height={24}
//     viewBox="0 0 24 24"
//     fill="none"
//     {...props}
//   >
//     <Path
//       d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
//       stroke={props.color || '#FFFFFF'} // Use prop color
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Circle
//       cx={12}
//       cy={13}
//       r={4}
//       stroke={props.color || '#FFFFFF'} // Use prop color
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

export const GalleryIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M15 8V5c0-1.1-.9-2-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polygon
      points="8 14 12 10 17 15 22 10 22 20 8 20 8 14"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const AudioIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M12 1v14M18 10v1c0 3.31-2.69 6-6 6s-6-2.69-6-6v-1M4 11h2M18 11h2M12 21v2"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const LocationIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M12 21s-8-4.5-8-11c0-4.42 3.58-8 8-8s8 3.58 8 8c0 6.5-8 11-8 11z"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={10}
      r={3}
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const ContactIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={9}
      cy={7}
      r={4}
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      stroke={props.color || '#FFFFFF'} // Use prop color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);