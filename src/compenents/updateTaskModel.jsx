import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateTaskModal({taskToUpdate, show, handleClose, handleUpdate }) {
    const [data, setData] = useState({
        title: '',
        description: '',
        timeToComplete: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the handleCreate function with the task data
        handleUpdate(data);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter task title"
                            value={data.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Enter task description"
                            value={data.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="timeToComplete">
                        <Form.Label>Time to Complete</Form.Label>
                        <Form.Control
                            type="Number"
                            name="timeToComplete"
                            placeholder="Enter time to complete the task"
                            value={data.timeToComplete}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='btn-sm mt-3'>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose} className='btn-sm mt-3 ml-2'>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateTaskModal;
