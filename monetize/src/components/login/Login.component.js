// LoginComponent.js
import React, { useState } from "react";
import api from "../../services/Api.service";
import { Link, useNavigate } from "react-router-dom";

import MonetizeImage from "../../assets/monetize.jpg"; 
import "./Login.component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function LoginComponent() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    general: "", 
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", 
      general: "", 
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { username, password } = state;

    // Validation
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        general: "", 
      });
      return;
    }

    try {
      // Call the login API method
      const response = await api.login({
        username: state.username,
        password: state.password,
      });

      
      if (response.status === 200) {
        
        localStorage.setItem("token", response.data.jwt);

        
        setErrors({
          username: "",
          password: "",
          general: "",
        });
        navigate("/");
        window.location.reload();
        
      } else {
        
        setErrors({
          ...errors,
          general: response.message || "An error occurred during login.",
        });
      }
    } catch (error) {
      
      setErrors({
        ...errors,
        general: "An unexpected error occurred during login.",
      });
    }
  };

  const validateUsername = (username) => {
    if (!username) {
      return "Username is required";
    }
    if (username.length < 3 || username.length > 20) {
      return "Username must be between 3 and 20 characters";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6 || password.length > 20) {
      return "Password must be between 6 and 20 characters";
    }
    return "";
  };

  return (
    <div className="main-page">
      <div className="form-container sign-in-container">
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <span className="error">{errors.username}</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>
          <button className="primary-button" type="submit">
            Sign In
          </button>
          <p>Do not have an account?</p>
          <Link to="/register">
            <button className="primary-button">Sign Up</button>
          </Link>
          {errors.general && <span className="error">{errors.general}</span>}
        </form>
      </div>

      <div className="right-side">
        <div className="centered-content">
          
          <img className="logo-image" src={MonetizeImage} alt="Your Alt Text" />

         
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
}

export default LoginComponent;
