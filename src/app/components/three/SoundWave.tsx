"use client";

import { useFrame, extend } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * SoundWave — GPU-driven ribbon wave.
 *
 * Original: CPU loop updating Y positions every frame + buffer re-upload.
 * Optimized: static geometry; uTime uniform passed to vertex shader.
 * The GPU calculates the sine wave in parallel across all vertices.
 */

// ── Shader material ─────────────────────────────────────────────────────────
const WaveLineMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#D4AF37") },
  /*glsl*/ `
    uniform float uTime;
    void main() {
      vec3 pos = position;
      // Same formula as original: y = sin(x*2 + t*3)*0.5 + cos(x*3 + t*2)*0.3
      pos.y = sin(pos.x * 2.0 + uTime * 3.0) * 0.5
            + cos(pos.x * 3.0 + uTime * 2.0) * 0.3;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /*glsl*/ `
    uniform vec3  uColor;
    void main() {
      gl_FragColor = vec4(uColor, 0.2);
    }
  `
);

extend({ WaveLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveLineMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial & { uTime: number }>;
      uTime?: number;
      uColor?: THREE.Color;
      attach?: string;
      transparent?: boolean;
      depthWrite?: boolean;
    };
  }
}

// ── Single wave line ─────────────────────────────────────────────────────────
const SoundWave = () => {
  const matRef = useRef<THREE.ShaderMaterial & { uTime: number }>(null!);

  const count = 100;
  const sep = 0.2;

  // Static geometry — positions never change on CPU
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (i - count / 2) * sep;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  // Only update the uTime uniform each frame — no buffer uploads
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry}>
      <waveLineMaterial
        ref={matRef}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

// ── Ribbon (5 stacked waves) ─────────────────────────────────────────────────
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
