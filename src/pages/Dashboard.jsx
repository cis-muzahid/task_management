import React, { useEffect, useState } from "react"
import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/taskCreate";
import TaskCard from "../compenents/taskCard";
function Dashboard() {

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
      <div className="text-center mt-5 h1">Create Form</div>
      <TaskCreate />
      <div>
        <div className="text-center mt-5 h1">TODOS</div>
        {tasks.map((task, index) => (
          <div key={index} className="mt-5">
            <TaskCard task={task} onUpdateTask={updateTask} />
          </div>
        ))}
        </div>
    </>

  )
}

export default Dashboard;