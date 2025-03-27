import React from 'react';
import Task from './../Task/Task';
import './TaskList.css';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <div id="tasks" className="tasks">
      {tasks.length === 0 ? (
        <p className="empty-message">Додайте нову таску</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onComplete={() => onComplete(index, task.points)}
            onDelete={() => onDelete(index)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
