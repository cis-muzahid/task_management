import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard';
import CreateTaskForm from './pages/createTaskForm';
import TaskList from './pages/taskList';
import Login from './pages/login';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './services/PrivateRoute';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />}/>
//           <Route path="/create-task" element={<CreateTaskForm />} />
//           <Route path="/task-list" element={<TaskList />} />
//           <Route path="/login" element={<Login />} />

//           {/* <Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<NoPage />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
            <Route path="/login" element={<Login />} />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
