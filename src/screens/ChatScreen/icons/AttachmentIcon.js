import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const AttachmentIcon = ({ width = 24, height = 24, color = '#666', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8 22C6.40278 22 4.87584 21.3658 3.75 20.24C2.62416 19.1142 2 17.5872 2 16C2 14.4128 2.62416 12.8858 3.75 11.76L12.33 3.18C13.0837 2.42642 14.1428 2 15.25 2C16.3572 2 17.4163 2.42642 18.17 3.18C18.9236 3.93365 19.35 4.99278 19.35 6.1C19.35 7.20722 18.9236 8.26635 18.17 9.02L9.58 17.6C9.23463 17.9454 8.74085 18.1 8.27 18.1C7.79915 18.1 7.30537 17.9454 6.96 17.6C6.61463 17.2546 6.46 16.7608 6.46 16.29C6.46 15.8192 6.61463 15.3254 6.96 14.98L15.15 6.8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AttachmentIcon;