import React, { useState } from "react"
import { Modal, Button, Form } from 'react-bootstrap';

function CreateTaskTitle({ show, handleClose, handleCreate }){
    const [title, setTitle] = useState({name:''});
    const handleChange = (e) => {
        setTitle({...title,name:e.target.value});
        console.log(title)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(title);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Task Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className=' btn-sm mt-3'>
                        Create
                    </Button>
                    <Button variant="primary" type="submit" className='btn-sm mt-3 ml-2'>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateTaskTitle;