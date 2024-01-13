// LoginComponent.js
import React, { useState } from "react";
import api from "../../services/Api.service";
import { Link,useNavigate} from "react-router-dom";

import MonetizeImage from "../../assets/monetize.jpg"; // Adjust the path as needed
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
    general: "", // General error message
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when the user starts typing
      general: "", // Clear general error when user interacts with the form
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
        general: "", // Clear general error if there are specific field errors
      });
      return;
    }

    try {
      // Call the login API method
      const response = await api.login({
        username: state.username,
        password: state.password,
      });

      // Check if login was successful
      if (response.status === 200) {
        // Set the token to local storage
        localStorage.setItem("token", response.data.jwt);

        // Clear errors on successful login
        setErrors({
          username: "",
          password: "",
          general: "",
        });
        navigate('/');
        window.location.reload();
        // Redirect or perform any other actions upon successful login
      } else {
        // If the login is not successful, display an error message
        setErrors({
          ...errors,
          general: response.message || "An error occurred during login.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle unexpected errors here
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
          <button type="submit">Sign In</button>
          <p>Do not have an account?</p>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
          {errors.general && <span className="error">{errors.general}</span>}
        </form>
      </div>

      <div className="right-side">
        <div className="centered-content">
          {/* Image */}
          <img className="logo-image" src={MonetizeImage} alt="Your Alt Text" />

          {/* Social media buttons */}
          <div className="social-container">
            <a href="#" className="social">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
