import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAlertTimeAPI, TaskCreateAPI } from '../services/apiContext';

const TodoCreate = ({onCreateTodo,todoError}) => {
  const initialData = {
    title: '',
    description: '',
  };


  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreateTodo(data);
      setData(prevData => ({ ...prevData, title: '', description: '' }));
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


  // const popularTitles = ['Meeting', 'Report', 'Email Follow-up', 'Code Review', 'Design Review'];

  return (
    <div className='container mt-5'>
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            {/* <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="timeToCompleteTask">Time(min)</label>
                <div className="d-flex">
                  <button className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</button>
                  <input type="text" id="timeToCompleteTask" className="form-control text-center" style={{ width: '70px' }} value={data.total_time_to_complete} readOnly />
                  <button className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</button>
                </div>
              </div>
            </div> */}

            <div className="col-md-12">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-10">
                    <label htmlFor="title">Todo</label>
                    <input
                      type="text"
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      id="title"
                      name="title"
                      value={data.title}
                      onChange={handleInputChange}                    />
                  </div>
                  {/* <div className="form-group col-md-6">
                    <label htmlFor="notes">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={data.description} onChange={handleInputChange} />
                  </div> */}
                  <div className="form-group col-md-2">
                    <label htmlFor="">&nbsp;</label>
                    <button type="submit" className="btn btn-primary btn-block">Start</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row align-items-center">
            {/* <div className="col-md-4">
              <div className="form-group">
                <div className="d-flex">
                </div>
              </div>
            </div> */}

            <div className="col-md-8">
              <div className="form-row align-items-end">
                <div className="form-group col-md-12">
                  <small className="text-danger">{errors.title}</small>
                  {
                    todoError?<small className="text-danger">{todoError}</small>:''
                  }
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

export default TodoCreate;
