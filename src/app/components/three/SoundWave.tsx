"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export const SoundWave = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const count = 100;
  const sep = 0.2;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (i - count / 2) * sep;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      // Create wave effect
      positions[i * 3 + 1] = Math.sin(x * 2 + time * 3) * 0.5 + Math.cos(x * 3 + time * 2) * 0.3;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.2} />
    </mesh>
  );
};

export const SoundWaveRibbon = () => {
  const count = 5;
  return (
    <group position={[0, -2, -2]}>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i} position={[0, 0, i * -1]} rotation={[0, 0, i * 0.1]}>
          <SoundWave />
        </group>
      ))}
    </group>
  );
};
