import React, { useState, useEffect } from 'react';
import './taskList.css';

const TodoCard = ({ todos, handleTodoDelete, showTodoUpdateModel, handleTodoComplete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortingOrder, setSortingOrder] = useState('asc'); // State for sorting order

    const todosPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(todos.length / todosPerPage);

    // Calculate indexes for pagination
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    // Function to handle sorting
    const sortedTodos = [...todos].sort((a, b) => {
        if (sortingOrder === 'asc') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    // Get current todos after sorting
    const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to toggle sorting order
    const toggleSortingOrder = () => {
        setSortingOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className='container'>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3></h3>
                <button className="btn btn-sm btn-secondary" onClick={toggleSortingOrder}>
                    Sort by({sortingOrder === 'asc' ? 'Asc' : 'Des'})
                </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col" className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTodos.map((todo,index) => (
                        <tr key={index} className='mt-2'>
                            <td>
                                <input
                                    type="checkbox"
                                    className="form-check-input ml-2"
                                    onClick={() => handleTodoComplete(todo)}
                                    checked={todo.status === 'COMPLETED'}
                                    disabled={todo.status === 'COMPLETED'}
                                />
                            </td>
                            <td>
                                {todo.status === 'COMPLETED' ? (
                                    <del>{todo.title}</del>
                                ) : (
                                    <span className="card-title h5">{todo.title}</span>
                                )}
                            </td>
                            <td className="text-right">
                                <a
                                    className="mr-2 mt-2 " 
                                    onClick={() => showTodoUpdateModel(todo)}
                                >
                                    <i className="fas fa-edit text-alert btn btn-sm btn-primary"></i>
                                </a>
                                <a
                                    className=" mt-2"
                                    onClick={() => handleTodoDelete(todo.id)}
                                >
                                    <i className="fas fa-trash-alt btn btn-sm btn-danger"></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-controls justify-content-between align-items-center mt-5">
                <button
                    className="btn btn-sm btn-primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="mx-3">Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-sm btn-primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TodoCard;
