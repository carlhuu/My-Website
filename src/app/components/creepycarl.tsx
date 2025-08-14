// Thank you to eyangch my goat for this code lmaooooo yall really thought i came up w this by myself

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const RotatingImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const [targetPos, setTargetPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setTargetPos([
        (event.clientY - window.innerHeight / 2) / 800,
        (event.clientX - window.innerWidth / 2) / 1200,
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        (meshRef.current.rotation.x * 11 + targetPos[0]) / 12;
      meshRef.current.rotation.y =
        (meshRef.current.rotation.y * 11 + targetPos[1]) / 12;
    }
  });

  return (
    <mesh ref={meshRef} scale={9.48}>
      <planeGeometry args={[0.8614, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const Carl: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <RotatingImage imageUrl="/assets/images/carl.png" />
    </Canvas>
  );
};

export default Carl;
