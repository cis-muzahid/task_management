import React, { useEffect, useState } from "react";
import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/todoTaskCreate";
import TaskCard from "../compenents/taskCardList";
import TaskStarted from "../compenents/TaskStarted";
import { TaskCreateAPI, TaskDeleteAPI, TaskListAPI } from "../services/apiContext";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [startedTask, setStartedTask] = useState({}); 

  const [timerRunning, setTimerRunning] = useState(false);

  const handleStart = () => {
    setTimerRunning(true);
  };



  useEffect(() => {
    // const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const fetchTasks = async () => {
      try {
        const response = await TaskListAPI();
        if (response.status === 200) {
          console.log('Task List:', response.data);
          setTasks(response.data);
        } else {
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTasks();
    // setTasks(storedTasks);
    console.log(startedTask)
    // const storedStartedTask = JSON.parse(localStorage.getItem('startedTask')) || {};
    // setStartedTask(storedStartedTask);

  }, []); // Only runs on initial mount

  const addTask = async(newTask) => {
    // const newData = { ...data, id: generateUniqueId() };
    try {
      console.log('newTask=====',newTask)
      const response = await TaskCreateAPI(newTask);
      if (response.status === 201) {
        console.log('Task Created:', response.data);
        const updatedTasks = [...tasks, response.data];
        setTasks(updatedTasks);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      // setError('Failed to create task');
      console.error('Error:', error);
    }
    // localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
  // localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  const startTask = (task) => {
    const updatedTasks = task;
    console.log("task started ====",updatedTasks)
    setStartedTask(task);
    setTimerRunning(true);
    // localStorage.setItem('startedTask', JSON.stringify(startedTask));
  };

  const clearStartedTask = () => {
    setStartedTask(null);
    localStorage.removeItem('startedTask');
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <>
      <NavigationBar />
      <div className="text-center mt-5 h1">Running Task</div>
      <div className="container">
        {isEmptyObject(startedTask) ? <p>No task started</p> : <TaskStarted task={startedTask} timerRunning={timerRunning}/>}
      </div>

      <div className="text-center mt-5 h1">Create Task</div>
      <TaskCreate onAddTask={addTask} />
      <div className="container">
        <div className="text-center mt-5 h1">TODOS</div>
        {tasks.map((task, index) => (
          <div key={index} className="mt-2">
            <TaskCard task={task} onUpdateTask={updateTask} onDeleteTask={deleteTask} onStartTask={startTask} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Dashboard;
