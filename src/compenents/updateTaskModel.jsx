import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateTaskModal({ taskToUpdate, show, handleClose, handleUpdate }) {
    const [data, setData] = useState({
        id:"",
        title: "",
        description: "",
        total_time_to_complete: "",
    });

    useEffect(() => {
        if (taskToUpdate) {
            setData({
                id: taskToUpdate.id || "",
                title: taskToUpdate.title || "",
                description: taskToUpdate.description || "",
                total_time_to_complete: taskToUpdate.total_time_to_complete || "",
            });
        }
    }, [taskToUpdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(data); 
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                handleClose();
            }}
        >
            <Modal.Header >
                <Modal.Title>Update Task</Modal.Title>
                <Button variant="light" className="custom-close-btn" onClick={handleClose}>
                    <i class="fa fa-window-close" aria-hidden="true"></i>
                </Button>
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
                        <Form.Label>Time to Complete (hours)</Form.Label>
                        <Form.Control
                            type="number"
                            name="timeToComplete"
                            placeholder="Enter time to complete the task"
                            value={data.total_time_to_complete}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-sm mt-3">
                        Save Changes
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                        }}
                        className="btn-sm mt-3 ml-2"
                    >
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateTaskModal;
