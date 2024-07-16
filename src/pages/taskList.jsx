import React, { useState, useEffect } from 'react';
import TaskCard from '../compenents/taskCard';
import NavigationBar from '../compenents/NavBar';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };




  return (
    <>
      <NavigationBar />
      <div className="container mt-4">
        <h2>Task List</h2>
        {tasks.map((task, index) => (
            <div key={index} className="mt-5">
              <TaskCard task={task} onUpdateTask={updateTask}/>
            </div>
        ))}
      </div>
    </>

  );
};

export default TaskList;
