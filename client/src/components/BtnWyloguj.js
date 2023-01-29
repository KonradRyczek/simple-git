import React from "react";

function logout() {
  localStorage.clear() 
  window.location.pathname = "/"
}

const BtnWyloguj = ({className}) => {
    
  return (
    <button className={className} onClick={logout}>Log out</button>
  );
};

export default BtnWyloguj;