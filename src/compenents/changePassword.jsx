import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

function ChangePassword({ show, handleClose, handleCreate }) {
    const [data, setData] = useState({
        current_password: '',
        new_password: '',
        new_password2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.new_password !== data.new_password2) {
            // Handle password mismatch
            alert('New passwords do not match');
            return;
        }
        handleCreate(data);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="current_password">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="current_password"
                            placeholder="Enter current password"
                            value={data.current_password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="new_password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="new_password"
                            placeholder="Enter new password"
                            value={data.new_password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="new_password2">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="new_password2"
                            placeholder="Confirm new password"
                            value={data.new_password2}
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

export default ChangePassword;