// FileTypeIcons.js
import React from 'react';
import Svg, { Path, Rect, Circle, G, Text } from 'react-native-svg';

export const PdfIcon = ({ size = 60, color = "#FF5252" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#FF5252" />
    <Path d="M20,20 L40,20 L40,25 L20,25 Z" fill="white" />
    <Path d="M20,28 L35,28 L35,33 L20,33 Z" fill="white" />
    <Path d="M20,36 L30,36 L30,41 L20,41 Z" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">PDF</Text>
  </Svg>
);

export const DocIcon = ({ size = 60, color = "#2196F3" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#2196F3" />
    <Path d="M20,20 L40,20 L40,25 L20,25 Z" fill="white" />
    <Path d="M20,28 L35,28 L35,33 L20,33 Z" fill="white" />
    <Path d="M20,36 L30,36 L30,41 L20,41 Z" fill="white" />
    <Path d="M20,44 L25,44 L25,49 L20,49 Z" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">DOC</Text>
  </Svg>
);

export const XlsIcon = ({ size = 60, color = "#4CAF50" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#4CAF50" />
    <Path d="M20,20 L40,20 L40,22 L20,22 Z" fill="white" />
    <Path d="M20,24 L40,24 L40,26 L20,26 Z" fill="white" />
    <Path d="M20,28 L40,28 L40,30 L20,30 Z" fill="white" />
    <Path d="M20,32 L40,32 L40,34 L20,34 Z" fill="white" />
    <Path d="M20,36 L40,36 L40,38 L20,38 Z" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">XLS</Text>
  </Svg>
);

export const PptIcon = ({ size = 60, color = "#FF9800" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#FF9800" />
    <Circle cx="30" cy="25" r="10" fill="white" />
    <Rect x="20" y="38" width="20" height="8" rx="2" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">PPT</Text>
  </Svg>
);

export const ZipIcon = ({ size = 60, color = "#795548" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#795548" />
    <Path d="M20,20 L40,20 L40,40 L20,40 Z" fill="white" />
    <Path d="M25,25 L35,25 L35,35 L25,35 Z" fill="#795548" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">ZIP</Text>
  </Svg>
);

export const ApkIcon = ({ size = 60, color = "#050605ff" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#8BC34A" />
    <Path d="M20,20 L40,20 L30,40 Z" fill="white" />
    <Circle cx="25" cy="25" r="2" fill="#8BC34A" />
    <Circle cx="35" cy="25" r="2" fill="#8BC34A" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">APK</Text>
  </Svg>
);

export const TxtIcon = ({ size = 60, color = "#757575" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#757575" />
    <Path d="M20,20 L40,20 L40,22 L20,22 Z" fill="white" />
    <Path d="M20,25 L35,25 L35,27 L20,27 Z" fill="white" />
    <Path d="M20,30 L30,30 L30,32 L20,32 Z" fill="white" />
    <Path d="M20,35 L40,35 L40,37 L20,37 Z" fill="white" />
    <Path d="M20,40 L25,40 L25,42 L20,42 Z" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">TXT</Text>
  </Svg>
);

export const AudioIcon = ({ size = 60, color = "#9C27B0" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#9C27B0" />
    <Path d="M25,20 L35,20 L35,40 L25,40 Z" fill="white" />
    <Path d="M20,25 L25,25 L25,35 L20,35 Z" fill="white" />
    <Path d="M35,25 L40,25 L40,35 L35,35 Z" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">AUD</Text>
  </Svg>
);

export const GenericFileIcon = ({ size = 60, color = "#607D8B" }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60">
    <Rect x="5" y="5" width="50" height="50" rx="8" fill="#607D8B" />
    <Path d="M20,20 L40,20 L40,25 L20,25 Z" fill="white" />
    <Path d="M20,30 L40,30 L40,35 L20,35 Z" fill="white" />
    <Path d="M20,40 L35,40 L35,45 L20,45 Z" fill="white" />
    <Text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">FILE</Text>
  </Svg>
);

export const FileIcon = ({ type:type1, size = 60 }) => {
    let type=type1
  const lowerType = type?.toLowerCase() || '';
  
  if (lowerType.includes('pdf')) {
    return <PdfIcon size={size} />;
  }
  
  if (lowerType.includes('word') || lowerType.includes('doc')) {
    return <DocIcon size={size} />;
  }
  
  if (lowerType.includes('excel') || lowerType.includes('xls') || lowerType.includes('sheet') || lowerType.includes('csv')) {
    return <XlsIcon size={size} />;
  }
  
  if (lowerType.includes('powerpoint') || lowerType.includes('ppt') || lowerType.includes('presentation')) {
    return <PptIcon size={size} />;
  }
  
  if (lowerType.includes('zip') || lowerType.includes('rar') || lowerType.includes('7z') || 
      lowerType.includes('tar') || lowerType.includes('gz')) {
    return <ZipIcon size={size} />;
  }
  
  if (lowerType.includes('apk') || lowerType.includes('android')) {
    return <ApkIcon size={size} />;
  }
  
  if (lowerType.includes('text') || lowerType.includes('txt')) {
    return <TxtIcon size={size} />;
  }
  
  if (lowerType.includes('audio') || lowerType.includes('mp3') || lowerType.includes('wav') || 
      lowerType.includes('aac') || lowerType.includes('flac')) {
    return <AudioIcon size={size} />;
  }
  
  return <GenericFileIcon size={size} />;
};