import React from 'react';
import { render, screen } from '@testing-library/react';
import ToDoApp from './ToDoApp';

// Mock TodoForm component
jest.mock('./ToDoForm', () => {
  return {
    __esModule: true,
    default: () => <div>ToDoForm</div>
  };
});

/**
 * Test suite for ToDoApp component.
 * This test suite uses react-testing-library.
 */
describe('ToDoApp', () => {
  it('should render the ToDoForm component', () => {
    render(<ToDoApp/>);
    const appElement = screen.getByText('ToDoForm');

    expect(appElement).toBeInTheDocument();
  });
});