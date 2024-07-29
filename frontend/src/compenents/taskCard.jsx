import React, { useState, useEffect } from 'react';

const TaskCard = ({ task, onUpdateTask }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resetTime, setresetTime] = useState(5);

  useEffect(() => {
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
    const minutes = Math.floor(elapsedTime / 60) || '00';
    const seconds = elapsedTime % 60 || '00';
    setTimeTaken(`00:${minutes}:${seconds}`);
    const updatedTask = { ...task, timeTakenToComplete: `00:${minutes}:${seconds}`, endDate: end.toLocaleTimeString(), isCompleted: true };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map(t => (t.id === task.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onUpdateTask(updatedTask);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60) || '00';
    const secs = seconds % 60 || '00';
    return `00:${mins}:${secs}`;
  };

  const handleAddMinutes = () => {
    const newTimeToComplete = parseInt(task.timeToComplete) + resetTime;
    const updatedTask = { ...task, timeToComplete: newTimeToComplete.toString() };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map(t => (t.id === task.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onUpdateTask(updatedTask);
  };
  const handleMinusMinutes = () => {
    const newTimeToComplete = parseInt(task.timeToComplete) - resetTime;
    const updatedTask = { ...task, timeToComplete: newTimeToComplete.toString() };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map(t => (t.id === task.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onUpdateTask(updatedTask);
  };

  const handleEdit = () => {
    const a = 3
  }

  const handleDelete = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = storedTasks.filter(t => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    onUpdateTask(newTasks);
  };

  return (
    <div className="card justify-content-center">
      <div className="d-flex justify-content-between align-items-start mt-3 mb-3">
        {task.isCompleted ? <span className='ml-3'>{task.timeTakenToComplete}</span>
          :
          <div>
            <span className='mt-2 ml-4'>{formatTime(elapsedTime)}</span>
            <span className='ml-3'>
              <a className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</a>
              {task.timeToComplete}
              <a className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</a>
            </span>
          </div>
        }
        <span className="card-title h5 ">{task.title}</span>
        <div>
          {
            task.isCompleted ?
              <div>
                <button className="btn btn-success mr-2" disabled>Completed</button>
                <button className="btn btn-link p-0 mr-2" onClick={handleEdit(task)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-link p-0 mr-4" onClick={handleDelete}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
              :
              <div>
                <button className="btn btn-primary mr-2 " onClick={handleStart} disabled={timerRunning}>Start</button>
                <button className="btn btn-success mr-2" onClick={handleComplete} disabled={!timerRunning}>Complete</button>
                <button className="btn btn-outline-primary mr-2" onClick={() => console.log('Edit Task')}>
                  <i className="fas fa-edit " ></i>
                </button>
                <button className="btn btn-outline-danger  mr-4" onClick={handleDelete}>
                  <i className="fas fa-trash-alt " ></i>
                </button>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
