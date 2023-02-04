import React from "react";
import Navbar from "./Navbar";
import logo from "../img/logo.png"
import { Link } from "react-router-dom";

const Header = ({ }) => {
  return (
    <>
    <header className="header">
      <div className="header-container container-xl d-flex flex-row align-items-center p-responsive height-full position-relative z-1">
         <div className="header-left d-flex width-full width-lg-auto"> 
          <Link to="/" className="header-logo bg-transparent text-white"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>
          <Link to="/" className="nav-link text-white">Home</Link>
				  <Link to="/about" className="nav-link text-white">About</Link>
		    </div>
        <div className="navbar-buttons d-flex flex-items-center text-center">
          <Link to="/signin" className="signin2">Sign In</Link>
				  <Link to="/signup" className="signup2">Sign Up</Link>   
		    </div>
      </div>
    </header>
    </>
  );
};

export default Header;