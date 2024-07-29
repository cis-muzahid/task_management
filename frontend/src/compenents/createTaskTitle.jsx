import React from "react"
import { Modal, Button, Form } from 'react-bootstrap';

function CreateTaskTitle({ show,title,setTitle,titleError,titleSuccess, handleClose, handleCreate }){
    const handleChange = (e) => {
        setTitle({...title,name:e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(title);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Create Task Title</Modal.Title>
                <Button variant="light" className="custom-close-btn" onClick={handleClose}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                </Button>
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
                        {
                            titleSuccess?<small className="text-success">{titleSuccess}</small>:''
                        }
                        {
                        titleError?<small className="text-danger">{titleError}</small>:""
                        }
                    </Form.Group>
                    <Button variant="primary" type="submit" className=' btn-sm mt-3'>
                        Create
                    </Button>
                    <Button variant="secondary" type="submit" className='btn-sm mt-3 ml-2'onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateTaskTitle;