// src/components/Task.js
import React from 'react';
import './Task.css';

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <span>{`${task.text} (${task.points} балів)`}</span>
      <div className="task-buttons">
        <button
          onClick={onComplete}
          disabled={task.completed}
          className={`complete-btn ${task.completed ? 'completed-btn' : ''}`}
        >
          ✓
        </button>
        <button onClick={onDelete} className="delete-btn">
          ✗
        </button>
      </div>
    </li>
  );
};

export default Task;
