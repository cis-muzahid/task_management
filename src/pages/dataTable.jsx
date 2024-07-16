import React, { useState, useEffect } from 'react';
import TaskCard from '../compenents/taskCard';
import NavigationBar from '../compenents/NavBar';
import TaskTable from '../compenents/taskTable';
import { TaskList } from '../services/apiContext';

const TaskTableList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(TaskList);
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