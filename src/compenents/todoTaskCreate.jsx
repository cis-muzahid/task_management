import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAlertTimeAPI, TaskCreateAPI } from '../services/apiContext';

const TaskCreate = ({ onAddTask, timeTocomplete, taskTitles }) => {
  const initialData = {
    title: '',
    description: '',
    total_time_to_complete: '',
    status:'started'
  };


  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(prevData => ({ ...prevData, total_time_to_complete: Number(localStorage.getItem('time_to_complete')) }));
  }, [])

  const handleAddMinutes = () => {
    setData(prevData => ({ ...prevData, total_time_to_complete: prevData.total_time_to_complete + 5 }));
  };

  const handleMinusMinutes = () => {
    setData(prevData => {
      const newTimeToComplete = prevData.total_time_to_complete - 5;
      return newTimeToComplete >= 0 ? { ...prevData, total_time_to_complete: newTimeToComplete } : prevData;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    // Clear errors if input is filled
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      onAddTask(data);
      // setData(initialData);
      setData(prevData => ({ ...prevData, total_time_to_complete: Number(localStorage.getItem('time_to_complete')), title: '', description: '' }));
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

  // const popularTitles = ['Meeting', 'Report', 'Email Follow-up', 'Code Review', 'Design Review'];

  return (
    <div className='container mt-5'>
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="timeToCompleteTask">Time(min)</label>
                <div className="d-flex">
                  <button className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</button>
                  <input type="text" id="timeToCompleteTask" className="form-control text-center" style={{ width: '70px' }} value={data.total_time_to_complete} readOnly />
                  <button className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</button>
                </div>
              </div>
            </div>

            <div className="col-md-10">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-4">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      id="title"
                      name="title"
                      value={data.title}
                      onChange={handleInputChange}
                      list="popular-titles"
                    />
                    <datalist id="popular-titles">
                      {taskTitles.map((title, index) => (
                        <option key={index} value={title} />
                      ))}
                    </datalist>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="notes">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={data.description} onChange={handleInputChange} />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="">&nbsp;</label>
                    <button type="submit" className="btn btn-primary btn-block">Start</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {
            errors ?
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
          </div> :''
          }

        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
