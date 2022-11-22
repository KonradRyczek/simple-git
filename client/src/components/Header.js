import React from "react";
import Navbar from "./Navbar";
import logo from "../img/git.png"
import { Link } from "react-router-dom";
const Header = ({ }) => {
  return (
    <>
    <div className="row header">
      <div className="col-2 navbar-brand">
        
        <Link to="/" className="item nav-link"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>
       
      </div>
      <div className="col-10 ">
        <Navbar/>
      </div>
     </div>
     </>
  );
};

export default Header;