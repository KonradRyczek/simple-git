import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import setAuthToken from "./components/setAuthToken"

import Home from "./pages/home"
import About from "./pages/about"
import Sign_In from "./pages/signin"
import Sign_Up from "./pages/signup"
import NoPage from "./pages/noPage"
import Usermainpage from "./pages/usermainpage"
import RouteGuard from "./components/RouteGuard"
import ROutlet from "./components/RouterOutlet";
import Setting from "./pages/userSettings"
import Support from "./pages/userSupport"
import Repository from "./pages/userRepository"
import Branches from "./pages/userBranches" 

//check jwt token
const access_token = () => 
{
  const access_token = localStorage.getItem("access_token");
  if (access_token) 
  {
      setAuthToken(access_token);
  }
}

export default () => {
  const username = localStorage.getItem('username')
  const reponame = localStorage.getItem('reponame')
  console.log("appjs "+reponame)
  {access_token()}
  
  return (
    <>
    {}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ROutlet />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<Sign_In />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="*" element={<NoPage />} />
            <Route exact path={"/"+username} element={<RouteGuard/>} />
            <Route path={"/"+username+"/settings"} index element={<Setting />} />
            <Route path={"/"+username+"/support"} index element={<Support />} />
            <Route path={"/"+username+"/"+reponame} index element={<Repository />} />
            <Route path={"/"+username+"/"+reponame+"/branches"} index element={<Branches />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  )
}