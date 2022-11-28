import React from "react";
import "../styles/home.css";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Globe from "../components/Globe";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const Home = () => {
	return (
		<div className="">
			<div >
				<Header />
			</div>
			<div className="homebody">
				<div class="space stars">
					<div className="row mx-auto w-100 globerow ">
					<div className="col-6 mx-auto  ">
						<Canvas>
							<OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1} enablePan={false} />
							<ambientLight intensity={0.2} />
							<directionalLight position={[-2, 5, 2]} intensity={1} />
							<Globe />
						</Canvas>
					</div>
					<div className="col-6 mx-auto ">
						<p>aaa</p>

					</div>
				</div></div>


				<div>
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default Home;
// 