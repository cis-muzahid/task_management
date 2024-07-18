import React, { useEffect, useState } from "react";
import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/todoTaskCreate";
import TaskCard from "../compenents/taskCardList";
import TaskStarted from "../compenents/TaskStarted";
import { GetAlertTimeAPI, TaskCreateAPI, TaskDeleteAPI, TaskListAPI, UpdateTaskAPI } from "../services/apiContext";
import AlertModel from "../compenents/alertModel";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [startedTask, setStartedTask] = useState({});




  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleStart = () => {
    setTimerRunning(true);
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => {
          const newElapsedTime = prevElapsedTime + 1000;
          localStorage.setItem('elapsedTime', newElapsedTime);
          return newElapsedTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskListAPI();
        if (response.status === 200) {
          setTasks(response.data);
          const startedTask = response.data.find(task => task.status === 'started');
          const pendingTask = response.data.filter(task => task.status === 'pending');
          if (pendingTask) {
            setPendingTasks(pendingTask)
          }
          if (startedTask) {
            setStartedTask(startedTask);
            const startTime = new Date(startedTask.start_time).getTime();
            const currentTime = new Date().getTime();
            const savedElapsedTime = localStorage.getItem('elapsedTime') || 0;
            const timeElapsed = (currentTime - startTime) + parseInt(savedElapsedTime, 10);
            setElapsedTime(timeElapsed);
            setTimerRunning(true);
            console.log("ttt==", elapsedTime)
          }
        } else {
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTasks();

    const fetchAlertTime = async () => {
      try {
        const response = await GetAlertTimeAPI();
        if (response.status === 200) {
          console.log(response.data)
          // setTimeTocomplete(response.data.default_alert_time)
          localStorage.setItem("time_to_complete",response.data.default_alert_time);
        } else {
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchAlertTime();
    console.log(startedTask)
    setStartedTask({});

  }, []);

  const addTask = async (newTask) => {
    try {
      console.log('newTask=====', newTask)
      const response = await TaskCreateAPI(newTask);
      if (response.status === 201) {
        console.log('Task Created:', response.data);
        const updatedTasks = [...tasks, response.data];
        setTasks(updatedTasks);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await TaskDeleteAPI(taskId);
      if (response.status === 204) {
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startTask = (task) => {
    if (isEmptyObject(startedTask)) {
      const currentDateTime = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const updatedTask = { ...task, start_time: new Date().toISOString(), status: 'started' };
      console.log("Task started:", updatedTask);

      const updateTask = async () => {
        try {
          const response = await UpdateTaskAPI(updatedTask);
          if (response.status === 200) {
            console.log('started Task List:', response.data);
            setStartedTask(response.data);
            setTimerRunning(true);
            localStorage.setItem('startTime', new Date().getTime());
            localStorage.setItem('elapsedTime', 0);
          } else {
            console.error('Error:', response);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      updateTask();

    } else {
      setModalMessage("A task is already running. Please complete the current task before starting a new one.");
      setShowModal(true);
    }
  };


  const CompleteTask = async (task) => {
    const updatedTask = { ...task, end_time: new Date().toISOString(), status: 'completed' };
    console.log("Task started:", updatedTask);
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        console.log('started Task List:', response.data);
        setStartedTask({})
        setTimerRunning(false);
        setElapsedTime(0)
        setModalMessage("Task completed successfully!");
        setShowModal(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const clearStartedTask = () => {
    setStartedTask(null);
    localStorage.removeItem('startedTask');
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const formatElapsedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // window.location.reload(); 
  };

  return (
    <>
      <NavigationBar />
      <div className="text-center mt-5 h1">Running Task</div>
      <div className="container">
        <div className="row w-100 mt-3">
          <div className="col-12 d-flex justify-content-center">
            <h1>{formatElapsedTime(elapsedTime)}</h1>
          </div>
        </div>
        {isEmptyObject(startedTask) ? <p>No task started</p> : <TaskStarted task={startedTask} timerRunning={timerRunning} onHandleComplete={CompleteTask} />}
      </div>

      <div className="text-center mt-5 h1">Create Task</div>
      <TaskCreate onAddTask={addTask}/>
      <div className="container">
        <div className="text-center mt-5 h1">TODOS</div>
        {tasks.map((task, index) => (
          <div key={index} className="mt-2">
            <TaskCard task={task} onUpdateTask={updateTask} onDeleteTask={deleteTask} onStartTask={startTask} />
          </div>
        ))}
      </div>
      <AlertModel handleCloseModal={handleCloseModal} showModal={showModal} modalMessage={modalMessage} />
    </>
  );
};
export default Dashboard;
