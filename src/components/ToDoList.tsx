import React, { useContext, useMemo } from 'react';
import TaskContext from '../contexts/TaskContext';
import TaskModel from '../models/Task';

/**
 * Table to show the list of todo items.
 * The title of the table is "To Do list".
 * This table contains 2 column: "Task", "Actions".
 * Tasks should be sorted by creation date in ascending order.
 * Actions column should contains 2 buttons: "Complete", "Delete".
 */
const ToDoList = () => {
  // Work with LocalStorage
  const [tasks, setTasks] = useContext(TaskContext);
  const taskModels = useMemo(() => tasks.map(task => TaskModel.fromJson(task)), [tasks]);

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  const completeTask = (taskId: string) => deleteTask(taskId);

  return (
    <div>
      <h1>To Do list</h1>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {taskModels.map(task => (
          <tr key={task.id}>
            <td>{task.text}</td>
            {/* Limit max column width */}
            <td style={{maxWidth: '240px', width: '240px'}}>
              <button type="button" className="btn btn-primary mx-1" onClick={() => completeTask(task.id)}>Complete</button>
              <button type="button" className="btn btn-danger mx-1" onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
