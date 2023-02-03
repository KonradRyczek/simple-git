import React from "react";
import Navbar from "./Navbar";
import logo from "../img/logo.png"
import { Link } from "react-router-dom";
const Header = ({ }) => {
  return (
    <>
    <header className="header">
      <div className="header-container container-lg d-flex flex-row align-items-center height-full">
        <div className="header-left d-flex">
          <Link to="/" className="header-logo bg-transparent text-white pt-3"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>     
        </div>
        <div className="HeaderMenu--logged-out align-items-center">
          <Navbar/>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;