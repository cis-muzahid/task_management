// src/CreateTaskForm.js
import React, { useState } from 'react';
import NavigationBar from '../compenents/NavBar';
import { Modal, Button } from 'react-bootstrap';
import { TaskCreateAPI } from '../services/apiContext';
import axios from 'axios';


const CreateTaskForm = () => {
  const [task, setTask] = useState({title:'',description:''});

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newTask = {
    //   ...task,
    //   id: generateUniqueId(),
    // };

    // const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // storedTasks.push(newTask);
    // localStorage.setItem('tasks', JSON.stringify(storedTasks));
    try {
      // const response = await TaskCreateAPI(task);
      const token = sessionStorage.getItem('usr_1a2b3c');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.post('http://127.0.0.1:8000/api/tasks/task-list-create/', task, { headers });

      if (response.status === 201) {
        setShowModal(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      // setError('Failed to create task');
      console.error('Error:', error);
    }
    setShowModal(true);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 9);
    return '_' + timestamp + randomNum;
  };

  const handleCloseModal = () =>{
    setShowModal(false);
    setTask({...task,title:'',description:''})
  } 

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="align-left">Title</label>
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
          {/* <div className="form-group">
            <label htmlFor="time_to_complete">Time to Complete (min)</label>
            <input
              type="number"
              className="form-control"
              id="time_to_complete"
              name="time_to_complete"
              value={task.time_to_complete}
              onChange={handleChange}
              required
            />
          </div> */}

          <button type="submit" className="btn btn-primary mt-3">Create Task</button>
        </form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTaskForm;
