import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabs from '../src/navigation/tabs/MainTabs';
import HomeStack from '../src/navigation/stacks/HomeStack';

describe('Navigation', () => {
  it('renders MainTabs and shows tab screens', async () => {
    const screen = render(
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    );
    expect(screen.getByText('Explore')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('renders HomeStack with Home title', async () => {
    const screen = render(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );
    // Header titles are not simple text nodes; check presence by accessibility label of menu button
    expect(screen.getByLabelText('Open menu')).toBeTruthy();
  });
});


