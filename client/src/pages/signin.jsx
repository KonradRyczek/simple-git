import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Input from "../components/Input";
import BtnBrakKonta from "../components/BtnBrakKonta";
const Sign_in = () => {
return (
	<div>
		
	
	<Header/>
	<h1>
		logowanie
	</h1>
	<BtnBrakKonta></BtnBrakKonta>
	<Input label="login" type="text" className="input" />
	<Input label="password" type="password" className="input" />
	
	<Footer/>
	</div>
);
};

export default Sign_in;
