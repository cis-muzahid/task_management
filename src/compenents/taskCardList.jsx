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

  // const handleComplete = () => {
  //   setTimerRunning(false);
  //   const end = new Date();
  //   const minutes = Math.floor(elapsedTime / 60) || '00';
  //   const seconds = elapsedTime % 60 || '00';
  //   const updatedTask = { ...task, timeTakenToComplete: `00:${minutes}:${seconds}`, endDate: end.toLocaleTimeString(), isCompleted: true };
  //   onUpdateTask(updatedTask);
  // };

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

  function calculateTimeTaken(startTime, endTime) {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const differenceInMilliseconds = end - start;
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
          <td>{calculateTimeTaken(task.start_time, task.end_time)}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
      {/* <div className=" justify-content-center">
        <div className='row'>

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
          <span className="col-md-2">{calculateTimeTaken(task.start_time, task.end_time)}&nbsp;</span>
          <span className="col-md-5">{task.title}</span>

          <div className='col-md-5'>
            {task.description}
          </div>

        </div>
      </div> */}
    </>
  );
};

export default TaskCard;
