import React, { useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const AlertModal = ({ showModal, handleCloseModal, modalMessage }) => {
    const timerRef = useRef(null);
    useEffect(() => {
        if (showModal) {
          // Log to verify the useEffect is triggered
          console.log("Modal is open, setting timer to close in 3 seconds.");
    
          // Clear any existing timer before setting a new one
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            console.log("Existing timer cleared.");
          }
    
          // Set a timer to automatically close the modal after 3 seconds
          timerRef.current = setTimeout(() => {
            handleCloseModal();
          }, 3000);
        } else {
          // Clear the timer when the modal is closed
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            console.log("Timer cleared on modal close.");
          }
        }
    
        // Cleanup function to clear the timer when the component unmounts
        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            console.log("Timer cleared on component unmount.");
          }
        };
      }, [showModal, handleCloseModal]);
    

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Body>{modalMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
