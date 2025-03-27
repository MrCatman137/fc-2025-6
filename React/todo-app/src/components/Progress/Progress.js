// src/components/Progress.js
import React from 'react';
import './Progress.css';

const Progress = ({ completedCount, totalCount, userLevel, progressPercentage }) => {
  return (
    <div className="progresion">
      <p>
        Виконано: <span id="completedCount">{completedCount}</span> / <span id="totalCount">{totalCount}</span>
      </p>
      <p>Рівень користувача: <span id="userLevel">{userLevel}</span></p>
      <div className="progress-bar">
        <div
          id="progress"
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
