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

const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
