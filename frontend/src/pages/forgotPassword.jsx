import React, { useState } from "react";
import axios from "axios";
import AlertModel from "../compenents/alertModel";


const baseURL = process.env.REACT_APP_API_URL

function ForgotPassword() {
    const [emailError, setEmailError] = useState("");
    const [formData, setFormData] = useState({
        email: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate(formData);
        if (!isValid) {
            console.error("Form validation failed.");
            return;
        }
        try {
            const response = await axios.post(
                `${baseURL}api/users/password-reset/`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if(response.status === 200){
                setModalMessage(response.data.message);
                setShowModal(true);
            }else{
                setEmailError(response.data.message)
            }
        } catch (error) {
            if (error.response.data.message) {
                setEmailError(error.response.data.message);
            } else {
                setEmailError("An error occurred. Please try again.");
            }
        }
    };

    const validate = (values) => {
        let isValid = true;
        if (!values.email) {
            setEmailError("Email is required");
            isValid = false;
        } else {
            setEmailError("");
        }
        return isValid;
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card border-0 shadow" style={{ width: '18rem' }}>
                    <div className="card-title h3 mb-5">Forgot Password</div>
                    <form onSubmit={handleSubmit} className="text-left">
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInput}
                                required
                            />
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <AlertModel showModal={showModal} modalMessage={modalMessage} handleCloseModal={handleCloseModal} />
        </>
    );
}

export default ForgotPassword;
