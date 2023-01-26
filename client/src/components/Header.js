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
        </div>
        <div className="HeaderMenu--logged-out p-responsive height-fit position-lg-relative flex flex-column align-items-center flex-auto pt-7 pb-4 top-0">
          <Navbar/>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;