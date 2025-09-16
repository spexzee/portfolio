import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

const Earth: React.FC = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const meshRef = useRef<THREE.Group>(null);
  
  // Auto-rotate the planet
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={earth.scene} 
      scale={2.5} 
      position-y={0} 
      rotation-y={0}
    />
  );
};

// Preload the GLTF model
useGLTF.preload("./planet/scene.gltf");

const EarthCanvas: React.FC = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 20, 10]} intensity={1.5} castShadow />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;