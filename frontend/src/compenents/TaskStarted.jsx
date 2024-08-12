import React, { useEffect, useState } from 'react';

const TaskStarted = ({ task, timerRunning, onHandleComplete, showTaskUpdateModel, updateTask }) => {
  const handleComplete = () => {
    onHandleComplete(task);
  };

  const [data, setData] = useState(task);

  const handleAddMinutes = () => {
    setData((prevData) => {
      const newData = {
        ...prevData,
        total_time_to_complete: prevData.total_time_to_complete + 5,
      };
      console.log(newData); 
      updateTask(newData)
      return newData;
    });
  };

  const handleMinusMinutes = () => {
    setData((prevData) => {
      const newTimeToComplete = prevData.total_time_to_complete - 5;
      const newData = newTimeToComplete >= 0
        ? { ...prevData, total_time_to_complete: newTimeToComplete }
        : prevData;
      
      console.log(newData);
      updateTask(newData)
      return newData;
    });
  };
  

  return (
    <>
      <div className='container mt-5'>
        <div className="">
          <div className="card-body">
            <div className="row align-items-center">
              {/* <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="timeToCompleteTask">Time</label>
                  <div className="card-title">{task.total_time_to_complete}</div>
                </div>
              </div> */}

              <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="timeToCompleteTask">Time(min)</label>
                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-primary text-white mr-2"
                    onClick={handleMinusMinutes}
                  >
                    &nbsp;-&nbsp;
                  </button>
                  <input
                    type="text"
                    id="timeToCompleteTask"
                    className="form-control text-center"
                    style={{ width: "70px" }}
                    value={data.total_time_to_complete}
                    readOnly
                  />
                  <button
                    className="btn btn-sm btn-primary text-white ml-2"
                    onClick={handleAddMinutes}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

              <div className="col-md-10">
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
                      className="btn btn-primary"
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