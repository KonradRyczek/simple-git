import React from "react";
import Navbar from "./Navbar";
import logo from "../img/git.png"
import { Link } from "react-router-dom";
const Header = ({ }) => {
  return (
    <>
    <div className="row default-text bg-dark">
      <div className="col-2 ">
        
        <Link to="/" className="item nav-link bg-dark"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>
       
      </div>
      <div className="col-10 ">
        <Navbar/>
      </div>
     </div>
     </>
  );
};

export default Header;