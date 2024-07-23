import React, { useState, useEffect } from 'react';
import './taskList.css'
const TodoCard = ({ todo, handleTodoDelate, showTodoUpdateModel, handleTodoComplete }) => {

    return (
        <div className="card justify-content-center">
            <div className="d-flex justify-content-between align-items-start my-3 ml-3">
                <div className='ml-3 col-md-2'>
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                </div>
                <div className='col-md-4'>
                    {
                        todo.status === 'COMPLETED' ?
                            <del>{todo.title}</del> :
                            <span className="card-title h5 ">{todo.title}</span>
                    }
                </div>

                <div className='col-md-6'>
                    {
                        todo.status === 'COMPLETED' ?
                            '' :
                            <button className="btn btn-sm btn-success mr-2" onClick={() => handleTodoComplete(todo)} >Complete</button>
                    }
                    {/* <button className="btn btn-sm  btn-outline-primary mr-2" onClick={() => showTodoUpdateModel(todo)}>
                        <i className="fas fa-edit " ></i>
                    </button> */}
                    <button className="btn btn-sm btn-outline-danger " onClick={() => handleTodoDelate(todo.id)}>
                        <i className="fas fa-trash-alt " ></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
