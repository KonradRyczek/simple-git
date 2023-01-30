import React from "react";
import "../styles/main.css";
import "../styles/navbar.css";

import { Outlet, Link } from "react-router-dom";

const Navbar = ({ }) => {
  return (
	<><nav className="nav d-flex flex-row align-items-center" >
		  <div className="header-menu">
				<Link to="/" className="nav-link text-white">Home</Link>
				<Link to="/about" className="nav-link text-white">About</Link>
		  </div>

		  <div className="navbar-buttons d-flex">
				<Link to="/signin" className="signin2">Sign In</Link>
				<Link to="/signup" className="signup2">Sign Up</Link>  
		  </div>
	  </nav></>
	
  );
};

export default Navbar;