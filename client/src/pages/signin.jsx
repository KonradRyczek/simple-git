import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BtnBrakKonta from "../components/BtnBrakKonta";
import SignInForm from "../components/SignInForm";
const Sign_in = () => {



	return (
		<div className="background">
			<div >
				<Header />
			</div>
			<div className="row mx-auto w-100 mt-5">
				<div className="col-6 mx-auto  text-center ">
					<p className="background aboutTEXT" >Nie masz jeszcze konta {'->'} <BtnBrakKonta className={"btn btn-primary btn-lg"}></BtnBrakKonta></p>
				</div>
				<div className=" col-6 mx-auto">
					<SignInForm></SignInForm>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Sign_in;
