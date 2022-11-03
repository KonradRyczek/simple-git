import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
return (
	
	<div>
	<Header/>
	<h1>
		about
	</h1>
<main>
	<div className="row mx-auto w-100 mainbody">
			<div className="col-6 mx-auto bg-primary ">
				<p>a1</p>
			</div>
			<div className="col-6 mx-auto bg-secondary">
				<p>a2</p>
			</div>
		</div>
		<div className="row mx-auto w-100 mainbody">
			<div className="col-6 mx-auto bg-secondary">
				<p>b1</p>
			</div>
			<div className="col-6 mx-auto bg-primary">
				<p>b2</p>
			</div>
		</div>
		<div className="row mx-auto w-100 mainbody">
			<div className="col-6 mx-auto bg-primary ">
				<p>c1</p>
			</div>
			<div className="col-6 mx-auto bg-secondary">
				<p>c2</p>
			</div>
		</div>
		</main>
	<Footer/>
	</div>

);
};

export default About;
