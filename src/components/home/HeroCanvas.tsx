"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function PanelModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Slow Y axis rotation
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main Panel Body */}
      <Box args={[2, 3, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Front Door details */}
      <Box args={[1.9, 2.9, 0.1]} position={[0, 0, 0.5]} castShadow>
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </Box>

      {/* Red Indicator Light */}
      <pointLight position={[0.5, 1, 0.6]} intensity={2} color="#CC0000" distance={2} />
      <Box args={[0.2, 0.2, 0.1]} position={[0.5, 1, 0.55]}>
        <meshBasicMaterial color="#CC0000" />
      </Box>

      {/* Green Indicator Light */}
      <pointLight position={[0.5, 0.5, 0.6]} intensity={1} color="#00FF00" distance={2} />
      <Box args={[0.2, 0.2, 0.1]} position={[0.5, 0.5, 0.55]}>
        <meshBasicMaterial color="#00FF00" />
      </Box>

      {/* Digital Display */}
      <Box args={[0.8, 0.4, 0.1]} position={[-0.4, 1, 0.55]}>
        <meshBasicMaterial color="#000" />
      </Box>
      
      {/* Ambient Red Glow around the panel */}
      <pointLight position={[0, 0, -1]} intensity={5} color="#CC0000" distance={4} />
    </group>
  );
}

export default function HeroCanvas() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-full h-[400px] md:h-full relative cursor-move"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [4, 2, 5], fov: 45 }}>
        <color attach="background" args={['#0D0D0D']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Environment preset="warehouse" />
        
        <PanelModel />
        
        <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={!hovered}
          autoRotateSpeed={1} 
        />
      </Canvas>
    </div>
  );
}
