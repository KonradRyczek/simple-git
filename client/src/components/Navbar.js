import React from "react";
import Link from "./Link";

const Navbar = ({ }) => {
  return (

	<nav className="navbar navbar-expand-md ">
	<div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
	<ul className="navbar-nav mr-auto">

		<li className="nav-item">
		<Link href="/" className="item nav-link">Home</Link>
		</li>
		<li className="nav-item">
		<Link href="/about" className="item nav-link">About</Link>
		</li>
	</ul>
</div>

<div className="navbar-collapse collapse w-25 order-1  order-md-0 dual-collapse2">
	<ul className="navbar-nav mr-auto">
		<li className="nav-item">
		<Link href="/signin" className="item nav-link ">Sign In</Link>
		</li>
		<li className="nav-item">
		<Link href="/signup" className="item nav-link signup">Sign Up</Link>
		</li>
	</ul>
</div>
</nav>

	/*<nav className="navbar navbar-expand-md navbar-light sticky-top">
    <div className="container-fluid">
	<div className="navbar-header">
		<ul className="navbar-nav">
			<li  className="nav-item active">
				<Link href="/" className="item nav-link">Home</Link>
			</li>

			<li className="nav-item">
				<Link href="/about" className="item nav-link">About</Link>
			</li>
	
			<li className="nav-item">	
				<Link href="/signin" className="item nav-link ">Sign In</Link>
			</li>

			<li className="nav-item ">	
			<Link href="/signup" className="item nav-link signup">Sign Up</Link>
			</li>
		</ul>
		
		</div> 

     </div>
	 </nav> */
	

	
  );
};

export default Navbar;