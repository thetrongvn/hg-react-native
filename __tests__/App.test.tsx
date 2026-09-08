/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import SplashScreen from '../src/app/SplashScreen';
import BootstrapError from '../src/app/BootstrapError';

test('renders bootstrap splash', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<SplashScreen />);
  });
});

test('renders bootstrap error', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<BootstrapError message="boom" />);
  });
});
