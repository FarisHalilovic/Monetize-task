// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.component.css";

const Navbar = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage, remove token, and reload page
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // Function to extract user information from the token
  const getUserInfoFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Parse the token to get user information
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return {
          username: decodedToken.username,
          userId: decodedToken.id,
        };
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  // Get user information from the token
  const userInfo = getUserInfoFromToken();

  return (
    <nav>
      <ul>
       
        <li>
          <Link to="/">Home</Link>
        </li>
        {isUserLoggedIn ? (
          <>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li className="user-info">
              {/* Display username and id if available */}
              {userInfo && (
                <span>
                 Username: {userInfo.username} (ID: {userInfo.userId})
                </span>
              )}
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
