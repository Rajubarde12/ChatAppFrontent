import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HeaderBackButton, HeaderBellButton, HeaderMenuButton } from '../src/components/HeaderButtons';

describe('HeaderButtons', () => {
  it('renders menu button and triggers press', () => {
    const onPress = jest.fn();
    const screen = render(<HeaderMenuButton onPress={onPress} />);
    fireEvent.press(screen.getByLabelText('Open menu'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders back button and triggers press', () => {
    const onPress = jest.fn();
    const screen = render(<HeaderBackButton onPress={onPress} />);
    fireEvent.press(screen.getByLabelText('Go back'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders bell button and triggers press', () => {
    const onPress = jest.fn();
    const screen = render(<HeaderBellButton onPress={onPress} />);
    fireEvent.press(screen.getByLabelText('Open notifications'));
    expect(onPress).toHaveBeenCalled();
  });
});


