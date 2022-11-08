import React from "react";
import { useLoader } from "@react-three/fiber";
import {TextureLoader} from "three/src/loaders/TextureLoader";
import texture  from "../img/globe.png"
export default function Globe(){
  const colorMap = useLoader(TextureLoader, texture);
  return <mesh>
    <sphereGeometry attach="geometry" args={[2.5]}/>
    <meshStandardMaterial map={colorMap}/>

  </mesh>
}