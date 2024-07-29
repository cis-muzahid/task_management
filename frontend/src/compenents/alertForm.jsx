import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateAlertModal = ({ show, handleClose, handleUpdate, defaultAlertTime }) => {
    const [alertTime, setAlertTime] = useState({ default_alert_time: '' });

    const handleChange = (e) => {
        const newAlertTime = e.target.value
        setAlertTime({ ...alertTime, default_alert_time: newAlertTime.toString() });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(alertTime);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Update Default Alert Time</Modal.Title>
                <Button variant="light" className="custom-close-btn" onClick={handleClose}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="alertTime" >
                        <Form.Label>New Alert Time (minutes)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter new alert time"
                            value={alertTime.default_alert_time}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className=' btn-sm mt-3'>
                        Update
                    </Button>
                    <Button variant="primary" type="submit" className='btn-sm mt-3 ml-2'>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateAlertModal;