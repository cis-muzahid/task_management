import React, { useState } from "react";
import { formatDateTime } from "../utils/utitlity";

const TaskTable = ({ data, handleShowTaskUpdateModal, onDeleteTask, HandleCheckedTasks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // const [checkedTasks,setCheckedTasks] = useState([]);
  // const [totalTimeTaken,setTotalTimeTaken] = useState('00:00:00');


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTasks = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // const calculateCompletionTime = (startTime, endTime) => {
  //   const start = new Date(startTime);
  //   const end = new Date(endTime); 
  //   const completionTime = (end - start) / 60000; 
  //   return completionTime;
  // };

  // const HandleCheckedTasks = (task) => {
  //   const isTaskChecked = checkedTasks.some((t) => t.id === task.id);

  //   let updatedCheckedTasks;

  //   if (isTaskChecked) {
  //     updatedCheckedTasks = checkedTasks.filter((t) => t.id !== task.id);
  //   } else {
  //     updatedCheckedTasks = [...checkedTasks, task];
  //   }

  //   setCheckedTasks(updatedCheckedTasks);

  //   const formatTime = (minutes) => {
  //     const totalSeconds = Math.floor(minutes * 60);
  //     const hours = Math.floor(totalSeconds / 3600);
  //     const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  //     const seconds = totalSeconds % 60;
  //     return `${hours.toString().padStart(2, "0")}:${minutesLeft
  //       .toString()
  //       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  //   };

  //   const totalCompletionTime = updatedCheckedTasks.reduce((totalTime, t) => {
  //     const completionTime = calculateCompletionTime(t.start_time, t.end_time);
  //     return totalTime + completionTime;
  //   }, 0);

  //   const formattedTime = formatTime(totalCompletionTime);

  //   setTotalTimeTaken(formattedTime)
  // };

  
  return (
    <div className="container">
      {/* {
        totalTimeTaken && totalTimeTaken !== '00:00:00' ? <span>Total Time Taken : {totalTimeTaken}</span>:<span className="mb-5"></span>
      } */}
      
      <table className="table table-striped ">
        <thead>
          <tr>
            <th></th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Completed Time</th>
            <th scope="col" className="text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input ml-2"
                  onChange={() => HandleCheckedTasks(task)}
                //   checked={todo.status === "COMPLETED"}
                //   disabled={todo.status === "COMPLETED"}
                />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{formatDateTime(task.end_time)}</td>
              <td className="text-right">
                <button
                  className="btn btn-sm btn-outline-primary mr-2"
                  onClick={() => handleShowTaskUpdateModal(task)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger mr-2"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav className="mt-5">
        <ul className="pagination ">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                onClick={() => handlePageChange(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TaskTable;
