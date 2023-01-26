import React from "react";
import "../styles/main.css";
import "../styles/navbar.css";

import { Outlet, Link } from "react-router-dom";

const Navbar = ({ }) => {
  return (
	<><nav className="nav d-flex flex-row flex-lg-row align-items-center flex-auto p-3 p-lg-0 rounded rounded-lg-0 mt-3 mt-lg-0" >
		  <div className="header-menu mt-0 px-3 px-lg-0 mb-3 mb-lg-0">
				<Link to="/" className="nav-link text-white">Home</Link>
				<Link to="/about" className="nav-link text-white">About</Link>
		  </div>

		  <div className="navbar-buttons d-lg-flex flex-items-center px-3 px-lg-0 mb-3 mb-lg-0 text-center text-lg-left">
				<Link to="/signin" className="signin2">Sign In</Link>
				<Link to="/signup" className="signup2">Sign Up</Link>  
		  </div>
	  </nav></>
	
  );
};

export default Navbar;