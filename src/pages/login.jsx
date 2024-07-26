import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { storeTokensInSession } from "../utils/utitlity";

const baseURL = process.env.REACT_APP_API_URL

function Login() {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
            const response = await axios.post(`${baseURL}api/users/login/`, formData);
            const authentication = response.data;
            const success = storeTokensInSession(authentication);
            if (response.status === 200 && success) {
                navigate('/dashboard');
            } else {
                console.error('Unexpected response:', response);
                setEmailError('Unexpected response, please try again.');
            }
        } catch (error) {
            if (error.response) {
                // Handle server-side errors
                const { status, data } = error.response;
    
                if (status === 500) {
                    // Internal Server Error
                    console.error('Internal Server Error:', data);
                    setEmailError('An unexpected error occurred on the server. Please try again later.');
                } else {
                    // Handle other status codes
                    if (data.email) {
                        setEmailError(data.email[0] || 'Please provide a valid email.');
                    }
                    if (data.password) {
                        setPasswordError(data.password[0] || 'Please provide a valid password.');
                    }
                    if (data.non_field_errors) {
                        setEmailError(data.non_field_errors[0] || 'Invalid credentials, please try again.');
                    }
                }
            } else if (error.request) {
                // Handle network errors
                console.error('Network error:', error.request);
                setEmailError('Network error, please try again later.');
            } else {
                // Handle any other errors
                console.error('Error:', error.message);
                setEmailError('An error occurred, please try again.');
            }
        }
    };

    const validate = (values) => {
        let isValid = true;
        if (!values.username) {
            setEmailError("Username is required");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!values.password) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError("");
        }
        return isValid;
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem("usr_9t0u1v");
        const storedPassword = localStorage.getItem("usr_5z6a7b");
        if (storedEmail && storedPassword) {
            // const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, SECRET_KEY).toString(CryptoJS.enc.Utf8);
            // const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
            const decryptedEmail = '';
            const decryptedPassword = '';
            setFormData({
                username: decryptedEmail,
                password: decryptedPassword,
            });
        }
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card border-0 shadow" style={{ width: '18rem' }}>
                <div className="card-title h3 mb-5">LOGIN</div>
                <form onSubmit={handleSubmit} className="text-left">
                    {/* Email input */}
                    <label className="form-label text-left" htmlFor="form2Example1"> Username</label>
                    <div className="form-outline mb-4">
                        <input
                            type="username"
                            id="form2Example1"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    {/* Password input */}
                    <label className="form-label" htmlFor="form2Example2">
                        Password
                    </label>
                    <div className="form-outline mb-4">
                        <input
                            type="password"
                            id="form2Example2"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    {
                        emailError && <small className="text-danger">{emailError}</small>
                    }
                    {
                        passwordError && <small className="text-danger">{passwordError}</small>
                    }

                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-4">
                        {/* <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="form2Example31"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInput}
                            />
                            <label className="form-check-label" htmlFor="form2Example31">
                                Remember me
                            </label>
                        </div>
                    </div> */}

                        {/* <div className="col">
                        <Link to={"/forget-password"}>Forgot password?</Link>
                    </div> */}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Login
                    </button>

                    {/* Register buttons */}
                    <div className="text-center">
                        <p>
                            Not a member? <Link to={"/register"}>Register</Link>
                        </p>
                        {/* <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
