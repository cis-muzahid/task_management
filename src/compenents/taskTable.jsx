import React, { useState } from 'react';

const TaskTable = ({ data, handleShowTaskUpdateModal }) => {
    // const [statusFilter, setStatusFilter] = useState('');
    // const [dateFilter, setDateFilter] = useState('');
    const [selectedTasks, setSelectedTasks] = useState([]);

    // const handleStatusChange = (e) => {
    //     setStatusFilter(e.target.value);
    // };

    // const handleDateChange = (e) => {
    //     setDateFilter(e.target.value);
    // };
    const handleUpdate = () => {
        handleShowTaskUpdateModal(data)
    }
    const handleTaskSelection = (taskId) => {
        const selectedIndex = selectedTasks.indexOf(taskId);
        let newSelectedTasks = [];

        if (selectedIndex === -1) {
            newSelectedTasks = newSelectedTasks.concat(selectedTasks, taskId);
        } else if (selectedIndex === 0) {
            newSelectedTasks = newSelectedTasks.concat(selectedTasks.slice(1));
        } else if (selectedIndex === selectedTasks.length - 1) {
            newSelectedTasks = newSelectedTasks.concat(selectedTasks.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedTasks = newSelectedTasks.concat(
                selectedTasks.slice(0, selectedIndex),
                selectedTasks.slice(selectedIndex + 1),
            );
        }

        setSelectedTasks(newSelectedTasks);
    };

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
        <div className="container mt-5">
            {/* <div className="row d-flex justify-content-end mb-3">
                <div className="col-auto">
                    <button className="btn btn-danger mr-2" onClick={handleDeleteSelected} disabled={selectedTasks.length === 0}>
                        Delete Selected
                    </button>
                    <button className="btn btn-primary" onClick={handleUpdateSelected} disabled={selectedTasks.length === 0}>
                        Update Selected
                    </button>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Status filter
                        </button>
                        <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                            <div className="form-check ml-3">
                                <input className="form-check-input" type="checkbox" value="Completed" id="statusCompleted" onChange={handleStatusChange} />
                                <label className="form-check-label" htmlFor="statusCompleted">
                                    Completed
                                </label>
                            </div>
                            <div className="form-check ml-3">
                                <input className="form-check-input" type="checkbox" value="Running" id="statusRunning" onChange={handleStatusChange} />
                                <label className="form-check-label" htmlFor="statusRunning">
                                    Running
                                </label>
                            </div>
                            <div className="form-check ml-3">
                                <input className="form-check-input" type="checkbox" value="Pending" id="statusPending" onChange={handleStatusChange} />
                                <label className="form-check-label" htmlFor="statusPending">
                                    Pending
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="input-group">
                        <input
                            type="date"
                            className="form-control"
                            value={dateFilter}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
            </div> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((task, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedTasks.includes(task.id)}
                                    onChange={() => handleTaskSelection(task.id)}
                                />
                            </td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary mr-2" onClick={handleUpdate}>
                                    <i className="fas fa-edit " ></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
