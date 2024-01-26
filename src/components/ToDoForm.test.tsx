import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ToDoForm from './ToDoForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants';

// Mock useLocalStorage hook
jest.mock('../hooks/useLocalStorage', () => {
  const setTasksMock = jest.fn();

  return {
    __esModule: true,
    default: (key: string, initialValue: any) => {
      return [initialValue, setTasksMock];
    }
  };
});

/**
 * Test suite for ToDoForm component.
 * This test suite uses react-testing-library.
 */
describe('ToDoForm', () => {
  it('should render the form', () => {
    render(<ToDoForm/>);
    const formElement = screen.getByRole('form');

    expect(formElement).toBeInTheDocument();
  });

  it('should render the input', () => {
    render(<ToDoForm/>);
    const inputElement = screen.getByPlaceholderText('Type your task name...');

    expect(inputElement).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    render(<ToDoForm/>);
    const buttonElement = screen.getByText('Add');

    expect(buttonElement).toBeInTheDocument();
  });

  it('should render the error message', () => {
    render(<ToDoForm/>);
    const errorMessageElement = screen.queryByText('Please enter a task in the field.');

    expect(errorMessageElement).not.toBeInTheDocument();
  });

  it('should render the error message when the input is empty', async () => {
    render(<ToDoForm/>);
    const buttonElement = screen.getByText('Add');

    act(() => {
      buttonElement.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Please enter a task in the field.')).toBeInTheDocument();
    });
  });

  it('should add task to the localStorage', async () => {
    render(<ToDoForm/>);
    const inputElement = screen.getByPlaceholderText('Type your task name...');
    const buttonElement = screen.getByText('Add');

    fireEvent.change(inputElement, {target: {value: 'My task'}});

    act(() => {
      buttonElement.click();
    });

    const [, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, []);
    expect(setTasks).toHaveBeenCalledWith([{id: expect.any(String), text: 'My task', createdAt: expect.any(Number)}]);

    await waitFor(() => {
      expect(screen.queryByText('Please enter a task in the field.')).not.toBeInTheDocument();
    });
  });
});
