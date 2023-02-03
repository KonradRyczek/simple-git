import React from "react";
import "../styles/home.css";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import BtnBrakKonta from "../components/BtnBrakKonta";
import { Canvas } from "@react-three/fiber"
import { Outlet, Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="homebody">
			<div >
				<Header />
			</div>
				<Intro />
			<div className="blank"></div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
