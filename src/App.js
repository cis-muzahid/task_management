import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateTaskForm from './pages/createTaskForm';
import TaskList from './pages/taskList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/create-task" element={<CreateTaskForm />} />
          <Route path="/task-list" element={<TaskList />} />

          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
