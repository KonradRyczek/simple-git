import React from "react";


function logout() {
  localStorage.clear()
  
  window.location.pathname = "/"
  
}


const BtnWyloguj = ({className}) => {
    
  return (
    <button className={className} onClick={logout}>Logout</button>
  );
};

export default BtnWyloguj;