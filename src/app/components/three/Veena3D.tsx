"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export const Veena3D = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const isMobile = useIsMobile();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  // Mobile: reduce segment counts to lower vertex/fragment shader work
  // Sphere (32,32) → (16,16) on mobile — 75% fewer triangles
  // Cylinder (32 radial) → (12 radial) on mobile
  const sphereArgs = isMobile
    ? ([1.5, 16, 16] as [number, number, number])
    : ([1.5, 32, 32] as [number, number, number]);
  const smallSphereArgs = isMobile
    ? ([0.6, 16, 16] as [number, number, number])
    : ([0.6, 32, 32] as [number, number, number]);
  const cylinderArgs = isMobile
    ? ([0.2, 0.3, 6, 12] as [number, number, number, number])
    : ([0.2, 0.3, 6, 32] as [number, number, number, number]);

  return (
    <group ref={groupRef} position={[2, -1, -2]} rotation={[0, -0.5, 0.2]} scale={0.8}>
      {/* Resonator (Kudam) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={sphereArgs} />
        {isMobile ? (
          // MeshDistortMaterial runs a custom shader displacement — skip on mobile
          <meshStandardMaterial
            color="#1A0B2E"
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.1}
          />
        ) : (
          <MeshDistortMaterial
            color="#1A0B2E"
            speed={2}
            distort={0.3}
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.1}
          />
        )}
      </mesh>

      {/* Dandi (Neck) */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={cylinderArgs} />
        <meshStandardMaterial
          color="#1A0B2E"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Second Resonator (Suraikai) */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={smallSphereArgs} />
        {isMobile ? (
          // MeshWobbleMaterial runs a custom shader — skip on mobile
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.2}
          />
        ) : (
          <MeshWobbleMaterial
            color="#D4AF37"
            speed={1}
            factor={0.2}
            metalness={0.9}
          />
        )}
      </mesh>

      {/* Strings (Stylized Glow) */}
      <mesh position={[0.1, 3, 0]}>
        <boxGeometry args={[0.02, 5.5, 0.02]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>
      <mesh position={[-0.1, 3, 0]}>
        <boxGeometry args={[0.02, 5.5, 0.02]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      {/* Lighting for the instrument */}
      <pointLight position={[2, 2, 2]} intensity={2} color="#D4AF37" />
    </group>
  );
};
