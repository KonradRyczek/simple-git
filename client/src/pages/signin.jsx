import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import BtnBrakKonta from "../components/BtnBrakKonta";
import SignInForm from "../components/SignInForm";
const Sign_in = () => {

	
	
return (
	<div>
		<div >
		<Header/>
		</div>	
	
	
	<h1>
		logowanie
	</h1>
	<div  className="row mx-auto w-100 mainbody">
		<div className="col-6 mx-auto">
			<BtnBrakKonta></BtnBrakKonta>
			</div>

			<div className=" col-6 mx-auto">
				<SignInForm></SignInForm>
			</div>
		</div>
	<Footer/>
	</div>
);
};

export default Sign_in;
