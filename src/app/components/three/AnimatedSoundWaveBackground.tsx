"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/app/hooks/useIsMobile";

/**
 * AnimatedSoundWaveBackground — GPU-driven wave displacement.
 *
 * Previous implementation: iterated over every vertex on CPU each frame,
 * calling Math.sin/cos ~6,561 times, then uploaded the buffer via
 * `needsUpdate = true` — causing a large CPU→GPU data transfer every tick.
 *
 * New implementation: the plane geometry is static. The wave math is done
 * entirely inside the GLSL vertex shader, which runs in parallel on
 * thousands of GPU shader cores — zero CPU→GPU buffer uploads per frame.
 */

// ── Custom shader material ──────────────────────────────────────────────────
const WaveBackgroundMaterial = shaderMaterial(
  // Uniforms
  { uTime: 0 },
  // Vertex shader — calculates multi-freq sine displacement on GPU
  /*glsl*/ `
    uniform float uTime;
    varying vec3 vColor;

    // Purple (0.58, 0.20, 0.92) → Gold (0.83, 0.69, 0.14)
    vec3 purple = vec3(0.58, 0.20, 0.92);
    vec3 gold   = vec3(0.83, 0.69, 0.14);

    void main() {
      vec3 pos = position;

      float t = (pos.x + 30.0) / 60.0;                // 0..1
      float edge = abs(t - 0.5) * 2.0;                // 0=center, 1=edge
      vColor = mix(purple, gold, edge);

      // Same wave formula as the original CPU version
      pos.z =
        sin(pos.x * 0.15 + uTime * 0.8) * 1.5 +
        sin(pos.y * 0.20 + uTime * 0.6) * 1.0 +
        cos(pos.x * 0.08 + pos.y * 0.12 + uTime * 0.4) * 0.8;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader — use vertex color interpolated from above
  /*glsl*/ `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(vColor, 0.08);
    }
  `
);

// Register the material so JSX can use <waveBackgroundMaterial>
extend({ WaveBackgroundMaterial });

// TypeScript declaration for the custom JSX element
declare module "@react-three/fiber" {
  interface ThreeElements {
    waveBackgroundMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial & { uTime: number }>;
      uTime?: number;
      attach?: string;
      transparent?: boolean;
      wireframe?: boolean;
      side?: THREE.Side;
      depthWrite?: boolean;
    };
  }
}

// ── Component ───────────────────────────────────────────────────────────────
export const AnimatedSoundWaveBackground = () => {
  const matRef = useRef<THREE.ShaderMaterial & { uTime: number }>(null!);
  const isMobile = useIsMobile();

  // Fewer segments on mobile — reduces vertex count
  const segments = isMobile ? 30 : 50;

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(60, 40, segments, segments),
    [segments]
  );

  // Update only the uTime uniform — zero buffer uploads
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry} position={[0, 0, -12]} rotation={[-0.15, 0, 0]}>
      <waveBackgroundMaterial
        ref={matRef}
        transparent
        wireframe
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
