import React, { useState, useEffect } from 'react';


const TaskCreate = () => {
    const [data, setData] = useState({ taskTitle: "", notes: "" });
    const [resetTime, setResetTime] = useState(10);
  
    const handleAddMinutes = () => {
      const newTimeToComplete = resetTime + 5;
      console.log("====", newTimeToComplete);
      setResetTime(newTimeToComplete);
    };
  
    const handleMinusMinutes = () => {
      const newTimeToComplete = resetTime - 5;
      if (newTimeToComplete >= 0) {
        setResetTime(newTimeToComplete);
      } else {
        console.warn("Time cannot be negative");
      }
    };

    const handleSubmit = () => {
        console.log(data)
    }
    return (
        <div className='container mt-5'>
            <div className="card justify-content-center">
                <div className="d-flex justify-content-between align-items-start mt-3 mb-3">
                    {/* <form > */}
                        <div>
                            <span className='mt-2 ml-4'></span>
                            <span className='ml-3'>
                                <a className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</a>{resetTime}
                                <a className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</a>
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <span className="card-title "> <label>Title</label> <input type='text' name='title' value={data.title}/></span>
                        <span className="card-title "> <label>Notes</label> <input type='text' name='notes' value={data.title}/></span>
                        </form>
                        <div>
                            <div>
                                <button className="btn btn-primary mr-2 " >Create</button>
                            </div>
                        </div>
                        {/* </form > */}
                </div>
            </div>
        </div>
    );
};

export default TaskCreate;
