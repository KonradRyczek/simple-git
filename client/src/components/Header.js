import React from "react";
import Navbar from "./Navbar";
import logo from "../img/git.png"

import { Outlet, Link } from "react-router-dom";
import  "../styles/main.css";
const Header = ({ }) => {
  return (
    <>
    <div className="row mx-auto  container">
      <div className="col-2 navbar-brand  mx-auto header">     
        <Link to="/" className="item nav-link"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>   
      </div>
      <div className="col-10 mx-auto header">
        <Navbar/>
      </div>
      <Outlet />
     </div>
    
     </>
  );
};

export default Header;