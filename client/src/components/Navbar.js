import React from "react";
//import Link from "./Link";
import { Outlet, Link } from "react-router-dom";

const Navbar = ({ }) => {
  return (

	<><nav className="navbar navbar-expand-md ">
		  <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
			  <ul className="navbar-nav mr-auto">

				  <li className="nav-item">
					  <Link to="/" className="item nav-link">Home</Link>
				  </li>
				  <li className="nav-item">
					  <Link to="/about" className="item nav-link">About</Link>
				  </li>
			  </ul>
		  </div>

		  <div className="navbar-collapse collapse w-25 order-1  order-md-0 dual-collapse2">
			  <ul className="navbar-nav mr-auto">
				  <li className="nav-item">
					  <Link to="/signin" className="item nav-link ">Sign In</Link>
				  </li>
				  <li className="nav-item">
					  <Link to="/signup" className="item nav-link signup">Sign Up</Link>
				  </li>
			  </ul>
		  </div>
	  </nav></>
	
  );
};

export default Navbar;