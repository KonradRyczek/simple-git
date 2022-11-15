import React from "react"

import Home from "./pages/home"
import About from "./pages/about"
import Sign_In from "./pages/signin"
import Sign_Up from "./pages/signup"
import SignInForm from "./components/SignInForm"
import UserMainPage from "./pages/usermainpage"


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



export default () => {
  return (
    <div className="ui container">
      {showHome()}
      {showAbout()}
      {showSignUp()}
      {showSignIn()}
      {SignIn()}
    
    </div>
  )
}