import React from "react"; 
import SignInForm from "../components/SignInForm";

const UserMainPage = () => {

	const x = SignInForm.username;
return (
	<div className="">
	<p>Welcome {x}</p>
	</div>
  );
};

export default UserMainPage;