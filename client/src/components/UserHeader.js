import React from "react";
import NavbarUser from "../components/NavbarUser";
import logo from "../img/git.png"
import BtnWyloguj from "../components/BtnWyloguj"; 
import { Link } from "react-router-dom";
const UserHeader = ({ }) => {
  return (
    <>
    <div className="row default-text bg-dark">
      <div className="col-1 ">
      <NavbarUser/>
      </div>
      <div className="col-2">
        <Link  className="item nav-link bg-dark"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>   
      </div>
      <div className="col-9  w-25 item nav-link">
        <BtnWyloguj className={"btn btn-primary btn-lg "}></BtnWyloguj>
      </div>
    </div>
     </>
  );
};

export default UserHeader;