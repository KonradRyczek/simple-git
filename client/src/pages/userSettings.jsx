import React from "react";
import { Route, Navigate } from 'react-router-dom';
import UserHeader from "../components/UserHeader";
import img from "../img/account.png"

function hasJWT() {
  let flag = false;
  localStorage.getItem("access_token") ? flag = true : flag = false
  return flag
}

const userSetting = () => {

  return (
 //   hasJWT() ?
      <>
        <div className="">
          <UserHeader/>
        </div>
        <div>
          <div className=" about row mx-auto w-100 mainbody">
            <div className=" col-6 d-flex align-items-center">
              <img src={img} className="aboutIMG mx-auto d-block rounded " alt="text" />
            </div>
            <div className=" col-6 mx-auto text-center aboutTEXT">
              <p className="" style={{ marginTop: '120px' }}>Username: {localStorage.getItem('username')}</p>
              <p className=""> Email: {localStorage.getItem('email')}</p>

            </div>

          </div>
          <div>
            <p>Ustawienia</p>
          </div>
        </div>
      </>





    //  :
   //   <Navigate to='/' />
  );
};

export default userSetting;