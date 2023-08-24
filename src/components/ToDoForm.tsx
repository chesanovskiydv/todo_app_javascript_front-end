import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants';
import { getRandomId } from '../utils';

// Type for task
type Task = {
  id: string;
  text: string;
  createdAt: number;
}

/**
 * Form to add new todo items.
 * This form contains a text input without a label and a submit button with text "Add".
 * Bootstrap 5 classes are used to style the form.
 * When user type a task name and click on the submit button, the task should be added to the localStorage.
 * LocalStorage key should be "todo_app".
 * After submit, the text input should be cleared.
 * If the text input is empty, error should be shown.
 */
const ToDoForm = () => {
  const [taskText, setTaskText] = useState('');
  const [hasError, setHasError] = useState(false);
  // Work with LocalStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);

  // onChange task handler
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
    setHasError(false);
  }

  // Add task
  const addTask = () => {
    if (taskText.length === 0) {
      setHasError(true);
      return;
    }
    const task: Task = {id: getRandomId(), text: taskText, createdAt: Date.now()};

    setTasks([...tasks, task]);
    setTaskText('');
  }

  return (
    <div>
      <h1>Add task</h1>
      <form onSubmit={e => e.preventDefault()}>
        <div className="row g-3">
          <div className="col">
            <input type="text" className={`form-control ${hasError ? 'is-invalid' : ''}`}
                   placeholder="Type your task name..." id="task" maxLength={128}
                   value={taskText}
                   onChange={onChangeTask}/>
            {hasError && (
              <div className="invalid-feedback">
                Please enter a task in the field.
              </div>
            )}
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-primary" onClick={addTask}>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToDoForm;
