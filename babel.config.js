module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@components': './src/components',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@RootNavigation': './src/navigation/RootNavigator',
          '@nativeModules': './src/nativeModules',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
    'react-native-worklets/plugin',
  ],
};
