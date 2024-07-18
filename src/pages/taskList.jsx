import React, { useState, useEffect } from 'react';
import TaskCard from '../compenents/taskCard';
import NavigationBar from '../compenents/NavBar';
import { TaskListAPI } from '../services/apiContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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
            <TaskCard task={task} onUpdateTask={updateTask} />
          </div>
        ))}
      </div>
    </>

  );
};

export default TaskList;
