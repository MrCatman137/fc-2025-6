import React, { useState } from 'react';
import './TaskInput.css';

const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskPoints, setTaskPoints] = useState('');

  const handleAddTask = () => {
    if (taskText.trim() === '' || isNaN(taskPoints) || taskPoints < 1 || taskPoints > 100) {
      return;
    }
    onAddTask(taskText, parseInt(taskPoints));
    setTaskText('');
    setTaskPoints('');
  };

  return (
    <div className="add">
      <input
        type="text"
        id="taskInput"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Введіть нове завдання"
      />
      <div>
        <input
          type="number"
          id="pointsInput"
          value={taskPoints}
          onChange={(e) => setTaskPoints(e.target.value)}
          placeholder="Бали"
          min="1"
          max="100"
        />
        <button onClick={handleAddTask} id="addTaskBtn">
          Додати
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
