import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import BtnBrakKonta from "../components/BtnBrakKonta";
import SignInForm from "../components/SignInForm";
const Sign_in = () => {

	
	
return (
	<div>
		
	
	<Header/>
	<h1>
		logowanie
	</h1>
	<BtnBrakKonta></BtnBrakKonta>
	
	<div>
		<SignInForm></SignInForm>
	</div>
	<Footer/>
	</div>
);
};

export default Sign_in;
