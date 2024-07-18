import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { storeTokensInSession } from "../utils/utitlity";

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
        console.log(formData);
        const isValid = validate(formData);
        if (!isValid) {
            console.error("Form validation failed.");
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login/', formData);
            console.log(response);
            const Authentication = await response.data;
            const a = storeTokensInSession(Authentication);
            if(a){
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const validate = (values) => {
        let isValid = true;
        if (!values.username) {
            setEmailError("Email is required");
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

                    <div className="col">
                        {/* Simple link */}
                        <Link to={"/forget-password"}>Forgot password?</Link>
                    </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary btn-block mb-4">
                    Login
                </button>

                {/* Register buttons */}
                <div className="text-center">
                    <p>
                        Not a member? <a href="#!">Register</a>
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
