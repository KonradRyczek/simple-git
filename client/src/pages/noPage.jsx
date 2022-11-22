import "../styles/main.css";
import React from "react";
import { Canvas } from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import AnimatedShape from "../components/AnimatedShape";
import BtnError404 from "../components/BtnError404";

const NoPage = () => {
    return (
    <div className="text-center m-auto mt-5">
    <h1 className="h1404">404</h1>
    <h1 className="h1404">NOT FOUND</h1>
    <div className="mx-auto">
    <Canvas className="canvas404">
					<OrbitControls enableZoom={false} enableRotate={false} enableautoRotate={true} autoRotateSpeed={3} enablePan={false}/>
					<ambientLight intensity={0.2}/>
					<directionalLight position={[-2,5,2]} intensity={1} />
					<AnimatedShape/>
				</Canvas>

    </div>
    <BtnError404 className={"btn btn-success btn-lg"}></BtnError404>
    
    </div>
    );
  };
  
  export default NoPage;
  