import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { storeTokensInSession } from "../utils/utility";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        default_alert_time:"",
        password: "",
        password2: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        password2: "",
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        const newValue = name === "default_alert_time" ? parseInt(value) : value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            console.error("Form validation failed.");
            return;
        }
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/users/register/', 
                formData, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Registration successful:", response.data);
            navigate('/login');
        } catch (error) {
            // Log the error response from the server
            if (error.response) {
                console.error("Registration failed:", error.response.data);
            } else {
                console.error("Registration failed:", error.message);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = "Username is required";
            isValid = false;
        }

        if (!formData.email.includes("@")) {
            errors.email = "Invalid email format";
            isValid = false;
        }

        if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
            isValid = false;
        }

        if (formData.password !== formData.password2) {
            errors.password2 = "Passwords do not match";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card border-0 shadow  text-center" style={{ width: '18rem' }}>
                <div className="card-title h3 mb-5">Register</div>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleInput}
                            required
                        />
                    </div>

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
                        {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Default Alert Time</label>
                        <input
                            type="Number"
                            id="default_alert_time"
                            className="form-control"
                            name="default_alert_time"
                            value={formData.default_alert_time}
                            onChange={handleInput}
                            required
                        />
                        {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                            required
                        />
                        {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            className="form-control"
                            name="password2"
                            value={formData.password2}
                            onChange={handleInput}
                            required
                        />
                        {formErrors.password2 && <div className="text-danger">{formErrors.password2}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>

                    <div className="text-center">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
