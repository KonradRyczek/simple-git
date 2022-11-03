import React from "react"

import Home from "./pages/home"
import About from "./pages/about"
import Sign_In from "./pages/signin"
import Sign_Up from "./pages/signup"


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



export default () => {
  return (
    <div className="ui container">
      {showHome()}
      {showAbout()}
      {showSignUp()}
      {showSignIn()}
    
    </div>
  )
}