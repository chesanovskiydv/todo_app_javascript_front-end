import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskContext from '../contexts/TaskContext';
import ToDoList from './ToDoList';

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
 * Custom render function to wrap the component with the TaskContext provider.
 */
const customRender = (ui: any, {providerProps, ...renderOptions}: any = {}) => {
  return render(
    <TaskContext.Provider {...providerProps}>{ui}</TaskContext.Provider>,
    renderOptions
  );
}

/**
 * Test suite for ToDoList component.
 * This test suite uses react-testing-library.
 */
describe('ToDoList', () => {
  it('should render the table', () => {
    render(<ToDoList/>);
    const tableElement = screen.getByRole('table');

    expect(tableElement).toBeInTheDocument();
  });

  it('should render the table header', () => {
    render(<ToDoList/>);
    const tableHeaderElement = screen.getByText('Task');

    expect(tableHeaderElement).toBeInTheDocument();
  });

  it('should display the list of tasks', () => {
    const tasks = [
      {id: '1', text: 'Task 1', createdAt: new Date().toISOString()},
      {id: '2', text: 'Task 2', createdAt: new Date().toISOString()},
      {id: '3', text: 'Task 3', createdAt: new Date().toISOString()}
    ];
    const providerProps = {value: [tasks, jest.fn()]};
    customRender(<ToDoList/>, {providerProps});
    const task1Element = screen.getByText('Task 1');
    const task2Element = screen.getByText('Task 2');
    const task3Element = screen.getByText('Task 3');

    expect(task1Element).toBeInTheDocument();
    expect(task2Element).toBeInTheDocument();
    expect(task3Element).toBeInTheDocument();
  });
});