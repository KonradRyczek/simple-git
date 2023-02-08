import React from "react";
import "../styles/navbar.css";
import NavbarUser from "../components/NavbarUser";
import logo from "../img/logo.png"
import BtnWyloguj from "../components/BtnWyloguj"; 
import { Link } from "react-router-dom";

const username = localStorage.getItem('username')
const supportPath = "/" + username + "/support"
const userPath = "/" + username 

const UserHeader = ({ }) => {
  return (
    <>
    <header className="header">
      <div className="header-container container-xl d-flex flex-row align-items-center p-responsive height-full position-relative z-1">
         <div className="header-left d-flex width-full width-lg-auto"> 
          <Link to={userPath} className="header-logo bg-transparent text-white"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>
          <Link to={supportPath} className="nav-link text-white">Support</Link>   
        </div>
        <div className="navbar-buttons d-lg-flex flex-items-center text-center">
				    <BtnWyloguj className={"signin2"}></BtnWyloguj> 
		    </div>
      </div>
    </header>
     </>
  );
};

export default UserHeader;