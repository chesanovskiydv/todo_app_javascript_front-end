import { useCallback, useState } from 'react';

/**
 * The hook that should be used to get and set data in local storage.
 * It should accept key and initial value as arguments, and return the current value and a setter function.
 * The setter function should accept a new value and save it to local storage.
 * The hook should also handle parsing JSON data and catching errors.
 *
 * Code below it is a modified version of the code from https://usehooks-ts.com/react-hook/use-local-storage
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {

  // Get from local storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T) => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      // Allow value to be a function, so we have same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;
