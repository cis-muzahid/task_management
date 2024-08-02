import React, { useEffect, useState } from 'react';

const TaskStarted = ({ task, timerRunning, onHandleComplete, showTaskUpdateModel }) => {
  const handleComplete = () => {
    onHandleComplete(task);
  };

  return (
    <>
      <div className='container mt-5'>
        <div className="">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="timeToCompleteTask">Time</label>
                  <div className="card-title">{task.total_time_to_complete}</div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-4">
                    <label htmlFor="title">Title</label>
                    <div className="card-title h5 ">{task.title}</div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="notes">Description</label>
                    <div className="card-title h5 ">{task.description ? task.description : ''}</div>
                  </div>
                  <div className="form-group col-md-4 d-flex justify-content-end">
                    <button className="btn btn-success mr-2" onClick={handleComplete}>Complete</button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => showTaskUpdateModel(task)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default TaskStarted;