import React, { useState, useEffect } from 'react';
import TaskCard from '../compenents/taskCardList';
import NavigationBar from '../compenents/NavBar';
import TaskTable from '../compenents/taskTable';
import { TaskListAPI } from '../services/apiContext';
import UpdateTaskModal from '../compenents/updateTaskModel';

const TaskTableList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    date: ''
  });
  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});


  const fetchTasks = async (queryParams = {}) => {
    try {
      const response = await TaskListAPI(queryParams);
      if (response.status === 200) {
        // console.log('Task List:', response.data);
        setTasks(response.data);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    console.log(filters)
  }, []);

  const handleFilterChange = async(e) => {
    const { name, value } = e.target;
    let newFilters = { ...filters };

    if (name === 'status') {
      if (newFilters.status.includes(value)) {
        newFilters.status = newFilters.status.filter((status) => status !== value);
      } else {
        newFilters.status.push(value);
      }
    } else {
      newFilters[name] = value;
    }
    const queryString = createQueryString(newFilters);
    try {
      const response = await TaskListAPI(queryString);
      if (response.status === 200) {
        console.log('Task List:', response.data);
        setTasks(response.data);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(queryString); 
    setFilters(newFilters);
  };

  const createQueryString = (data) => {
    const params = new URLSearchParams();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach(value => params.append(key, value));
      } else {
        if (data[key]) {
          params.append(key, data[key]);
        }
      }
    }
    return params.toString();
  };

  const handleUpdateTask = (data) => {
    console.log(data)
    alert("hdfgsd")
  }

  const handleShowTaskUpdateModal = (data) =>{
    setShowTaskUpdateModal(true);
    setTaskToUpdate(data)
  } 
  const CloseShowTaskUpdateModal = () => {
    setShowTaskUpdateModal(false);
    setTaskToUpdate({})
  }

  return (
    <>
      <NavigationBar />
      <div className='container'>
        <h1>Tasks</h1>
        <div className="row d-flex justify-content-end mb-3">
          <div className="col-auto">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Status filter
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className="form-check ml-3">
                  <input className="form-check-input" type="checkbox" value="completed" id="statusCompleted" name="status" onChange={handleFilterChange} />
                  <label className="form-check-label" htmlFor="statusCompleted">
                    Completed
                  </label>
                </div>
                <div className="form-check ml-3">
                  <input className="form-check-input" type="checkbox" value="started" id="statusStarted" name="status" onChange={handleFilterChange} />
                  <label className="form-check-label" htmlFor="statusStarted">
                    Started
                  </label>
                </div>
                <div className="form-check ml-3">
                  <input className="form-check-input" type="checkbox" value="pending" id="statusPending" name="status" onChange={handleFilterChange} />
                  <label className="form-check-label" htmlFor="statusPending">
                    Pending
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                value={filters.date}
                name="date"
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>

      <TaskTable data={tasks} handleShowTaskUpdateModal={handleShowTaskUpdateModal}/>
      <UpdateTaskModal
          show={showTaskUpdateModal}
          handleClose={CloseShowTaskUpdateModal}
          handleUpdate={handleUpdateTask}
          taskToUpdate={taskToUpdate}
      />
    </>
  );
};

export default TaskTableList;
