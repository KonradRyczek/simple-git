import React from "react";
import "../styles/home.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BtnBrakKonta from "../components/BtnBrakKonta";
import { Canvas } from "@react-three/fiber"
import { Outlet, Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="homebody">
			<div >
				<Header />
			</div>
			<div class="homepage">		
				<div class="col-md-12">
					<div class="frame3 d-flex flex-column align-items-start">
						<h1 class="text-white simply-work-together">
							Simply Work Together</h1>
						<p class="text-white simple-git">
							Simple Git is an application that allows developers 
							to work on projects in collaboration mode. 
							It makes it easy for developers to share and collaborate on code,
							no matter where they are.</p>
						<div class="frame6 d-flex align-items-start">
						<Link to="/signup" className="signup">Sign Up</Link>
						<Link to="/signin" className="signin">Sign In</Link>
						</div>
					</div>
					<div class="italso mt-5 d-flex flex-column">
						<p class="text-white">
						It also allows developers to easily keep track of changes made to the code, revert to previous versions, and merge different versions of the code together. Additionally, Git allows for multiple branches, making it easy for multiple developers to work on different parts of the project simultaneously without interfering with each other's work. Overall, Git is a powerful tool that helps streamline the development process and make collaboration among developers much more efficient.
						</p>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
