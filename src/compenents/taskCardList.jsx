import React, { useState } from 'react';
import './taskList.css';

const TaskCard = ({ task, onUpdateTask, onDeleteTask, onStartTask }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resetTime, setresetTime] = useState(5);

    const handleStart = () => {
        setTimerRunning(true);
        onStartTask(task);
    };

  const handleComplete = () => {
    setTimerRunning(false);
    const end = new Date();
    const minutes = Math.floor(elapsedTime / 60) || '00';
    const seconds = elapsedTime % 60 || '00';
    const updatedTask = { ...task, timeTakenToComplete: `00:${minutes}:${seconds}`, endDate: end.toLocaleTimeString(), isCompleted: true };
    onUpdateTask(updatedTask);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
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

  return (
    <div className="card justify-content-center">
      <div className="d-flex justify-content-between align-items-start mt-3 mb-3">
        {/* {task.isCompleted ? <span className='ml-3'>{task.timeTakenToComplete}</span>
          :
          <div>
            <span className='mt-2 ml-4'>{formatTime(elapsedTime)}</span>
            <span className='ml-3'>
              <a className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</a>
              {task.timeToComplete}
              <a className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</a>
            </span>
          </div>
        } */}
        <span className='ml-5'>{task.timeToCompleteTask}&nbsp;<small>min</small></span>
        <span className="card-title h5 ml-5 ">{task.title}</span>
        <div>
          {task.isCompleted ? (
            <div>
              <button className="btn btn-success mr-2" disabled>Completed</button>
              <button className="btn btn-outline-primary mr-2" onClick={() => console.log('Edit Task')}>
                <i className="fas fa-edit " ></i>
              </button>
              <button className="btn btn-outline-danger  mr-4" onClick={handleDelete}>
                <i className="fas fa-trash-alt " ></i>
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
