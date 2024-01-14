// src/components/register/Register.component.js
import React, { useState } from "react";
import { useNavigate} from 'react-router-dom'
import "./Register.component.css"; 
import api from "../../services/Api.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import MonetizeImage from "../../assets/register.jpg"; 
// Function for registration
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    subscribeToNewsLetter: false,
    gender: "",
    status: "",
    yearOfBirth: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        
        // Make an API call to register the user
        const dataForApi = {
          ...formData,
          yearOfBirth: parseInt(formData.yearOfBirth, 10),
        };
        const response = await api.register(dataForApi);

        // Registration successful, proceed with login
        if (response.status < 400) {
          const loginResponse = await api.login({
            username: formData.username,
            password: formData.password,
          });
          if (loginResponse.status === 200) {
            localStorage.setItem("token", loginResponse.data.jwt);
            
            setErrors({});
            navigate('/');
            window.location.reload();
          } else {
            setErrors({
              ...errors,
              general:
                loginResponse.message || "An error occurred during login.",
            });
          }
        } else {
          
          setErrors({
            ...errors,
            general:
              response.message || "An error occurred during registration.",
          });
        }
      } catch (error) {
        // Handle registration or login errors here
        setErrors({
          ...errors,
          general:
            error.response.data.message ||
            "An error occurred during registration.",
        });
      }
    } else {
      // Form is invalid, update the errors state
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validation of registration
    
    if (!data.username.trim()) {
      errors.username = "Username is required";
    } else if (data.username.length < 3 || data.username.length > 20) {
      errors.username = "Username must be between 3 and 20 characters";
    }

    // Validate password
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6 || data.password.length > 20) {
      errors.password = "Password must be between 6 and 20 characters";
    }

    // Validate repeat password
    if (data.repeatPassword !== data.password) {
      errors.repeatPassword = "Passwords must match";
    }

    // Validate gender
    if (!data.gender) {
      errors.gender = "Please select gender";
    }

    // Validate status
    if (!["active", "inactive"].includes(data.status)) {
      errors.status = "Please select valid status";
    }

    // Validate yearOfBirth
    if (
      !data.yearOfBirth ||
      data.yearOfBirth < 1900 ||
      data.yearOfBirth > 2024
    ) {
      errors.yearOfBirth = "Year must be between 1900 and 2024";
    }

    return errors;
  };

  return (
    <div className="main-page">
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
        <h1>Sign up</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {errors.repeatPassword && (
            <div className="error-message">{errors.repeatPassword}</div>
          )}

          <label htmlFor="yearOfBirth">Year of Birth</label>
          <input
            type="number"
            id="yearOfBirth"
            name="yearOfBirth"
            value={formData.yearOfBirth}
            onChange={handleChange}
          />
          {errors.yearOfBirth && (
            <div className="error-message">{errors.yearOfBirth}</div>
          )}

<label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <div className="error-message">{errors.status}</div>
          )}

          <label>Gender</label>
          <div className="gender-group">
            <div className="gender-radio">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="gender-radio">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div className="gender-radio">
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          {errors.gender && (
            <div className="error-message">{errors.gender}</div>
          )}
          

          <label htmlFor="subscribeToNewsLetter">Subscribe to Newsletter</label>
          <input
            type="checkbox"
            id="subscribeToNewsLetter"
            name="subscribeToNewsLetter"
            checked={formData.subscribeToNewsLetter}
            onChange={handleChange}
          />
          {errors.subscribeToNewsLetter && (
            <div className="error-message">{errors.subscribeToNewsLetter}</div>
          )}

          <button className="register-button" type="submit">Register</button>
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}
        </form>
      </div>

      <div className="register-right-side">
        <div className="centered-content">
          
          <img className="register-logo-image" src={MonetizeImage} alt="Your Alt Text" />

          
          <div className="social-container">
          <a
              href="https://www.facebook.com/monetizead?mibextid=LQQJ4d"
              className="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a
              href="https://monetizead.com/"
              className="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>

            <a
              href="https://www.linkedin.com/company/monetize-ad/"
              className="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
