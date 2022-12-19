import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
const Sign_up = () => {
	return (
		<div className="background">
			<Header />
			<SignUpForm ></SignUpForm>
			<Footer />
		</div>
	);
};

export default Sign_up;
