import React from "react";

function Tohome() {
  window.location.pathname = "/"
}

const BtnError404 = ({className}) => {
    
  return (
    <button className={className} onClick={Tohome}>Back to Home</button>
  );
};

export default BtnError404;