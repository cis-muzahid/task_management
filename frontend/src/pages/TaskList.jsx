import React, { useState, useEffect } from 'react';
import TaskTable from '../compenents/taskTable';
import { GetTaskTitleAPI, TaskDeleteAPI, TaskListAPI, UpdateTaskAPI, GetTaskTitleListAPI, GetTaskTitleList } from '../services/apiContext';
import UpdateTaskModal from '../compenents/updateTaskModel';
import { CreateQueryString } from '../utils/utitlity';
import AlertModel from '../compenents/alertModel';
import SettingTaskTable from '../compenents/SettingTaskTable';

const TaskList = ({deleteTitle, updatetTitle}) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    date: '',
    search: ''
  });
  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchTasks = async (queryParams = {}) => {
    try {
      const response = await GetTaskTitleListAPI(queryParams);
      if (response.status === 200) {
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
  }, []);

  const handleFilterChange = async (e) => {
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
    const queryString = CreateQueryString(newFilters);
    console.log('queryString', queryString)
    try {
        const response =  await GetTaskTitleList(queryString)
        console.log('response', response)
    //   const response = await TaskListAPI(queryString);
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setFilters(newFilters);
  };



//   const handleUpdateTask = async (updatedTask) => {
//     try {
//       const response = await UpdateTaskAPI(updatedTask)
//       if (response.status === 200) {
//         setTasks((prevTasks) =>
//           prevTasks.map((task) =>
//             task.id === taskToUpdate.id ? { ...task, ...response.data } : task
//           )
//         );
//       }
//       CloseShowTaskUpdateModal();
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   }


//   const HandleDeleteTask = async (taskId) => {
//     try {
//       const response = await TaskDeleteAPI(taskId);
//       if (response.status === 204) {
//         const updatedTasks = tasks.filter(t => t.id !== taskId);
//         setTasks(updatedTasks);
//         setModalMessage('Task Deleted Successfully')
//         setShowModal(true)
//       } else {
//         console.error('Error:', response);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  const handleShowTaskUpdateModal = (task) => {
    setTaskToUpdate(task);
    setShowTaskUpdateModal(true);
  }
  const CloseShowTaskUpdateModal = () => {
    setShowTaskUpdateModal(false);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='container'>
        <h1>Tasks Title</h1>
        <div className="row d-flex justify-content-end mb-3">

         
        
          <div className="col-auto">
            <div className="input-group">
              <div className="input-group">
                <input
                  type="text"
                  placeholder='Search'
                  className="form-control"
                  value={filters.search}
                  name="search"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SettingTaskTable data={tasks} handleShowTaskUpdateModal={(data)=>updatetTitle(data)} onDeleteTask={(id)=>deleteTitle(id)}/>

      <AlertModel
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalMessage={modalMessage}
      />

      {/* {taskToUpdate && (
        <UpdateTaskModal
          show={showTaskUpdateModal}
          handleClose={CloseShowTaskUpdateModal}
          handleUpdate={handleUpdateTask}
          taskToUpdate={taskToUpdate}
        />
      )} */}
    </>
  );
};

export default TaskList;
