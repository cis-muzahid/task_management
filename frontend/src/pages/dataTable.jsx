import React, { useState, useEffect } from "react";
import NavigationBar from "../compenents/NavBar";
import TaskTable from "../compenents/taskTable";
import {
  GetTaskTitleList,
  TaskDeleteAPI,
  TaskListAPI,
  UpdateTaskAPI,
} from "../services/apiContext";
import UpdateTaskModal from "../compenents/updateTaskModel";
import { CreateQueryString } from "../utils/utitlity";
import AlertModel from "../compenents/alertModel";
import showSuccessToast from "../compenents/successToaster";
import { ToastContainer } from "react-toastify";
import showAlertToast from "../compenents/alertToast";

const TaskTableList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    date: "",
    search: "",
  });
  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [taskTitles, setTaskTitles] = useState([]);
  const [checkedTasks,setCheckedTasks] = useState([]);
  const [totalTimeTaken,setTotalTimeTaken] = useState('00:00:00');

  const fetchTasks = async (queryParams = {}) => {
    try {
      const response = await TaskListAPI(queryParams);
      if (response.status === 200) {
        console.log(response.data)
        const newTasks = response.data.filter((task) => task.status == 'completed');
        setTasks(newTasks);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTaskTitle = async () => {
    try {
      const response = await GetTaskTitleList();
      if (response.status === 200) {
        const newTaskTitles = response.data.map((task) => task.name);
        setTaskTitles(newTaskTitles);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchTaskTitle();
  }, []);

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    let newFilters = { ...filters };

    if (name === "status") {
      if (newFilters.status.includes(value)) {
        newFilters.status = newFilters.status.filter(
          (status) => status !== value
        );
      } else {
        newFilters.status.push(value);
      }
    } else {
      newFilters[name] = value;
    }
    const queryString = CreateQueryString(newFilters);
    try {
      const response = await TaskListAPI(queryString);
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setFilters(newFilters);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskToUpdate.id ? { ...task, ...response.data } : task
          )
        );
        showSuccessToast("Task Updated Successfully");
      }
      CloseShowTaskUpdateModal();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const HandleDeleteTask = async (taskId) => {
    try {
      const response = await TaskDeleteAPI(taskId);
      if (response.status === 204) {
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
        showAlertToast("Task Deleted Successfully");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowTaskUpdateModal = (task) => {
    setTaskToUpdate(task);
    setShowTaskUpdateModal(true);
  };
  const CloseShowTaskUpdateModal = () => {
    setShowTaskUpdateModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const calculateCompletionTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime); 
    const completionTime = (end - start) / 60000; 
    return completionTime;
  };

  const HandleCheckedTasks = (task) => {
    const isTaskChecked = checkedTasks.some((t) => t.id === task.id);

    let updatedCheckedTasks;

    if (isTaskChecked) {
      updatedCheckedTasks = checkedTasks.filter((t) => t.id !== task.id);
    } else {
      updatedCheckedTasks = [...checkedTasks, task];
    }

    setCheckedTasks(updatedCheckedTasks);

    const formatTime = (minutes) => {
      const totalSeconds = Math.floor(minutes * 60);
      const hours = Math.floor(totalSeconds / 3600);
      const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutesLeft
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const totalCompletionTime = updatedCheckedTasks.reduce((totalTime, t) => {
      const completionTime = calculateCompletionTime(t.start_time, t.end_time);
      return totalTime + completionTime;
    }, 0);

    const formattedTime = formatTime(totalCompletionTime);

    setTotalTimeTaken(formattedTime)
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Tasks</h1>
              {
        totalTimeTaken && totalTimeTaken !== '00:00:00' ? <h3>Total Time Taken - {totalTimeTaken}</h3>:<span className="mb-5"></span>
      }
      </div>
        <div className="row d-flex justify-content-end mb-3">
          {/* <div className="col-auto">
            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
          </div> */}
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
          <div className="col-auto">
            <div className="input-group">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search"
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

      <TaskTable
        data={tasks}
        handleShowTaskUpdateModal={handleShowTaskUpdateModal}
        onDeleteTask={HandleDeleteTask}
        HandleCheckedTasks={HandleCheckedTasks}
      />

      <AlertModel
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalMessage={modalMessage}
      />

      {taskToUpdate && (
        <UpdateTaskModal
          show={showTaskUpdateModal}
          taskTitles={taskTitles}
          handleClose={CloseShowTaskUpdateModal}
          handleUpdate={handleUpdateTask}
          taskToUpdate={taskToUpdate}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default TaskTableList;
