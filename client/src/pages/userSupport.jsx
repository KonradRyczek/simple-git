import React from "react"; 
import { Route, Navigate   } from 'react-router-dom';
import UserHeader from "../components/UserHeader";


function hasJWT() {

    let flag = false;

    //check user has JWT token
    localStorage.getItem("access_token") ? flag=true : flag=false
    
    return flag
}

const userSupport= () => {

return (
  //  hasJWT() ?  
        <>
        <div className="">
        
        <UserHeader></UserHeader>
        <p>Support</p>
        </div>
        </>  
        
        



    //    :
    //    <Navigate  to='/'/>       
);
  };
  
  export default userSupport;