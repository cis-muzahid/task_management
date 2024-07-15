import React, { useState, useEffect } from 'react';


const TaskCreate = () => {
    const initialData = {
        id: '',
        title: '',
        notes: '',
        resetTime: 5
    };
    const [data, setData] = useState(initialData);

    const handleAddMinutes = () => {
        const newTimeToComplete = data.resetTime + 5;
        setData({ ...data, resetTime: newTimeToComplete })
    };

    const handleMinusMinutes = () => {
        const newTimeToComplete = data.resetTime - 5;
        if (newTimeToComplete >= 0) {
            setData({ ...data, resetTime: newTimeToComplete })
        } else {
            console.warn("Time cannot be negative");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            ...data,
            id: generateUniqueId(),
        };
        console.log('Task Created:', newData);
        localStorage.setItem('task', JSON.stringify(newData)); 
        setData(newData);
    };

    const generateUniqueId = () => {
        const timestamp = Date.now().toString(36);
        const randomNum = Math.random().toString(36).substr(2, 9);
        return '_' + timestamp + randomNum;
    };

    return (
        <div className='container mt-5'>
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="resetTime">Time(hour)</label>
                                <div className="d-flex ">
                                    <a className="btn btn-sm btn-primary text-white mr-2" onClick={handleMinusMinutes}>&nbsp;-&nbsp;</a>
                                    <input type="text" id="resetTime" className="form-control text-center" style={{ width: '70px' }} value={data.resetTime} readOnly />
                                    <a className="btn btn-sm btn-primary text-white ml-2" onClick={handleAddMinutes}>+</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="form-row align-items-end">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" name="title" value={data.title} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="notes">Notes</label>
                                        <input type="text" className="form-control" id="notes" name="notes" value={data.notes} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="">&nbsp;</label>
                                        <button type="submit" className="btn btn-primary btn-block">Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCreate;
