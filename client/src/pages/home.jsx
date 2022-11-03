import React from "react";
import "../styles/main.css";
import Link from "../components/Link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Globe from "../components/Globe";


const Home = () => {
return (
	<div className="">
		<div >
		<Header/>
		</div>		
		<div className="row mx-auto w-100 mainbody">
			<div className="col-6 mx-auto bg-primary ">
				<p>aaa</p>
				<Globe/>
			</div>
			<div className="col-6 mx-auto bg-secondary">
				<p>aaa</p>
				
			</div>
		</div>
		<div>
	  	<Footer/>
		</div>
	</div>
  );
};

export default Home;