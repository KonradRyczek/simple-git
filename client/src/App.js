import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home"
import About from "./pages/about"
import Sign_In from "./pages/signin"
import Sign_Up from "./pages/signup"
import NoPage from "./pages/noPage"
import Header from "./components/Header";

/* 
const showHome = () => {
  if (window.location.pathname === "/") {
    return <Home />
  }
}
const showAbout = () => {
  if (window.location.pathname === "/about") {
    return <About />
  }
}
const showSignIn = () => {
  if (window.location.pathname === "/signin") {
    return <Sign_In />
  }
}
const showSignUp = () => {
  if (window.location.pathname === "/signup") {
    return <Sign_Up />
  }
}
const SignIn = () => {
  if (window.location.pathname === "/dashboard"+SignInForm.username) {
    console.log(SignInForm.username)
    return <UserMainPage />
  }
}



{showHome()}
{showAbout()}
{showSignUp()}
{showSignIn()}
{SignIn()}

*/
export default () => {
  return (
    
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<Sign_In />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  )
}