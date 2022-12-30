import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img from "../img/account.png"
import { Redirect, Switch, Route, Router } from "react-router-dom";


const About = () => {
	return (
		<div>
			<div >
				<Header />
			</div>
			<div className=" background vh-100">
				<div className=" about row mx-auto  w-100 mainbody">
					<div className=" col-6 d-flex align-items-center">
						<img src={img} className="aboutIMG mx-auto d-block rounded " alt="text"/>
					</div>
					<div className=" col-6 mx-auto text-center aboutTEXT">
						<p className=""style={{marginTop:'120px'}}>Jakub Sotwin</p>
						<p className=""> i145913</p>
						<p className="">Frontend, UX/UI</p>
					</div>
				</div>
				<div className=" about row mx-auto w-100 mainbody">
				<div className=" col-6 mx-auto  text-center aboutTEXT">
						<p className=""style={{marginTop:'120px'}}>Konrad Ryczek</p>
						<p className=""> i145904</p>
						<p className="">Backend</p>
					</div>
					<div className=" col-6  d-flex align-items-center">
						<img src={img} className="aboutIMG mx-auto d-block rounded " alt="text"/>
					</div>
				</div>
				<div className=" about row mx-auto w-100 mainbody">
				<div className=" col-6  d-flex align-items-center">
						<img src={img} className="aboutIMG mx-auto d-block rounded " alt="text"/>
					</div>
					<div className=" col-6 mx-auto text-center aboutTEXT">
						<p className=""style={{marginTop:'120px'}}>Aleksander Postrzednik </p>
						<p className=""> i145900</p>
						<p className=""></p>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default About;
