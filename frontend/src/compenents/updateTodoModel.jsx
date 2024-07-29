import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateTodoModal({ todoToUpdate,todoUpdateModel, handleTodoModelClose, handleTodoUpdate }) {
    const [data, setData] = useState({id:'', title: '', description: '' });

    useEffect(() => {
        if (todoToUpdate) {
            setData({
                id:todoToUpdate.id || '',
                title: todoToUpdate.title || '',
                description: todoToUpdate.description || '',
            });
        }
    }, [todoToUpdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTodoUpdate(data); 
        handleTodoModelClose();
    };

    return (
        <Modal
            show={todoUpdateModel}
            onHide={() => {
                handleTodoModelClose();
            }}
        >
            <Modal.Header >
                <Modal.Title>Update Task</Modal.Title>
                <Button variant="light" className="custom-close-btn" onClick={handleTodoModelClose}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
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
                    {/* <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Enter task description"
                            value={data.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group> */}
                    <Button variant="primary" type="submit" className="btn-sm mt-3">
                        Save Changes
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleTodoModelClose();
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

export default UpdateTodoModal;
