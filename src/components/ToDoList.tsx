import React, { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

/**
 * Table to show the list of todo items.
 * The title of the table is "To Do list".
 * This table contains 1 column: "Task".
 * Tasks should be sorted by creation date in ascending order.
 */
const ToDoList = () => {
  // Work with LocalStorage
  const [tasks] = useContext(TaskContext);

  return (
    <div>
      <h1>To Do list</h1>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Task</th>
        </tr>
        </thead>
        <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.text}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
