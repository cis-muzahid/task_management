import React, { useState } from 'react';

const TaskCreate = ({ onAddTask }) => {
  const initialData = {
    id: '',
    title: '',
    notes: '',
    timeToCompleteTask: 5
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleAddMinutes = () => {
    setData(prevData => ({ ...prevData, timeToCompleteTask: prevData.timeToCompleteTask + 5 }));
  };

  const handleMinusMinutes = () => {
    setData(prevData => {
      const newTimeToComplete = prevData.timeToCompleteTask - 5;
      return newTimeToComplete >= 0 ? { ...prevData, timeToCompleteTask: newTimeToComplete } : prevData;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    // Clear errors if input is filled
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newData = { ...data, id: generateUniqueId() };
      onAddTask(newData);
      setData(initialData);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    }

    return isValid;
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 9);
    return '_' + timestamp + randomNum;
  };

  return (
    <div className='container mt-5'>
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="timeToCompleteTask">Time(min)</label>
                <div className="d-flex">
                  <button className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</button>
                  <input type="text" id="timeToCompleteTask" className="form-control text-center" style={{ width: '70px' }} value={data.timeToCompleteTask} readOnly />
                  <button className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</button>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-6">
                  <label htmlFor="title">Title</label>
                  <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} id="title" name="title" value={data.title} onChange={handleInputChange} />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="notes">Notes</label>
                    <input type="text" className="form-control" id="notes" name="notes" value={data.notes} onChange={handleInputChange} />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="">&nbsp;</label>
                    <button type="submit" className="btn btn-primary btn-block">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="form-group">
                <div className="d-flex">
                </div>
              </div>
            </div>

            <div className="col-md-8">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-6">
                  <small className="text-danger">{errors.title}</small>
                  </div>
                  <div className="form-group col-md-4">

                  </div>  
                  <div className="form-group col-md-2">

                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
