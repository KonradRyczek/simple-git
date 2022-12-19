import React from "react";
import { useLoader } from "@react-three/fiber";
import {TextureLoader} from "three/src/loaders/TextureLoader";
import texture  from "../img/globe.png"

export default function Globe(){
  const colorMap = useLoader(TextureLoader, texture);
  return <mesh rotation={[0,15,0]}>
    <sphereGeometry attach="geometry" args={[3]} />
    <meshStandardMaterial map={colorMap}/>
  </mesh>
}