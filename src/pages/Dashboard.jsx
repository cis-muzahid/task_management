import React, { useEffect, useState, useRef, useContext } from "react";
import './dashboard.css';
import 'react-toastify/dist/ReactToastify.css';
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
import NotificationSound from '../assest/audio/mixkit-happy-bells-notification-937.mp3'
import { TimerContext } from "../services/TimerContext";
import TaskTable from "../compenents/taskTable";
import showWarningToast from "../compenents/warningToaster";
import { ToastContainer, toast } from 'react-toastify';
import showAlertToast from "../compenents/alertToast";

function Dashboard() {


  const { time, isRunning, startTimer, stopTimer, resetTimer, setTime, setIsRunning } = useContext(TimerContext);


  const audioPlayer = useRef(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [startedTask, setStartedTask] = useState({});
  const [taskTitles, setTaskTitles] = useState([])
  const [todaysTask, setTodaysTask] = useState([]);


  const [todoError, setTodoError] = useState('');
  const [todos, setTodos] = useState([]);
  const [todoUpdateModel, setTodoUpdateModel] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState({
    title: '',
    description: '',
    status: ''
  });


  const [filter, setFilter] = useState('');

  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleStart = () => {
    setIsRunning(true)
  };

  useEffect(() => {
    if (isRunning) {
      let TotalTimeInMinutes = Math.floor(time / 60);
      if (!audioPlayed && startedTask.total_time_to_complete === TotalTimeInMinutes) {
        showAlertToast("Time exceeded add some more time")
        playAudio();
        setAudioPlayed(true);
      }
    }
  }, [isRunning, time]);


  function playAudio() {
    audioPlayer.current.play();
  }

  // const fetchTasks = async () => {
  //   try {
  //     const response = await TaskListAPI();
  //     if (response.status === 200) {
  //       setTasks(response.data);
  //       const startedTask = response.data.find(task => task.status === 'started');
  //       const pendingTask = response.data.filter(task => task.status === 'pending');
  //       if (pendingTask) {
  //         setPendingTasks(pendingTask)
  //       }

  //       const newElapsedTime = elapsedTime + 1000;
  //       const elapsedTimeTotalMinutes = Math.floor(newElapsedTime / 60000);
  //       if (startedTask && startedTask.total_time_to_complete > elapsedTimeTotalMinutes) {
  //         setStartedTask(startedTask);
  //         const startTime = new Date(startedTask.start_time).getTime();
  //         const currentTime = new Date().getTime();
  //         const savedElapsedTime = localStorage.getItem('elapsedTime') || 0;
  //         const timeElapsed = parseInt(savedElapsedTime, 10);
  //         setElapsedTime(timeElapsed);
  //         setTimerRunning(true);
  //       }
  //     } else {
  //       console.error('Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }; 

  const fetchTasks = async () => {
    try {
      const response = await TaskListAPI();
      if (response.status === 200) {
        setTasks(response.data);
        const startedTask = response.data.find(task => task.status === 'started');
        const pendingTask = response.data.filter(task => task.status === 'pending');
        const completedTask = response.data.filter(task => task.status === 'completed');

        const todaysTasks = completedTask.filter(task => {
          const taskStartDate = new Date(task.start_time);
          const today = new Date();
          return taskStartDate.toDateString() === today.toDateString();
        });

        if (todaysTasks) {
          // console.log(todaysTask)
          setTodaysTask(todaysTasks);
        }

        if (pendingTask) {
          setPendingTasks(pendingTask);
        }
        const newTime = time + 1;
        const TotalTimeInMinutes = Math.floor(newTime / 60);

        if (startedTask) {
          setStartedTask(startedTask);

          const taskStartTimeUTC = new Date(startedTask.start_time);
          const taskStartTimeIST = new Date(taskStartTimeUTC.getTime() + (330 * 60 * 1000));
        
          const currentTimeUTC = new Date();
          const currentTimeIST = new Date(currentTimeUTC.getTime() + (330 * 60 * 1000));
        
          const elapsedTime = currentTimeIST - taskStartTimeIST;
          const elapsedTimeInSeconds = Math.floor(elapsedTime / 1000);
          setTime(elapsedTimeInSeconds);
          setIsRunning(true);
        }
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAlertTime = async () => {
    try {
      const response = await GetAlertTimeAPI();
      if (response.status === 200) {
        // setTimeTocomplete(response.data.default_alert_time)
        localStorage.setItem("time_to_complete", response.data.default_alert_time);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await TodoListAPI();
      if (response.status === 200) {
        setTodos(response.data)
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTaskTitle = async () => {
    try {
      const response = await GetTaskTitleAPI();
      if (response.status === 200) {
        setTaskTitles(response.data)
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  useEffect(() => {
    fetchTasks();
    fetchAlertTime();
    fetchTodos();
    fetchTaskTitle();
    // setStartedTask({});
  }, []);



  const addTask = async (newTask) => {
    // debugger
    try {
      const response = await TaskCreateAPI(newTask);
      if (response.status !== 201) {
        console.error('Error:', response);
      }

      const createdTask = response.data;
      const updatedTasks = [...tasks, createdTask];
      setTasks(updatedTasks);

      const updatedtodays = [...todaysTask, createdTask];
      setTodaysTask(updatedtodays);

      if (startedTask) {
        await completeCurrentTask();
      }

      await startNewTask(createdTask);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const completeCurrentTask = async () => {
  //   const completedTask = { ...startedTask, end_time: new Date().toISOString(), status: 'completed' };
  //   try {
  //     const response = await UpdateTaskAPI(completedTask);
  //     if (response.status === 200) {
  //       setStartedTask({});
  //       setTasks((prevTasks) =>
  //         prevTasks.map((task) =>
  //           task.id === completedTask.id ? { ...task, ...response.data } : task
  //         )
  //       );
  //       setTimerRunning(false);
  //       setElapsedTime(0);
  //     } else {
  //       console.error('Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const completeCurrentTask = async () => {
    const completedTask = { ...startedTask, end_time: new Date().toISOString(), status: 'completed' };
    try {
      const response = await UpdateTaskAPI(completedTask);
      if (response.status === 200) {
        setStartedTask({});
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === completedTask.id ? { ...task, ...response.data } : task
        ));
        setTodaysTask(prevTasks => prevTasks.map(task =>
          task.id === completedTask.id ? { ...task, ...response.data } : task
        ));
        // setIsRunning(false);
        // setTime(0);
        resetTimer()
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const startNewTask = async (task) => {
  //   const updatedTask = { ...task, start_time: new Date().toISOString(), status: 'started' };
  //   try {
  //     const response = await UpdateTaskAPI(updatedTask);
  //     if (response.status === 200) {
  //       setStartedTask(response.data);
  //       setTimerRunning(true);
  //       localStorage.setItem('startTime', new Date().getTime());
  //       localStorage.setItem('elapsedTime', 0);
  //     } else {
  //       console.error('Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const startNewTask = async (task) => {
    const updatedTask = { ...task, start_time: new Date().toISOString(), status: 'started' };
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setStartedTask(response.data);
        // setIsRunning(true);
        // localStorage.setItem('startTime', new Date().getTime());
        // reStartTimer()
        setIsRunning(true)
        setTime(0)
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShowTaskUpdateModal = (taskToUpdate) => {
    setTaskToUpdate(taskToUpdate)
    setShowTaskUpdateModal(true)
  }

  const CloseShowTaskUpdateModal = () => {
    setShowTaskUpdateModal(false);
  }

  const updateTask = async (updatedTask) => {
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...response.data } : task
          )
        );
        setStartedTask(response.data)
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updatedTasks);
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

  // const startTask = (task) => {
  //   if (isEmptyObject(startedTask)) {
  //     const currentDateTime = new Date().toLocaleString('en-US', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit',
  //       hour12: false,
  //     });
  //     const updatedTask = { ...task, start_time: new Date().toISOString(), status: 'started' };

  //     const updateTask = async () => {
  //       try {
  //         const response = await UpdateTaskAPI(updatedTask);
  //         if (response.status === 200) {
  //           setStartedTask(response.data);
  //           setTimerRunning(true);
  //           localStorage.setItem('startTime', new Date().getTime());
  //           localStorage.setItem('elapsedTime', 0);
  //         } else {
  //           console.error('Error:', response);
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     };
  //     updateTask();

  //   } else {
  //     setModalMessage("A task is already running. Please complete the current task before starting a new one.");
  //     setShowModal(true);
  //   }
  // };


  // const CompleteTask = async (task) => {
  //   const updatedTask = { ...task, end_time: new Date().toISOString(), status: 'completed' };
  //   try {
  //     const response = await UpdateTaskAPI(updatedTask);
  //     if (response.status === 200) {
  //       setTasks((prevTasks) =>
  //         prevTasks.map((task) =>
  //           task.id === updatedTask.id ? { ...task, ...response.data } : task
  //         )
  //       );
  //       setStartedTask({})
  //       setTimerRunning(false);
  //       setElapsedTime(0)
  //       setModalMessage("Task completed successfully!");
  //       setShowModal(true);
  //       return response
  //     } else {
  //       console.error('Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  const CompleteTask = async (task) => {
    const updatedTask = { ...task, end_time: new Date().toISOString(), status: 'completed' };
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...response.data } : task
          )
        );
        setTodaysTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...response.data } : task
          )
        );
        setStartedTask({})
        // setIsRunning(false);
        // setTime(0)
        resetTimer()
        setModalMessage("Task completed successfully!");
        setShowModal(true);
        // return response
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // const clearStartedTask = () => {
  //   setStartedTask(null);
  //   localStorage.removeItem('startedTask');
  // };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const formatElapsedTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        setTodoError(response.message)
      }
    } catch (error) {
      if (error.response) {
        console.error("Error", error.response.data.title[0]);
        setTodoError(error.response.data.title[0] || 'Some error occurs please try again')
      } else {
        setTodoError('Some error occurs please try again')
      }
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
    setTodoUpdateModel(false)
  }

  const HandleTodoUpdate = async (todo) => {
    try {
      const response = await TodoUpdateAPI(todo);
      if (response.status === 200) {
        setTodos((prevTodo) =>
          prevTodo.map((t) =>
            t.id === todo.id ? { ...t, ...response.data } : t
          )
        );
        setModalMessage("Todo updated successfully!");
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


  const handleFilterChange = async (e) => {
    const filter_data = e.target.value;
    setFilter(filter_data)

    const filteredTasks = tasks.filter(task => {
      const matchesTitle = filter_data ? task.title.toLowerCase().includes(filter_data.toLowerCase()) : true;

      const taskStartDate = new Date(task.start_time);
      const today = new Date();
      const matchesDate = taskStartDate.toDateString() === today.toDateString();

      // const matchesStatus = newFilters.status.length > 0 ? newFilters.status.includes(task.status) : true;

      return matchesTitle && matchesDate;
    });
    setTodaysTask(filteredTasks);
  };

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
                <h1>{formatElapsedTime(time)}</h1>
              </div>

              {isEmptyObject(startedTask) ? (
                <p className="text-center">No task started</p>
              ) : (
                <TaskStarted
                  task={startedTask}
                  timerRunning={isRunning}
                  onHandleComplete={CompleteTask}
                  showTaskUpdateModel={handleShowTaskUpdateModal}
                />
              )}

              <div className="text-center mt-5 mb-4">
                <h3 className="">CREATE TASK</h3>
              </div>

              <TaskCreate onAddTask={addTask} taskTitles={taskTitles} />

              {/* <div className='container'>
                <div className="text-center mb-4 mt-5">
                  <h2 className="text-bold">TODAYS TASK</h2>
                </div>
                <div className="row d-flex justify-content-end mb-3">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder='Search'
                          className="form-control"
                          value={filters.search}
                          name="search"
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="container">
                <div className="text-center mt-5 h3 mb-3">TODAY TASKS </div>
                <div className='container'>
                  <div className="row d-flex justify-content-end mb-3">
                    <div className="col-auto">
                      <div className="input-group">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder='Search'
                            className="form-control"
                            value={filter}
                            name="search"
                            onChange={handleFilterChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table justify-content-center">
                  <thead>
                    <tr>
                      <th scope="col">Time</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysTask.sort((a, b) => b.id - a.id).map((task, index) => {
                      const taskStartDate = new Date(task.start_time);
                      const today = new Date();
                      const isStartDateToday = taskStartDate.toDateString() === today.toDateString();
                      if (isStartDateToday) {
                        return (
                          <tr key={index}>
                            <TaskCard
                              task={task}
                              onUpdateTask={updateTask}
                              onDeleteTask={deleteTask}
                              onStartTask={handleShowTaskUpdateModal}
                            />
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>


            </div>

            {/* Right Section */}
            <div className="col-md-4 section-border">
              <div className="text-center mb-4 mt-5">
                <h3 className="">TODOS</h3>
              </div>
              <TodoCreate onCreateTodo={CreateTodo} todoError={todoError} />
              <div className="text-center mt-5 mb-4">
                <h3 className="">TODO LIST</h3>
              </div>
              <div className="container pb-5">
                <TodoCard
                  todos={todos}
                  handleTodoDelete={HandleTodoDelate}
                  showTodoUpdateModel={ShowTodoUpdateModel}
                  handleTodoComplete={HandleTodoComplete}
                />
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

        {taskToUpdate && (
          <UpdateTaskModal
            show={showTaskUpdateModal}
            handleClose={CloseShowTaskUpdateModal}
            handleUpdate={updateTask}
            taskToUpdate={taskToUpdate}
          />
        )}
        <ToastContainer />
        <audio ref={audioPlayer} src={NotificationSound} />
      </>
    </>
  );
};
export default Dashboard;
