import React from 'react';
import ToDoForm from './ToDoForm';

/**
 * The main component of the todo application.
 * This component contains the form to add new todo items.
 * Bootstrap classes are used to style the form.
 * Base tag should be a bootstrap container.
 */
const ToDoApp = () => {
  return (
    <div className="container">
      <ToDoForm/>
    </div>
  );
}

export default ToDoApp;