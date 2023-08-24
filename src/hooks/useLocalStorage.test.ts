import { renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import { act } from 'react-dom/test-utils';

// Mock window.localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => {
        return store[key] || null;
      },
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  }
)();

/**
 * Tests for the useLocalStorage hook using Jest.
 */
describe('useLocalStorage', () => {
  const originalLocalStorage = window.localStorage;

  // Mock localStorage before tests
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock});
  });

  // UnMock localStorage after all tests
  afterAll(() => {
    Object.defineProperty(window, 'localStorage', {value: originalLocalStorage});
  });

  it('should return the initial value', () => {
    const {result: {current: [value]}} = renderHook(() => useLocalStorage('test', 'initial'));

    expect(value).toBe('initial');
  });

  it('should return the value from localStorage if it exists', () => {
    localStorage.setItem('test', JSON.stringify('from local storage'));
    const {result: {current: [value]}} = renderHook(() => useLocalStorage('test', 'initial'));

    expect(value).toBe('from local storage');
  });

  it('should save the value to localStorage', () => {
    const {result: {current: [, setValue]}} = renderHook(() => useLocalStorage('test', 'initial'));

    act(() => {
      setValue('new value');
    });
    const {result: {current: [value]}} = renderHook(() => useLocalStorage('test', 'initial'));

    expect(value).toBe('new value');
  });
});