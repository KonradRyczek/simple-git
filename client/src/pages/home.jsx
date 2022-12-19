import React from "react";
import "../styles/home.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Globe from "../components/Globe";
import BtnBrakKonta from "../components/BtnBrakKonta";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const Home = () => {
	return (
		<div>
			<div >
				<Header />
			</div>
			<div className="homebody">
				<div className="space stars">
					<div className="mx-auto globerow mt-5 mb-5">
						<Canvas>
							<OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1} enablePan={false} />
							<ambientLight intensity={0.2} />
							<directionalLight position={[-2, 5, 2]} intensity={1} />
							<Globe />
						</Canvas>
					</div>
					<div className="mx-auto text-center ">
						<p className="default-text">Nie masz jeszcze konta</p>
						<BtnBrakKonta className={"btn btn-light btn-lg"}></BtnBrakKonta>
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
// 