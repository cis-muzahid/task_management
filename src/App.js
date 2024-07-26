import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard';
import CreateTaskForm from './pages/createTaskForm';
import TaskList from './pages/taskList';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './services/PrivateRoute';
import TaskTableList from './pages/dataTable';
import Settings from './pages/settings';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';
import { useEffect, useState } from 'react';
import { TimerContext, TimerProvider } from './services/TimerContext';

const App = () => {

  // const initialTime = parseInt(localStorage.getItem('timer-time'), 10) || 0;
  // const initialRunningState = JSON.parse(localStorage.getItem('timer-isRunning')) || false;

  // const [time, setTime] = useState(initialTime);
  // const [isRunning, setIsRunning] = useState(initialRunningState);

  // useEffect(() => {
  //   let interval = null;
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setTime((prevTime) => prevTime + 1);
  //     }, 1000);
  //   } else if (!isRunning && time !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isRunning, time]);

  // useEffect(() => {
  //   localStorage.setItem('timer-time', time.toString());
  //   localStorage.setItem('timer-isRunning', JSON.stringify(isRunning));
  // }, [time, isRunning]);



  return (
    <AuthProvider>
      <TimerProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgotPassword />} />

            <Route
              path="/create-task"
              element={
                <PrivateRoute>
                  <CreateTaskForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/task-list"
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              }
            />
            <Route
              path="/task-table"
              element={
                <PrivateRoute>
                  <TaskTableList />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </TimerProvider>
    </AuthProvider>
  );
};

export default App;
