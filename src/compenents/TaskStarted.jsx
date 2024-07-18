import React, { useEffect, useState } from 'react';
import './taskList.css';

const TaskStarted = ({ task, timerRunning,onHandleComplete }) => {

  // const handleComplete = () => {
  //   // setTimerRunning(false);
  //   const end = new Date();
  //   const minutes = Math.floor(elapsedTime / 60) || '00';
  //   const seconds = elapsedTime % 60 || '00';
  //   const updatedTask = { ...task, timeTakenToComplete: `00:${minutes}:${seconds}`, endDate: end.toLocaleTimeString(), isCompleted: true };
  //   // onUpdateTask(updatedTask);
  // };
  

  const handleComplete = () => {
     onHandleComplete(task);
  };

  const handleDelete = () => {
    // onDeleteTask(task.id);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60) || '00';
    const secs = seconds % 60 || '00';
    return `00:${mins}:${secs}`;
  };

  const formatDateToDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

  return (
    <>
      <div className='container mt-5'>
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="timeToCompleteTask">Started time</label>
                    <div className="card-title">{formatDateToDisplay(task.start_time)}</div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-4">
                    <label htmlFor="title">Title</label>
                    <div className="card-title h5 ">{task.title}</div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="notes">Description</label>
                    <div className="card-title h5 ">{task.description ? task.description : ''}</div>
                  </div>
                  <div className="form-group col-md-2">
                    {/* <label htmlFor="">&nbsp;</label> */}
                    <button className="btn btn-success mr-2" onClick={handleComplete} >Complete</button>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row align-items-center">
              <div className="col-md-4">
                <div className="form-group">
                  <div className="d-flex">
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-6">
                    <small className="text-danger">{ }</small>
                  </div>
                  <div className="form-group col-md-4">

                  </div>
                  <div className="form-group col-md-2">

                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>

  );
};

export default TaskStarted;