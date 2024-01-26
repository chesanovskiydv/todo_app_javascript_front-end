import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task } from '../models/Task';

type TaskContextType = ReturnType<typeof useLocalStorage<Task[]>>;

const initialState: TaskContextType= [[], () => {}];

/**
 * Task Context component.
 */
const TaskContext = createContext<TaskContextType>(initialState);

export default TaskContext;
