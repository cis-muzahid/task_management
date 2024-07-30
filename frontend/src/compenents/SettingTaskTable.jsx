import React, { useState } from 'react';

const SettingTaskTable = ({ data, handleShowTaskUpdateModal, onDeleteTask}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

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

    return (
        <div className='container'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" className='text-right'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map((data, index) => (
                        <tr key={index}>
                            <td>{data.name}</td>
                            <td className='text-right'>
                                <button
                                    className="btn btn-sm btn-outline-primary mr-2"
                                    onClick={() => handleShowTaskUpdateModal(data)}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger mr-2"
                                    onClick={() => onDeleteTask(data.id)}
                                >
                                    <i className="fas fa-trash-alt"></i>
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

export default SettingTaskTable;
