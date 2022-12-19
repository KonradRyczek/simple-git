import React from "react"; 


import UserHeader from "../components/UserHeader";

const UserMainPage = () => {

	const access_token = localStorage.getItem("access_token");
	console.log(access_token)
	
return (
	<div className="">
		<UserHeader></UserHeader>
	</div>
  );
};

export default UserMainPage;