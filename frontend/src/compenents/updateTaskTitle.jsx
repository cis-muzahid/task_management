import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateTaskTitleModal({ titleToUpdate,titleUpdateModel, handleTitleModelClose, handleTitleUpdate }) {
    const [data, setData] = useState({id:'', name: ''});
    useEffect(() => {
        if (titleToUpdate) {
            setData({
                id:titleToUpdate.id || '',
                name: titleToUpdate.name || '',
            });
        }
    }, [titleToUpdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('update title ', data)
        handleTitleUpdate(data); 
    };

    return (
        <Modal
            show={titleUpdateModel}
            onHide={() => {
                handleTitleModelClose();
            }}
        >
            <Modal.Header >
                <Modal.Title>Update Task</Modal.Title>
                <Button variant="light" className="custom-close-btn" onClick={handleTitleModelClose}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter title name"
                            value={data.name}
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
                            handleTitleModelClose();
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

export default UpdateTaskTitleModal;
