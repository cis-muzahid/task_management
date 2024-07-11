import React, { useState, useEffect } from 'react';

const TaskCard = ({ task, onUpdateTask }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // console.log("useeeffect==",JSON.parse(localStorage.getItem('tasks')) || [])
    let interval;
    if (timerRunning) {
      const start = new Date();
      setStartTime(start.toLocaleTimeString());
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - start) / 1000); 
        setElapsedTime(elapsed);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleStart = () => {
    setTimerRunning(true);
  };

  const handleComplete = () => {
    const end = new Date();
    setEndTime(end.toLocaleTimeString());
    setTimerRunning(false);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    setTimeTaken(`${minutes} min ${seconds} sec`);

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map(t => {
      if (t.id === task.id) {
        return {
          ...t,
          endDate: end.toLocaleTimeString(),
          timeTakenToComplete: `${minutes} min ${seconds} sec`,
          isCompleted: true  
        };
      }
      return t;
    });
    console.log("====",updatedTasks)
    onUpdateTask(updatedTasks);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const handleAddMinutes = () => {
    const newTimeToComplete = parseInt(task.timeToComplete) + 5;
    const updatedTask = { ...task, timeToComplete: newTimeToComplete.toString() };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map(t => (t.id === task.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onUpdateTask(updatedTask);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p>
          Time to Complete: {task.timeToComplete} 
          <button className="btn btn-sm btn-info ml-2" onClick={handleAddMinutes}>+5 add</button>
        </p>
        <p>Elapsed Time: {formatTime(elapsedTime)}</p>
        <p>Time Taken: {task.timeTakenToComplete}</p>
        <button className="btn btn-primary mr-2" onClick={handleStart} disabled={timerRunning}>Start</button>
        <button className="btn btn-success" onClick={handleComplete} disabled={!timerRunning}>Complete</button>
      </div>
    </div>
  );
};

export default TaskCard;
