import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';

import { renderWithProviders } from './test-utils/mock';

test('renders frontpage', () => {
  renderWithProviders(<App />);

  const linkElement = screen.getByText(/AI ννΌλ/i);
  expect(linkElement).toBeInTheDocument();
});
