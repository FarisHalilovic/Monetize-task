// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./NavBar.component.css";

const Navbar = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        // Split the token into parts
        const tokenParts = token.split('.');
        
        // Ensure there are exactly three parts
        if (tokenParts.length !== 3) {
          return null;
        }
    
        // Parse the token to get user information
        const decodedToken = JSON.parse(atob(tokenParts[1]));
    
        // Check if the required properties exist in the decoded token
        if (decodedToken && decodedToken.username && decodedToken.id) {
          return {
            username: decodedToken.username,
            userId: decodedToken.id,
          };
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
    
    return null;
  };

  // Get user information from the token
  const userInfo = getUserInfoFromToken();

  return (
    <nav>
      <ul className='nav-elements'>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        {isUserLoggedIn ? (
          <>
            <li className={location.pathname === '/products' ? 'active' : ''}>
              <Link to="/products">Products</Link>
            </li>
            <li className="user-info">
              {/* Display username and id if available */}
              {userInfo && (
                <span>
                  Username: {userInfo.username} (ID: {userInfo.userId})
                </span>
              )}
            </li>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <li className={location.pathname === '/login' ? 'active' : ''}>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;