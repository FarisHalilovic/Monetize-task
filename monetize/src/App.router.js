// AppRouter.js
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login.component";
import Home from "./components/home/Home.component"; 
import Register from "./components/register/Register.component"; 
import Navbar from "./components/nav-bar/NavBar.component"; 
import Product from "./components/products/Product.component"; 
const AppRouter = () => {
  // Replace this with your actual authentication logic
  const isUserLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    // Redirect to the home page if the user is logged in
    if (isUserLoggedIn) {
      // Don't redirect if the current location is already the home page
      if (window.location.pathname !== "/") {
        window.location.href = "/"; // Redirect using the window location
      }
    }
  }, [isUserLoggedIn]);

  return (
    <div className="App">
       
      <BrowserRouter>
      <header>
           <Navbar isUserLoggedIn={isUserLoggedIn} />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
