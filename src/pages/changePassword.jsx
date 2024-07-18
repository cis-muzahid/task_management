import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [passwordError, setEmailError] = useState("");
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirm: ""
    });

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
            const response = await axios.post('http://127.0.0.1:8000/api/users/forgot-password/', formData);
            console.log(response);
            navigate('/password-reset-success'); 
        } catch (error) {
            console.error("Password reset failed:", error);
            if (error.response && error.response.data) {
                setEmailError(error.response.data.email || "An error occurred. Please try again.");
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

    return (
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
    );
}

export default ForgotPassword;
