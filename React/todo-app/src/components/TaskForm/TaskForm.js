import React from 'react';
import TaskList from './../TaskList/TaskList';
import TaskInput from './../TaskInput/TaskInput';
import './TaskForm.css';

const TaskForm = ({ tasks, onComplete, onDelete, onAddTask }) => {
  return (
    <div className="tasks-container">
      <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
      <TaskInput onAddTask={onAddTask} />
    </div>
  );
};

export default TaskForm;
