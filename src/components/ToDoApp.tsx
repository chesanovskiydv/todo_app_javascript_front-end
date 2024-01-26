import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TaskContext from '../contexts/TaskContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_TODO_APP_KEY } from '../constants';
import { Task } from '../models/Task';

/**
 * The main component of the todo application.
 * This component contains the form to add new todo items.
 * Bootstrap classes are used to style the form.
 * Base tag should be a bootstrap container.
 */
const ToDoApp = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_TODO_APP_KEY, []);

  return (
    <TaskContext.Provider value={[tasks, setTasks]}>
      <div className="container">
        <ToDoForm/>
        <ToDoList/>
      </div>
    </TaskContext.Provider>
  );
}

export default ToDoApp;