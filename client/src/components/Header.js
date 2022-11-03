import React from "react";
import Navbar from "./Navbar";
import logo from "../img/git.png"

import Link from "../components/Link";
import  "../styles/main.css";
const Header = ({ }) => {
  return (
    <div className="row header">
      <div className="col-2 navbar-brand">
        
        <Link href="/" className="item nav-link"><img src={logo} className="logo" alt="text"/>SimpleGit</Link>
       
      </div>
      <div className="col-10 ">
        <Navbar/>
      </div>
     </div>
  );
};

export default Header;