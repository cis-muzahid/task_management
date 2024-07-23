import React from "react";
import { Modal, Button } from 'react-bootstrap';

const AlertModel = ({showModal,handleCloseModal, modalMessage}) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header >
                <Modal.Title>Task Status</Modal.Title>
                <Button variant="light" className="custom-close-btn" onClick={handleCloseModal}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                </Button>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertModel;