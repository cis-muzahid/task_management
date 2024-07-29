import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './services/PrivateRoute';
import TaskTableList from './pages/dataTable';
import Settings from './pages/settings';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';
import { TimerProvider } from './services/TimerContext';

const App = () => {

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
