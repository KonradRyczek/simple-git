import React from "react";
import Sign_Up from "../pages/signup"

function ToSignUP() {
  window.location.pathname = "/signup"
}

const BtnBrakKonta = ({className}) => {
    
  return (
    <button className={className} onClick={ToSignUP}>Zarejestruj się </button>
  );
};

export default BtnBrakKonta;