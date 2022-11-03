import React from "react";
import "../styles/main.css";
const Link = ({ className, href, children }) => {
    
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;