import React, { useEffect, useState, useRef, useContext } from "react";
import "../assest/css/dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/todoTaskCreate";
import TaskCard from "../compenents/taskCardList";
import TaskStarted from "../compenents/TaskStarted";
import {
  GetAlertTimeAPI,
  GetStartedTaskAPI,
  GetTaskTitleAPI,
  GetTaskTitleList,
  TaskCreateAPI,
  TaskListAPI,
  TodoCreateAPI,
  TodoDeleteAPI,
  TodoListAPI,
  TodoUpdateAPI,
  UpdateTaskAPI,
} from "../services/apiContext";
import AlertModel from "../compenents/alertModel";
import TodoCreate from "../compenents/todoCreate";
import TodoCard from "../compenents/todoCard";
import UpdateTaskModal from "../compenents/updateTaskModel";
import UpdateTodoModal from "../compenents/updateTodoModel";
import NotificationSound from "../assest/audio/mixkit-happy-bells-notification-937.mp3";
import { TimerContext } from "../services/TimerContext";
import showWarningToast from "../compenents/warningToaster";
import { ToastContainer } from "react-toastify";
import showSuccessToast from "../compenents/successToaster";
import showAlertToast from "../compenents/alertToast";
import UpdateStartedTaskModal from "../compenents/updateStartedTaskModel";

function Dashboard() {
  const { time, isRunning, resetTimer, setTime, setIsRunning } =
    useContext(TimerContext);

  const audioPlayer = useRef(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [lastPlayedTime, setLastPlayedTime] = useState(
    Number(localStorage.getItem("lastAudioPlayedTime")) || 0
  );

  const [tasks, setTasks] = useState([]);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [startedTask, setStartedTask] = useState(null);
  const [taskTitles, setTaskTitles] = useState([]);
  const [todaysTask, setTodaysTask] = useState([]);
  const [defaultTitle, setDefaultTitle] = useState('');
  const [defaultTimeToComplete, setDefaultTimeToComplete] = useState(null);


  const [todoError, setTodoError] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoUpdateModel, setTodoUpdateModel] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [filter, setFilter] = useState("");

  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleStart = () => {
    setIsRunning(true);
  };

  // const playAudio = () => {
  //   if (audioPlayer.current) {
  //     audioPlayer.current
  //       .play()
  //       .then(() => {
  //         console.log("Audio played successfully");
  //       })
  //       .catch((error) => {
  //         console.error("Failed to play audio:", error);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   if (isRunning) {
  //     let TotalTimeInMinutes = Math.floor(time / 60);
  //     if (
  //       !audioPlayed &&
  //       startedTask.total_time_to_complete === TotalTimeInMinutes
  //     ) {
  //       showWarningToast("Time exceeded add some more time");
  //       playAudio();
  //       setAudioPlayed(true);
  //     }
  //   }
  // }, [isRunning, audioPlayed, time]);

  // useEffect(() => {
  //   if (isRunning) {
  //     const TotalTimeInMinutes = Math.floor(time / 60);
  //     const timeToComplete = startedTask.total_time_to_complete || 0;
  //     const currentTime = Math.floor(Date.now() / 60000);
  //     const timerTimeMinute = time / 60;
  //     if (TotalTimeInMinutes >= timeToComplete) {
  //       console.log(
  //         currentTime,
  //         lastPlayedTime,
  //         currentTime - lastPlayedTime == 1
  //       );

  //       if (timerTimeMinute - lastPlayedTime == 1) {
  //         showWarningToast("Time exceeded, add some more time");
  //         playAudio();
  //         const timeCount = lastPlayedTime + 1;
  //         localStorage.setItem("lastAudioPlayedTime", timeCount);
  //       }
  //     }
  //   }
  // }, [isRunning, time, startedTask, lastPlayedTime]);

  const fetchTasks = async () => {
    try {
      const response = await TaskListAPI();
      if (response.status === 200) {
        setTasks(response.data);
        const startedTask = response.data.find(
          (task) => task.status === "started"
        );
        const pendingTask = response.data.filter(
          (task) => task.status === "pending"
        );
        const completedTask = response.data.filter(
          (task) => task.status === "completed"
        );

        const todaysTasks = completedTask.filter((task) => {
          const taskStartDate = new Date(task.start_time);
          const today = new Date();
          return taskStartDate.toDateString() === today.toDateString();
        });

        if (todaysTasks) {
          setTodaysTask(todaysTasks);
        }

        if (pendingTask) {
          setPendingTasks(pendingTask);
        }
        if (startedTask) {
          setStartedTask(startedTask)
          localStorage.setItem("started_task_start_date",startedTask.start_time)
          localStorage.setItem("started_task_time_to_complete",startedTask.total_time_to_complete)

          const taskStartTimeUTC = new Date(startedTask.start_time);
          const taskStartTimeIST = new Date(
            taskStartTimeUTC.getTime() + 330 * 60 * 1000
          );

          const currentTimeUTC = new Date();
          const currentTimeIST = new Date(
            currentTimeUTC.getTime() + 330 * 60 * 1000
          );

          const elapsedTime = currentTimeIST - taskStartTimeIST;
          const elapsedTimeInSeconds = Math.floor(elapsedTime / 1000);
          setTime(elapsedTimeInSeconds);
          setIsRunning(true);
        }
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAlertTime = async () => {
    try {
      const response = await GetAlertTimeAPI();
      if (response.status === 200) {
        localStorage.setItem(
          "time_to_complete",
          response.data.default_alert_time
        );
        setDefaultTimeToComplete(response.data.default_alert_time)
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await TodoListAPI();
      if (response.status === 200) {
        setTodos(response.data);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTaskTitle = async () => {
    try {
      const response = await GetTaskTitleList();
      if (response.status === 200) {
        const newTaskTitles = response.data.map((task) => task.name);
        setTaskTitles(newTaskTitles);
        if (Array.isArray(response.data)) {
          const newDefaultTitle = response.data.find(
            (obj) => obj.is_default === true
          );
          setDefaultTitle(newDefaultTitle.name);
          localStorage.setItem("default_title", newDefaultTitle.name);
        }
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchAlertTime();
    fetchTodos();
    fetchTaskTitle();
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await TaskCreateAPI(newTask);
      if (response.status !== 201) {
        console.error("Error:", response);
      }

      const createdTask = response.data;
      const updatedTasks = [...tasks, createdTask];
      setTasks(updatedTasks);

      if (startedTask) {
        await completeCurrentTask();
      }

      await startNewTask(createdTask);
      // const newDefaultTitle = taskTitles.find((obj) => obj.is_default === true);
      // setDefaultTitle(newDefaultTitle);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const completeCurrentTask = async () => {
    const completedTask = {
      ...startedTask,
      end_time: new Date().toISOString(),
      status: "completed",
    };
    try {
      const response = await UpdateTaskAPI(completedTask);
      if (response.status === 200) {
        setStartedTask(null);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === completedTask.id ? { ...task, ...response.data } : task
          )
        );
        setTodaysTask([...todaysTask, response.data]);
        resetTimer();
        localStorage.removeItem("lastAudioPlayedTime");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startNewTask = async (task) => {
    const updatedTask = {
      ...task,
      start_time: new Date().toISOString(),
      status: "started",
    };
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setStartedTask(response.data);
        setIsRunning(true);
        setTime(0);
        showSuccessToast("Task Started Successfully");
        localStorage.setItem("lastAudioPlayedTime", 0);
        localStorage.setItem("started_task_time_to_complete", response.data.total_time_to_complete);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowTaskUpdateModal = (taskToUpdate) => {
    setTaskToUpdate(taskToUpdate);
    setShowTaskUpdateModal(true);
  };

  const CloseShowTaskUpdateModal = () => {
    setShowTaskUpdateModal(false);
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...response.data } : task
          )
        );
        if(response.data.status == "started"){
          setStartedTask(response.data);
          localStorage.setItem("started_task_time_to_complete",response.data.total_time_to_complete)
          setAudioPlayed(false);
        }
        showSuccessToast("Task Updated Successfuly");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
  };

  const CompleteTask = async (task) => {
    const updatedTask = {
      ...task,
      end_time: new Date().toISOString(),
      status: "completed",
    };
    try {
      const response = await UpdateTaskAPI(updatedTask);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...response.data } : task
          )
        );
        setTodaysTask([...todaysTask, response.data]);
        setStartedTask(null);
        resetTimer();
        // setModalMessage("Task completed successfully!");
        // setShowModal(true);
        showSuccessToast("Task Completed Successfully");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const formatElapsedTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const CreateTodo = async (data) => {
    try {
      const response = await TodoCreateAPI(data);
      if (response.status === 201) {
        const updatedTodos = [response.data,...todos];
        setTodos(updatedTodos);
        // setModalMessage("Todo created successfully!");
        // setShowModal(true);
        showSuccessToast("Todo Created Successfully");
      } else {
        setTodoError(response.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error", error.response.data.title[0]);
        setTodoError(
          error.response.data.title[0] || "Some error occurs please try again"
        );
      } else {
        setTodoError("Some error occurs please try again");
      }
    }
  };

  const HandleTodoDelate = async (id) => {
    try {
      const response = await TodoDeleteAPI(id);
      if (response.status === 204) {
        const updatedTodos = todos.filter((t) => t.id !== id);
        setTodos(updatedTodos);
        showAlertToast("Todo Deleted !");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const ShowTodoUpdateModel = (todo) => {
    setTodoToUpdate(todo);
    setTodoUpdateModel(true);
  };

  const HandleTodoModelClose = () => {
    setTodoUpdateModel(false);
  };

  const HandleTodoUpdate = async (todo) => {
    try {
      const response = await TodoUpdateAPI(todo);
      if (response.status === 200) {
        const updatedTodo = { ...response.data };

        // setTodos((prevTodos) => {
        //   // Filter out the old todo item and add the updated todo to the beginning
        //   return [updatedTodo, ...prevTodos.filter((t) => t.id !== todo.id)];
        // });
        setTodos((prevTodo) =>
          prevTodo.map((t) =>
            t.id === todo.id ? { ...t, ...response.data } : t
          )
        );
        showSuccessToast("Todo Updated Successfuly");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandleTodoComplete = async (todo) => {
    const updateTodo = { ...todo, status: "COMPLETED" };
    try {
      const response = await TodoUpdateAPI(updateTodo);
      if (response.status === 200) {
        setTodos((prevTodo) =>
          prevTodo.map((todo) =>
            todo.id === updateTodo.id ? { ...todo, ...response.data } : todo
          )
        );
        showSuccessToast("Todo Completed Successfuly");
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilterChange = async (e) => {
    const filter_data = e.target.value;
    setFilter(filter_data);
    const completedTask = tasks.filter(
      (task) => task.status === "completed"
    );

    const latestTodaysTasks = completedTask.filter((task) => {
      const taskStartDate = new Date(task.start_time);
      const today = new Date();
      return taskStartDate.toDateString() === today.toDateString();
    });
    const filteredTasks = latestTodaysTasks.filter((task) => {
      const matchesTitle = filter_data
        ? task.title.toLowerCase().includes(filter_data.toLowerCase())
        : true;

      const taskStartDate = new Date(task.start_time);
      const today = new Date();
      const matchesDate = taskStartDate.toDateString() === today.toDateString();

      return matchesTitle && matchesDate;
    });
    setTodaysTask(filteredTasks);
  };

  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 ">
            <div className="text-center mb-4 mt-5">
              {/* <h2 className="text-bold">RUNNING TASK</h2> */}
            </div>

            <div className="d-flex justify-content-center mb-3">
              <h1>{formatElapsedTime(time)}</h1>
            </div>

            {startedTask ==null ? "": (
              <TaskStarted
                task={startedTask}
                timerRunning={isRunning}
                onHandleComplete={CompleteTask}
                showTaskUpdateModel={handleShowTaskUpdateModal}
              />
            )}

            {/* <div className="text-center mt-5 mb-4">
              <h3 className="">CREATE TASK</h3>
            </div> */}

            <TaskCreate
              onAddTask={addTask}
              taskTitles={taskTitles}
              defaultTitle={defaultTitle}
              defaultTimeToComplete={defaultTimeToComplete}
            />

            <div className="container mt-5">
              {/* <div className="text-center mt-5 h3 mb-3">TODAY TASKS </div> */}
              <div className="container">
                <div className="row d-flex justify-content-end mb-3">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search"
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
              <table className="table table-striped justify-content-center">
                <thead>
                  <tr>
                    <th scope="col">Completed Time(min) </th>
                    <th scope="col">Task Type</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysTask
                    .sort((a, b) => b.id - a.id)
                    .map((task, index) => {
                      const taskStartDate = new Date(task.start_time);
                      const today = new Date();
                      const isStartDateToday =
                        taskStartDate.toDateString() === today.toDateString();
                      if (isStartDateToday) {
                        return (
                          <tr key={index}>
                            <TaskCard task={task} />
                          </tr>
                        );
                      }
                      return null;
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-4 section-border">
            <div className="text-center mb-4 mt-5">
              <h3 className="">TODOS</h3>
            </div>
            <TodoCreate onCreateTodo={CreateTodo} todoError={todoError} />
            {/* <div className="text-center mt-5 mb-4">
              <h3 className="">TODO LIST</h3>
            </div> */}
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
        <UpdateStartedTaskModal
          show={showTaskUpdateModal}
          handleClose={CloseShowTaskUpdateModal}
          handleUpdate={updateTask}
          taskToUpdate={taskToUpdate}
          taskTitles={taskTitles}
        />
      )}
      <ToastContainer />
      <audio ref={audioPlayer} src={NotificationSound} />
    </>
  );
}
export default Dashboard;
