import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReduxProvider } from './Example';
import '@testing-library/jest-dom';

test('renders Redux provider', () => {
  render(<ReduxProvider />);
  const well = screen.getByText(/well/);
  expect(well).toBeInTheDocument();
})
