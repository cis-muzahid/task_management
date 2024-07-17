import React, { useEffect, useState } from 'react';
import './taskList.css';

const TaskStarted = ({task,timerRunning}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      const start = new Date();
      // setStartTime(start.toLocaleTimeString());
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

  const handleComplete = () => {
    // setTimerRunning(false);
    const end = new Date();
    const minutes = Math.floor(elapsedTime / 60) || '00';
    const seconds = elapsedTime % 60 || '00';
    const updatedTask = { ...task, timeTakenToComplete: `00:${minutes}:${seconds}`, endDate: end.toLocaleTimeString(), isCompleted: true };
    // onUpdateTask(updatedTask);
  };

  const handleDelete = () => {
    // onDeleteTask(task.id);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60) || '00';
    const secs = seconds % 60 || '00';
    return `00:${mins}:${secs}`;
  };

console.log(task)
  return (
    <div className="card justify-content-center">
      <div className="d-flex justify-content-between align-items-start mt-3 mb-3">
         {/* <span className='ml-3'>{''}</span> */}
            <span className='mt-2 ml-4'>{formatTime(elapsedTime)}</span>
          <div>
            <span className='ml-3'>
            </span> 
          </div>
        
        <span className='ml-5'>&nbsp;<small>{}</small></span>
        <span className="card-title h5 ml-5 ">{task.title}</span>
        <div>
          {task.status == 'completed' ? (
            <div>
              <button className="btn btn-success mr-2" disabled>Completed</button>
              <button className="btn btn-link p-0 mr-2" onClick={() => console.log('Edit Task')}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-link p-0 mr-4" onClick={handleDelete}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ) : (
            <div>
              <button className="btn btn-success mr-2" onClick={handleComplete} >Complete</button>
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

export default TaskStarted;