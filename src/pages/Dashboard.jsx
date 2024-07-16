import React, { useEffect, useState } from "react";
import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/todoTaskCreate";
import TaskCard from "../compenents/taskCardList";
import TaskStarted from "../compenents/TaskStarted";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [startedTask, setStartedTask] = useState({}); // Use null instead of empty object

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    const storedStartedTask = JSON.parse(localStorage.getItem('startedTask')) || {};
    setStartedTask(storedStartedTask);

  }, []); // Only runs on initial mount

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const startTask = (task) => {
    const updatedTasks = task;
    // console.log(updatedTasks)
    setStartedTask(updatedTasks)
    console.log(startedTask)
    localStorage.setItem('startedTask', JSON.stringify(startedTask));

  };

  const clearStartedTask = () => {
    setStartedTask(null);
    localStorage.removeItem('startedTask');
  };

  return (
    <>
      <NavigationBar />
      <div className="text-center mt-5 h1">Running Task</div>
      {/* <div className="container">
        {startedTask ? <TaskStarted task={startedTask}  /> : <p>No task started</p>}
      </div> */}
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
}

export default Dashboard;
