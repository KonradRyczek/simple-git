import React from 'react';
import { Route, Navigate   } from 'react-router-dom';
import Home from '../pages/home';
import Usermainpage from "../pages/usermainpage"

const RouteGuard = ({ component: Element, ...rest }) => {
    let access_token = localStorage.getItem("access_token")
   function hasJWT() {
       let flag = false;
       
       //check user has JWT token
       localStorage.getItem("access_token") ? flag=true : flag=false
       
       return flag
   }
 
   return (
               hasJWT() ?       
               <Usermainpage/>     
                   :
                <Navigate  to='/'/>
   );
};
 
export default RouteGuard;