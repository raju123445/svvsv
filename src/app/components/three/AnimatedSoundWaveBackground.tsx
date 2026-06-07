"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AnimatedSoundWaveBackground
 * A GPU-animated plane mesh that creates a flowing sine-wave
 * displacement across a full-screen background quad.
 * Purple-to-gold gradient via vertex colors.
 */
export const AnimatedSoundWaveBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const { geometry, colorArray } = useMemo(() => {
    const segments = 80;
    const geo = new THREE.PlaneGeometry(60, 40, segments, segments);

    // Per-vertex colors: purple in center, gold toward edges
    const posArr = geo.attributes.position.array as Float32Array;
    const count = posArr.length / 3;
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = posArr[i * 3];
      const normalizedX = (x + 30) / 60; // 0..1
      const t = Math.abs(normalizedX - 0.5) * 2; // 0=center, 1=edge

      // Purple (0.58, 0.2, 0.92) → Gold (0.83, 0.69, 0.14)
      colors[i * 3]     = 0.58 + t * (0.83 - 0.58);
      colors[i * 3 + 1] = 0.20 + t * (0.69 - 0.20);
      colors[i * 3 + 2] = 0.92 + t * (0.14 - 0.92);
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return { geometry: geo, colorArray: colors };
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const geo = meshRef.current?.geometry;
    if (!geo) return;

    const pos = geo.attributes.position.array as Float32Array;
    const count = pos.length / 3;

    for (let i = 0; i < count; i++) {
      const x = pos[i * 3];
      const y = pos[i * 3 + 1];

      // Multi-frequency wave displacement on Z
      pos[i * 3 + 2] =
        Math.sin(x * 0.15 + time * 0.8) * 1.5 +
        Math.sin(y * 0.2 + time * 0.6) * 1.0 +
        Math.cos(x * 0.08 + y * 0.12 + time * 0.4) * 0.8;
    }

    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, 0, -12]}
      rotation={[-0.15, 0, 0]}
    >
      <meshPhongMaterial
        vertexColors
        transparent
        opacity={0.08}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
