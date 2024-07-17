import React, { useState, useEffect } from 'react';
import TaskCard from '../compenents/taskCard';
import NavigationBar from '../compenents/NavBar';
import TaskTable from '../compenents/taskTable';
import { TaskListAPI } from '../services/apiContext';

const TaskTableList = () => {
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

//   const updateTask = (updatedTask) => {
//     const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
//     setTasks(updatedTasks);
//     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
//   };




  return (
    <>
      <NavigationBar />
        <TaskTable data={tasks} />
    </>

  );
};

export default TaskTableList;