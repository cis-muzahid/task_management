import React, { useState } from 'react';

const TaskTable = ({ data, handleShowTaskUpdateModal }) => {
    // const [statusFilter, setStatusFilter] = useState('');
    // const [dateFilter, setDateFilter] = useState('');
    const [selectedTasks, setSelectedTasks] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // You can adjust this number as needed

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


    // const handleStatusChange = (e) => {
    //     setStatusFilter(e.target.value);
    // };

    // const handleDateChange = (e) => {
    //     setDateFilter(e.target.value);
    // };
    // const handleTaskSelection = (taskId) => {
    //     const selectedIndex = selectedTasks.indexOf(taskId);
    //     let newSelectedTasks = [];

    //     if (selectedIndex === -1) {
    //         newSelectedTasks = newSelectedTasks.concat(selectedTasks, taskId);
    //     } else if (selectedIndex === 0) {
    //         newSelectedTasks = newSelectedTasks.concat(selectedTasks.slice(1));
    //     } else if (selectedIndex === selectedTasks.length - 1) {
    //         newSelectedTasks = newSelectedTasks.concat(selectedTasks.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelectedTasks = newSelectedTasks.concat(
    //             selectedTasks.slice(0, selectedIndex),
    //             selectedTasks.slice(selectedIndex + 1),
    //         );
    //     }

    //     setSelectedTasks(newSelectedTasks);
    // };

    // const handleDeleteSelected = () => {
    //     // Example function to delete selected tasks
    //     console.log('Deleting selected tasks:', selectedTasks);
    //     // Implement your delete logic here
    //     // Example: Call an API to delete tasks by IDs in selectedTasks
    // };

    // const handleUpdateSelected = () => {
    //     // Example function to update selected tasks
    //     console.log('Updating selected tasks:', selectedTasks);
    //     // Implement your update logic here
    //     // Example: Open a modal or form to update tasks in selectedTasks
    // };

    // const filteredData = data.filter((task) => {
    //     const dateMatch = dateFilter ? task.date.includes(dateFilter) : true;
    //     const statusMatch = statusFilter ? task.status === statusFilter : true;
    //     return dateMatch && statusMatch;
    // });

    return (
        <div className='container'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col" className='text-right'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td className='text-right'>
                                <button
                                    className="btn btn-sm btn-outline-primary mr-2"
                                    onClick={() => handleShowTaskUpdateModal(task)}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <nav className='mt-5'>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                            <button onClick={() => handlePageChange(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TaskTable;
