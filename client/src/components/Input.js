import React from "react";

const Input = ({label, className, type, value }) => {
    
  return (
    <label>{label}
    <input className={className} type={type} value={value}/>
    </label>
  );
};

export default Input;