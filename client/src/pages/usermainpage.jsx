import React from "react"; 
import SignInForm from "../components/SignInForm";
import {usr} from "../components/GlobalVar"

const UserMainPage = () => {

	const username = localStorage.getItem("username");
	console.log(username)
	
return (
	<div className="">
	<p>Welcome {username}</p>
	</div>
  );
};

export default UserMainPage;