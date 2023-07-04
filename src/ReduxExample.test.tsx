import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReduxExample } from './ReduxExample';
import '@testing-library/jest-dom';

test('renders Redux provider', () => {
  render(<ReduxExample />);
  const well = screen.getByText(/well/);
  expect(well).toBeInTheDocument();
})
