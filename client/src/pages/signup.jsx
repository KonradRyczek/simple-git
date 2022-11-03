import React from "react";
import Input from "../components/Input";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Sign_up = () => {
return (
	<div>
	<Header/>
	<h1>
		rejestracja
	</h1>
	<Input label="mail" type="text" className="input" />
	<Input label="password" type="password" className="input" />
	<Input label="confirm password" type="password" className="input" />
	<Input label="nick" type="text" className="input" />
	<Footer/>
	</div>
);
};

export default Sign_up;
