import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('react-native-worklets', () => ({
  createSerializable: (value: any) => value,
}));
jest.mock('@react-navigation/drawer', () => {
  return {
    createDrawerNavigator: () => {
      const Navigator = ({ children }: any) => children as any;
      const Screen = () => null;
      return { Navigator, Screen };
    },
  };
});
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      dispatch: jest.fn(),
      canGoBack: () => true,
      goBack: jest.fn(),
    }),
  };
});


