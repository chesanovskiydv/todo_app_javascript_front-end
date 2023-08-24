import getRandomId from '../utils/getRandomId';

// Type for task
export type Task = {
  id: string;
  text: string;
  createdAt: number;
}

/**
 * Model for the task.
 * It contains id, text and createdAt.
 * Id is a random string from getRandomId.
 * createdAt is the current time in milliseconds.
 * It conta
 */
export class TaskModel {
  // Id of the task
  id: string;

  // Text of the task
  text: string;

  // Created at time of the task
  createdAt: number;

  /**
   * Constructor for the task model.
   */
  constructor(text: string) {
    this.id = getRandomId();
    this.text = text;
    this.createdAt = Date.now();
  }

  /**
   * Get the task as a JSON object.
   */
  getJson(): Task {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
    };
  }

  /**
   * Static method to create a task.
   */
  static create(text: string): TaskModel {
    return new TaskModel(text);
  }

  /**
   * Static method to create a task from a JSON object.
   */
  static fromJson(task: Task): TaskModel {
    const taskModel = new TaskModel(task.text);
    taskModel.id = task.id;
    taskModel.createdAt = task.createdAt;
    return taskModel;
  }
}

export default TaskModel;
