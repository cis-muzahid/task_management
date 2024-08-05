import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
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
        `${baseURL}api/users/register/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Registered Successfully", {
          onClose: () => navigate("/login"),
          autoClose: 3000,
        });
      }
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

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

  const handleApiErrors = (error) => {
    if (error.response && error.response.data) {
      const { email, password, non_field_errors } = error.response.data;
      const errors = {};

      if (email) {
        errors.email = email.join(", ");
      }
      if (password) {
        errors.password = password.join(", ");
      }
      if (non_field_errors) {
        errors.email = non_field_errors.join(", ");
      }

      setFormErrors(errors);
    } else {
      console.error("Registration failed:", error.message);
      setFormErrors({
        email: "An unexpected error occurred. Please try again.",
        password: "",
        password2: "",
      });
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div
          className="card border-0 shadow text-center"
          style={{ width: "18rem" }}
        >
          <div className="card-title h3 mb-5">Register</div>
          <form onSubmit={handleSubmit} className="text-left">
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInput}
                required
              />
              {formErrors.email && (
                <div className="text-danger">{formErrors.email}</div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInput}
                required
              />
              {formErrors.password && (
                <div className="text-danger">{formErrors.password}</div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password2">
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                className="form-control"
                name="password2"
                value={formData.password2}
                onChange={handleInput}
                required
              />
              {formErrors.password2 && (
                <div className="text-danger">{formErrors.password2}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Register
            </button>

            <div className="text-center">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
