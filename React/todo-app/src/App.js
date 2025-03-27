import React, { useState, useEffect } from 'react'; 
import TaskForm from './components/TaskForm/TaskForm'; 
import Progress from './components/Progress/Progress';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [points, setPoints] = useState(parseInt(localStorage.getItem('points')) || 0);

  const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    let requiredPoints = 10;
    let pointsNow = points;
    let level = 0;

    while (pointsNow >= requiredPoints) {
      level++;
      pointsNow -= requiredPoints;
      requiredPoints = Math.floor(requiredPoints * 1.2);
    }

    const remainingPoints = requiredPoints - pointsNow;
    const progressPercentage = ((requiredPoints - remainingPoints) / requiredPoints) * 100;

    return {
      completedCount: completedTasks,
      totalCount: totalTasks,
      userLevel: level,
      progressPercentage,
    };
  };

  const { completedCount, totalCount, userLevel, progressPercentage } = updateStats();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('points', points);
  }, [tasks, points]);

  const addTask = (taskText, taskPoints) => {
    const newTask = { text: taskText, points: taskPoints, completed: false };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (index, taskPoints) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setPoints(points + taskPoints);
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="app-container">
        <TaskForm tasks={tasks} onComplete={completeTask} onDelete={deleteTask} onAddTask={addTask} />
        <Progress
          completedCount={completedCount}
          totalCount={totalCount}
          userLevel={userLevel}
          progressPercentage={progressPercentage}
        />
    </div>
  );
};

export default App;
