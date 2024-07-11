// src/CreateTaskForm.js
import React, { useState } from 'react';
import NavigationBar from '../compenents/NavBar';

const CreateTaskForm = () => {
  const [task, setTask] = useState({
    id : '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    timeToComplete: '',
    timeTakenToComplete:'',
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
        ...task,    
        id: generateUniqueId(), 
      };
    console.log('Task Created:', newTask);

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 9);
    return '_' + timestamp + randomNum;
  };

  return (
    <>
      <NavigationBar />
    <div className="container mt-5">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className='align-left'>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="timeToComplete">Time to Complete (hours)</label>
          <input
            type="number"
            className="form-control"
            id="timeToComplete"
            name="timeToComplete"
            value={task.timeToComplete}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Create Task</button>
      </form>
    </div>
    </>
  );
};

export default CreateTaskForm;
