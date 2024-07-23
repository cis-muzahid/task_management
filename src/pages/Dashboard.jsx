import React, { useEffect, useState } from "react";
import './dashboard.css';

import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/todoTaskCreate";
import TaskCard from "../compenents/taskCardList";
import TaskStarted from "../compenents/TaskStarted";
import { GetAlertTimeAPI, GetTaskTitleAPI, TaskCreateAPI, TaskDeleteAPI, TaskListAPI, TodoCreateAPI, TodoDeleteAPI, TodoListAPI, TodoUpdateAPI, UpdateTaskAPI } from "../services/apiContext";
import AlertModel from "../compenents/alertModel";
import TodoCreate from "../compenents/todoCreate";
import TodoCard from "../compenents/todoCard";
import UpdateTaskModal from "../compenents/updateTaskModel";
import UpdateTodoModal from "../compenents/updateTodoModel";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [startedTask, setStartedTask] = useState({});
  const [taskTitles, setTaskTitles] = useState([])

  const [todos, setTodos] = useState([]);
  const [todoUpdateModel, setTodoUpdateModel] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState({
    title: '',
    description: '',
    status: ''
  });

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
          console.log(startedTask)
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
          localStorage.setItem("time_to_complete", response.data.default_alert_time);
        } else {
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchAlertTime();

    const fetchTodos = async () => {
      try {
        const response = await TodoListAPI();
        if (response.status === 200) {
          console.log(response.data)
          setTodos(response.data)
        } else {
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTodos();


    const fetchTaskTitle = async () => {
      try {
        const response = await GetTaskTitleAPI();
        if (response.status === 200) {
          console.log(response.data)
          setTaskTitles(response.data)
        } else {
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTaskTitle();
    console.log(startedTask)
    setStartedTask({});

  }, []);

  // const addTask = async (newTask) => {
  //   try {
  //     console.log('newTask=====', newTask)
  //     const response = await TaskCreateAPI(newTask);
  //     if (response.status === 201) {
  //       console.log('Task Created:', response.data);
  //       const updatedTasks = [...tasks, response.data];
  //       const createdTask = response.data
  //       setTasks(updatedTasks);

  //       const completedTask = { ...startedTask, end_time: new Date().toISOString(), status: 'completed' };
  //       console.log("Task completed:", completedTask);
  //       try {
  //         const response = await UpdateTaskAPI(completedTask);
  //         if (response.status === 200) {
  //           console.log('started Task List:', response.data);
  //           setStartedTask(createdTask);
  //           setTimerRunning(true);
  //           localStorage.setItem('startTime', new Date().getTime());
  //           localStorage.setItem('elapsedTime', 0);
  //         } else {
  //           console.error('Error:', response);
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }

  //       // setStartedTask(response.data);
  //       if (response.data) {
  //         const startTime = new Date(response.data.start_time).getTime();
  //         const currentTime = new Date().getTime();
  //         // const savedElapsedTime = localStorage.getItem('elapsedTime') || 0;
  //         const timeElapsed = 0
  //         setElapsedTime(timeElapsed);
  //         setTimerRunning(true);
  //         console.log("ttt==", elapsedTime)
  //       }

  //     } else {
  //       console.error('Error:', response);
  //     }

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const addTask = async (newTask) => {
    try {
      console.log('newTask=====', newTask);
      const response = await TaskCreateAPI(newTask);
      if (response.status !== 201) {
        console.error('Error:', response);
        return;
      }

      console.log('Task Created:', response.data);
      const createdTask = response.data;
      const updatedTasks = [...tasks, createdTask];
      setTasks(updatedTasks);

      if (!isEmptyObject(startedTask)) {
        await completeCurrentTask();
      }

      await startNewTask(createdTask);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const completeCurrentTask = async () => {
    const completedTask = { ...startedTask, end_time: new Date().toISOString(), status: 'completed' };
    console.log("Task completed:", completedTask);
    try {
      const response = await UpdateTaskAPI(completedTask);
      if (response.status === 200) {
        console.log('Completed Task:', response.data);
        setStartedTask({});
        setTimerRunning(false);
        setElapsedTime(0);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startNewTask = async (task) => {
    const updatedTask = { ...task, start_time: new Date().toISOString(), status: 'started' };
    console.log("Task started:", updatedTask);
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        console.log('Started Task:', response.data);
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
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...response.data } : task
          )
        );
        setStartedTask({})
        setTimerRunning(false);
        setElapsedTime(0)
        setModalMessage("Task completed successfully!");
        setShowModal(true);
        return response
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


  const CreateTodo = async (data) => {
    try {
      const response = await TodoCreateAPI(data);
      if (response.status === 201) {
        const updatedTodos = [...todos, response.data];
        setTodos(updatedTodos);
        setModalMessage("Todo created successfully!");
        setShowModal(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const HandleTodoDelate = async (id) => {
    try {
      const response = await TodoDeleteAPI(id);
      if (response.status === 204) {
        const updatedTodos = todos.filter(t => t.id !== id);
        setTodos(updatedTodos);
        setModalMessage("Todo deleted successfully!");
        setShowModal(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const ShowTodoUpdateModel = (todo) => {
    setTodoToUpdate(todo)
    setTodoUpdateModel(true)
  }

  const HandleTodoModelClose = () => {
    setTodoUpdateModel(true)
  }

  const HandleTodoUpdate = async (todo) => {
    try {
      const response = await TodoUpdateAPI(todo);
      if (response.status === 204) {
        // const updatedTodos = todos.filter(t => t.id !== todo);
        // setTodos(updatedTodos);
        setModalMessage("Todo deleted successfully!");
        setShowModal(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const HandleTodoComplete = async (todo) => {
    const updateTodo = { ...todo, status: 'COMPLETED' }
    console.log(updateTodo)
    try {
      const response = await TodoUpdateAPI(updateTodo);
      if (response.status === 200) {
        setTodos((prevTodo) =>
          prevTodo.map((todo) =>
            todo.id === updateTodo.id ? { ...todo, ...response.data } : todo
          )
        );
        setModalMessage("Todo Completed successfully!");
        setShowModal(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <>
      {/* <NavigationBar />
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
      <TaskCreate onAddTask={addTask} taskTitles={taskTitles} />
      <div className="container">
        <div className="text-center mt-5 h1">TODOS</div>
        {tasks.map((task, index) => (
          <div key={index} className="mt-2">
            <TaskCard task={task} onUpdateTask={updateTask} onDeleteTask={deleteTask} onStartTask={startTask} />
          </div>
        ))}
      </div> 
      <AlertModel handleCloseModal={handleCloseModal} showModal={showModal} modalMessage={modalMessage} /> */}

      <>
        <NavigationBar />

        <div className="container-fluid">
          <div className="row">

            {/* Left Section */}
            <div className="col-md-8 ">
              <div className="text-center mb-4 mt-5">
                <h2 className="text-bold">RUNNING TASK</h2>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <h1>{formatElapsedTime(elapsedTime)}</h1>
              </div>

              {isEmptyObject(startedTask) ? (
                <p className="text-center">No task started</p>
              ) : (
                <TaskStarted
                  task={startedTask}
                  timerRunning={timerRunning}
                  onHandleComplete={CompleteTask}
                />
              )}

              <div className="text-center mt-5 mb-4">
                <h3 className="">CREATE TASK</h3>
              </div>

              <TaskCreate onAddTask={addTask} taskTitles={taskTitles} />

              <div className="container">
                <div className="text-center mt-5 h3 mb-3">TODAY TASKS </div>
                {tasks.map((task, index) => {
                  const taskStartDate = new Date(task.start_time);
                  const today = new Date();
                  const isStartDateToday = taskStartDate.toDateString() === today.toDateString();
                  if (isStartDateToday) {
                    return (
                      <div key={index} className="mt-2">
                        <TaskCard
                          task={task}
                          onUpdateTask={updateTask}
                          onDeleteTask={deleteTask}
                          onStartTask={startTask}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-4 section-border">
              <div className="text-center mb-4 mt-5">
                <h3 className="">TODOS</h3>
              </div>
              <TodoCreate onCreateTodo={CreateTodo} />
              <div className="text-center mt-5 mb-4">
                <h3 className="">TODO LIST</h3>
              </div>
              <div className="container pb-5">

                {todos.map((todo, index) => (
                  <div key={index} className="mt-2">
                    <TodoCard
                      todo={todo}
                      handleTodoDelate={HandleTodoDelate}
                      showTodoUpdateModel={ShowTodoUpdateModel}
                      handleTodoComplete={HandleTodoComplete}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AlertModel
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          modalMessage={modalMessage}
        />

        <UpdateTodoModal
          todoToUpdate={todoToUpdate}
          todoUpdateModel={todoUpdateModel}
          handleTodoModelClose={HandleTodoModelClose}
          handleTodoUpdate={HandleTodoUpdate}
        />
      </>
    </>
  );
};
export default Dashboard;
